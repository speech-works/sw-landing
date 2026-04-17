#!/usr/bin/env node

import {
  copyFile,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { createReadStream } from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const exportRoot = path.join(repoRoot, "out");
const specsPath = path.join(repoRoot, "src/mockup-capture/specs.json");

const DEFAULT_PORT = 3400;
const DEFAULT_SCALE = 2;
const DEFAULT_FPS = 24;
const DEFAULT_OUTPUT_DIR = path.join(
  repoRoot,
  "public",
  "assets",
  "mockups",
  "mobile"
);
const EDGE_MARGIN = 24;
const MAX_STAGE_GROWTH_ATTEMPTS = 8;

function parseArgs(argv) {
  const args = {
    slugs: [],
    port: DEFAULT_PORT,
    scale: DEFAULT_SCALE,
    fps: undefined,
    outputDir: DEFAULT_OUTPUT_DIR,
    baseUrl: "",
    durationMs: undefined,
    warmupMs: undefined,
    skipBuild: false,
    keepRaw: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--slug" && argv[index + 1]) {
      args.slugs.push(
        ...argv[index + 1]
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      );
      index += 1;
      continue;
    }

    if (arg === "--port" && argv[index + 1]) {
      args.port = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (arg === "--scale" && argv[index + 1]) {
      args.scale = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (arg === "--fps" && argv[index + 1]) {
      args.fps = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (arg === "--output-dir" && argv[index + 1]) {
      args.outputDir = path.resolve(repoRoot, argv[index + 1]);
      index += 1;
      continue;
    }

    if (arg === "--base-url" && argv[index + 1]) {
      args.baseUrl = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--duration-ms" && argv[index + 1]) {
      args.durationMs = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (arg === "--warmup-ms" && argv[index + 1]) {
      args.warmupMs = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (arg === "--skip-build") {
      args.skipBuild = true;
      continue;
    }

    if (arg === "--keep-raw") {
      args.keepRaw = true;
    }
  }

  return args;
}

function detectChromeExecutable() {
  const candidates = [
    process.env.MOCKUP_CAPTURE_CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].filter(Boolean);

  return candidates.find((candidate) => candidate && path.isAbsolute(candidate));
}

async function readSpecs() {
  const raw = await readFile(specsPath, "utf8");
  return JSON.parse(raw);
}

async function readExistingManifest(manifestPath) {
  try {
    const raw = await readFile(manifestPath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function spawnCommand(command, args, options = {}) {
  return spawn(command, args, {
    cwd: repoRoot,
    stdio: options.stdio ?? "inherit",
    env: {
      ...process.env,
      ...options.env,
    },
  });
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawnCommand(command, args, options);

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(`${command} ${args.join(" ")} exited with code ${code ?? "unknown"}`)
      );
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toEven(value) {
  const rounded = Math.max(2, Math.round(value));
  return rounded % 2 === 0 ? rounded : rounded + 1;
}

function normalizeBleed(bleed = {}) {
  return {
    top: bleed.top ?? 0,
    right: bleed.right ?? 0,
    bottom: bleed.bottom ?? 0,
    left: bleed.left ?? 0,
  };
}

async function waitForUrl(url, timeoutMs = 60000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until the server is ready.
    }

    await sleep(500);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".jpg": "image/jpeg",
    ".mov": "video/quicktime",
    ".mp4": "video/mp4",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".webm": "video/webm",
    ".webp": "image/webp",
  };

  return mimeTypes[extension] ?? "application/octet-stream";
}

async function resolveStaticFile(urlPath) {
  const sanitizedPath = decodeURIComponent(urlPath.split("?")[0]);
  const normalizedPath = sanitizedPath === "/" ? "/index.html" : sanitizedPath;
  const candidatePaths = [
    path.join(exportRoot, normalizedPath),
    path.join(exportRoot, normalizedPath, "index.html"),
    path.join(exportRoot, `${normalizedPath}.html`),
  ];

  for (const candidatePath of candidatePaths) {
    const resolvedPath = path.resolve(candidatePath);
    if (!resolvedPath.startsWith(exportRoot)) {
      continue;
    }

    try {
      const stats = await stat(resolvedPath);
      if (stats.isFile()) {
        return resolvedPath;
      }
    } catch {
      // Try the next candidate path.
    }
  }

  return null;
}

async function startLocalServer(port) {
  const server = http.createServer(async (request, response) => {
    const filePath = await resolveStaticFile(request.url ?? "/");

    if (!filePath) {
      response.statusCode = 404;
      response.end("Not found");
      return;
    }

    response.setHeader("Content-Type", getMimeType(filePath));
    createReadStream(filePath).pipe(response);
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });

  await waitForUrl(`http://127.0.0.1:${port}/capture/mockups`);

  return {
    baseUrl: `http://127.0.0.1:${port}`,
    stop: () =>
      new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      }),
  };
}

function buildCaptureUrl(baseUrl, spec, scale, stageWidth, stageHeight) {
  const captureUrl = new URL(`/capture/mockups/${spec.slug}`, baseUrl);
  captureUrl.searchParams.set("scale", `${scale}`);
  captureUrl.searchParams.set("stageWidth", `${stageWidth}`);
  captureUrl.searchParams.set("stageHeight", `${stageHeight}`);
  captureUrl.searchParams.set("background", spec.background ?? "transparent");
  return captureUrl.toString();
}

async function createCaptureContext(browser, viewportWidth, viewportHeight) {
  return browser.newContext({
    viewport: { width: viewportWidth, height: viewportHeight },
    deviceScaleFactor: 1,
  });
}

async function prepareCapturePage(page, url, warmupMs) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("[data-capture-ready='true']");
  await page.waitForFunction(() => document.fonts?.status === "loaded");
  await page.waitForTimeout(warmupMs);
}

async function readCaptureBounds(page) {
  return page.evaluate(() => {
    const root = document.querySelector("[data-capture-root='true']");
    const stage = document.querySelector("[data-capture-stage='true']");
    if (!(root instanceof Element) || !(stage instanceof Element)) {
      return null;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const stageRect = stage.getBoundingClientRect();
    const rect = root.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return null;
    }

    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      right: rect.right,
      bottom: rect.bottom,
      viewportWidth,
      viewportHeight,
      stageLeft: stageRect.left,
      stageTop: stageRect.top,
      stageRight: stageRect.right,
      stageBottom: stageRect.bottom,
    };
  });
}

function mergeBounds(target, nextBounds) {
  if (!target) {
    return { ...nextBounds };
  }

  const nextRight = nextBounds.right ?? nextBounds.x + nextBounds.width;
  const nextBottom = nextBounds.bottom ?? nextBounds.y + nextBounds.height;
  const targetRight = target.right ?? target.x + target.width;
  const targetBottom = target.bottom ?? target.y + target.height;

  return {
    ...nextBounds,
    x: Math.min(target.x, nextBounds.x),
    y: Math.min(target.y, nextBounds.y),
    right: Math.max(targetRight, nextRight),
    bottom: Math.max(targetBottom, nextBottom),
    width: Math.max(targetRight, nextRight) - Math.min(target.x, nextBounds.x),
    height:
      Math.max(targetBottom, nextBottom) - Math.min(target.y, nextBounds.y),
  };
}

function computeClip(bounds, bleed) {
  const x = Math.max(0, Math.floor(bounds.x - bleed.left));
  const y = Math.max(0, Math.floor(bounds.y - bleed.top));
  const right = Math.min(
    bounds.viewportWidth,
    Math.ceil((bounds.right ?? bounds.x + bounds.width) + bleed.right)
  );
  const bottom = Math.min(
    bounds.viewportHeight,
    Math.ceil((bounds.bottom ?? bounds.y + bounds.height) + bleed.bottom)
  );

  return {
    x,
    y,
    width: Math.max(1, right - x),
    height: Math.max(1, bottom - y),
    right,
    bottom,
  };
}

function clipTouchesViewportEdge(clip, viewportWidth, viewportHeight) {
  return (
    clip.x <= EDGE_MARGIN ||
    clip.y <= EDGE_MARGIN ||
    clip.right >= viewportWidth - EDGE_MARGIN ||
    clip.bottom >= viewportHeight - EDGE_MARGIN
  );
}

function computeStageGrowth(measurement, scale) {
  const leftMargin = measurement.clip.x;
  const rightMargin = measurement.viewportWidth - measurement.clip.right;
  const topMargin = measurement.clip.y;
  const bottomMargin = measurement.viewportHeight - measurement.clip.bottom;

  const extraWidthPx = Math.max(EDGE_MARGIN - leftMargin, EDGE_MARGIN - rightMargin, 0);
  const extraHeightPx = Math.max(EDGE_MARGIN - topMargin, EDGE_MARGIN - bottomMargin, 0);

  return {
    width: Math.max(
      0,
      Math.ceil((extraWidthPx * 2) / scale) + (extraWidthPx > 0 ? 40 : 0)
    ),
    height: Math.max(
      0,
      Math.ceil((extraHeightPx * 2) / scale) + (extraHeightPx > 0 ? 40 : 0)
    ),
  };
}

async function measureCaptureArea({
  browser,
  baseUrl,
  spec,
  scale,
  stageWidth,
  stageHeight,
  durationMs,
  warmupMs,
}) {
  const viewportWidth = Math.round(stageWidth * scale);
  const viewportHeight = Math.round(stageHeight * scale);
  const context = await createCaptureContext(browser, viewportWidth, viewportHeight);

  try {
    const page = await context.newPage();
    await prepareCapturePage(
      page,
      buildCaptureUrl(baseUrl, spec, scale, stageWidth, stageHeight),
      warmupMs
    );

    const sampleCount = Math.max(
      8,
      Math.min(24, Math.round((durationMs ?? spec.durationMs) / 250))
    );
    const sampleInterval =
      sampleCount > 1 ? (durationMs ?? spec.durationMs) / (sampleCount - 1) : 0;
    let mergedBounds = null;

    for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
      const bounds = await readCaptureBounds(page);
      if (!bounds) {
        throw new Error(`Unable to measure capture bounds for ${spec.slug}.`);
      }

      mergedBounds = mergeBounds(mergedBounds, bounds);

      if (sampleIndex < sampleCount - 1) {
        await page.waitForTimeout(sampleInterval);
      }
    }

    const bleed = normalizeBleed(spec.bleed);
    const clip = computeClip(mergedBounds, bleed);
    return {
      stageWidth,
      stageHeight,
      viewportWidth,
      viewportHeight,
      bounds: mergedBounds,
      clip,
      touchesEdge: clipTouchesViewportEdge(clip, viewportWidth, viewportHeight),
    };
  } finally {
    await context.close();
  }
}

async function resolveCaptureArea({
  browser,
  baseUrl,
  spec,
  scale,
  durationMs,
  warmupMs,
}) {
  let stageWidth = spec.width;
  let stageHeight = spec.height;
  let lastMeasurement = null;

  for (let attempt = 0; attempt < MAX_STAGE_GROWTH_ATTEMPTS; attempt += 1) {
    const measurement = await measureCaptureArea({
      browser,
      baseUrl,
      spec,
      scale,
      stageWidth,
      stageHeight,
      durationMs,
      warmupMs,
    });

    lastMeasurement = measurement;
    if (!measurement.touchesEdge) {
      return measurement;
    }

    const growth = computeStageGrowth(measurement, scale);
    stageWidth += Math.max(growth.width, 24);
    stageHeight += Math.max(growth.height, 24);
  }

  throw new Error(
    `${spec.slug} still touches the composition edge after expanding the capture stage to ${lastMeasurement?.stageWidth}x${lastMeasurement?.stageHeight}. Clip=${lastMeasurement ? `${lastMeasurement.clip.x},${lastMeasurement.clip.y},${lastMeasurement.clip.width}x${lastMeasurement.clip.height}` : "unknown"} viewport=${lastMeasurement ? `${lastMeasurement.viewportWidth}x${lastMeasurement.viewportHeight}` : "unknown"}. Increase the spec stage size or bleed.`
  );
}

async function captureFrameSequence({
  browser,
  baseUrl,
  spec,
  scale,
  stageWidth,
  stageHeight,
  clip,
  fps,
  durationMs,
  warmupMs,
  framesDir,
}) {
  const viewportWidth = Math.round(stageWidth * scale);
  const viewportHeight = Math.round(stageHeight * scale);
  const context = await createCaptureContext(browser, viewportWidth, viewportHeight);

  try {
    const page = await context.newPage();
    await prepareCapturePage(
      page,
      buildCaptureUrl(baseUrl, spec, scale, stageWidth, stageHeight),
      warmupMs
    );

    const frameCount = Math.max(1, Math.ceil(((durationMs ?? spec.durationMs) / 1000) * fps));
    const frameIntervalMs = 1000 / fps;
    const startedAt = Date.now();

    for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
      const targetTime = startedAt + frameIndex * frameIntervalMs;
      const waitMs = targetTime - Date.now();

      if (waitMs > 0) {
        await page.waitForTimeout(waitMs);
      }

      const framePath = path.join(
        framesDir,
        `frame-${String(frameIndex + 1).padStart(5, "0")}.png`
      );

      await page.screenshot({
        path: framePath,
        type: "png",
        omitBackground: spec.transparent !== false,
        clip: {
          x: clip.x,
          y: clip.y,
          width: clip.width,
          height: clip.height,
        },
        animations: "allow",
      });
    }

    return frameCount;
  } finally {
    await context.close();
  }
}

async function transcodeAlphaWebm(framesPattern, fps, outputPath) {
  await runCommand("ffmpeg", [
    "-y",
    "-framerate",
    `${fps}`,
    "-i",
    framesPattern,
    "-an",
    "-vf",
    "pad=ceil(iw/2)*2:ceil(ih/2)*2:color=black@0,format=yuva420p",
    "-c:v",
    "libvpx-vp9",
    "-pix_fmt",
    "yuva420p",
    "-b:v",
    "0",
    "-crf",
    "28",
    "-row-mt",
    "1",
    "-tile-columns",
    "2",
    "-cpu-used",
    "1",
    "-deadline",
    "good",
    "-auto-alt-ref",
    "0",
    outputPath,
  ]);
}

async function transcodeAlphaMov(framesPattern, fps, outputPath) {
  try {
    await runCommand("ffmpeg", [
      "-y",
      "-framerate",
      `${fps}`,
      "-i",
      framesPattern,
      "-an",
      "-vf",
      "pad=ceil(iw/2)*2:ceil(ih/2)*2:color=black@0,format=bgra",
      "-c:v",
      "hevc_videotoolbox",
      "-allow_sw",
      "1",
      "-alpha_quality",
      "0.85",
      "-vtag",
      "hvc1",
      outputPath,
    ]);

    return "hevc_alpha";
  } catch {
    await runCommand("ffmpeg", [
      "-y",
      "-framerate",
      `${fps}`,
      "-i",
      framesPattern,
      "-an",
      "-vf",
      "pad=ceil(iw/2)*2:ceil(ih/2)*2:color=black@0,format=yuva444p10le",
      "-c:v",
      "prores_ks",
      "-profile:v",
      "4444",
      "-alpha_bits",
      "16",
      outputPath,
    ]);

    return "prores_4444";
  }
}

async function createTransparentPoster(sourceFramePath, outputPath) {
  await copyFile(sourceFramePath, outputPath);
}

async function captureSpec({
  browser,
  baseUrl,
  outputDir,
  scale,
  fps,
  durationMs,
  warmupMs,
  keepRaw,
  spec,
}) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), `mockup-capture-${spec.slug}-`));
  const framesDir = path.join(tempDir, "frames");

  await mkdir(framesDir, { recursive: true });

  try {
    const resolvedDurationMs = durationMs ?? spec.durationMs;
    const resolvedWarmupMs = warmupMs ?? spec.warmupMs;
    const resolvedFps = fps ?? spec.fps ?? DEFAULT_FPS;
    const measurement = await resolveCaptureArea({
      browser,
      baseUrl,
      spec,
      scale,
      durationMs: resolvedDurationMs,
      warmupMs: resolvedWarmupMs,
    });

    const frameCount = await captureFrameSequence({
      browser,
      baseUrl,
      spec,
      scale,
      stageWidth: measurement.stageWidth,
      stageHeight: measurement.stageHeight,
      clip: measurement.clip,
      fps: resolvedFps,
      durationMs: resolvedDurationMs,
      warmupMs: resolvedWarmupMs,
      framesDir,
    });

    const framesPattern = path.join(framesDir, "frame-%05d.png");
    const outputBasePath = path.join(outputDir, spec.slug);
    const alphaWebmPath = `${outputBasePath}.webm`;
    const alphaMovPath = `${outputBasePath}.mov`;
    const posterPngPath = `${outputBasePath}.png`;
    const firstFramePath = path.join(framesDir, "frame-00001.png");

    await transcodeAlphaWebm(framesPattern, resolvedFps, alphaWebmPath);
    const movCodec = await transcodeAlphaMov(framesPattern, resolvedFps, alphaMovPath);
    await createTransparentPoster(firstFramePath, posterPngPath);

    if (keepRaw) {
      await cp(framesDir, `${outputBasePath}-frames`, { recursive: true });
    }

    return {
      slug: spec.slug,
      mode: spec.mode ?? "composition",
      transparent: spec.transparent !== false,
      webmAlpha: path.relative(repoRoot, alphaWebmPath),
      movAlpha: path.relative(repoRoot, alphaMovPath),
      movCodec,
      posterPng: path.relative(repoRoot, posterPngPath),
      width: toEven(measurement.clip.width),
      height: toEven(measurement.clip.height),
      stageWidth: measurement.stageWidth * scale,
      stageHeight: measurement.stageHeight * scale,
      durationMs: resolvedDurationMs,
      warmupMs: resolvedWarmupMs,
      fps: resolvedFps,
      frameCount,
    };
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const specs = await readSpecs();
  const selectedSpecs =
    args.slugs.length > 0
      ? specs.filter((spec) => args.slugs.includes(spec.slug))
      : specs;

  if (selectedSpecs.length === 0) {
    throw new Error("No mockup specs matched the requested slug(s).");
  }

  const chromePath = detectChromeExecutable();
  if (!chromePath) {
    throw new Error(
      "Unable to find a Chrome executable. Set MOCKUP_CAPTURE_CHROME_PATH and retry."
    );
  }

  await mkdir(args.outputDir, { recursive: true });

  let server;

  try {
    if (!args.baseUrl) {
      if (!args.skipBuild) {
        await runCommand("npm", ["run", "build"]);
      }

      server = await startLocalServer(args.port);
    }

    const browser = await chromium.launch({
      executablePath: chromePath,
      headless: true,
      args: [
        "--autoplay-policy=no-user-gesture-required",
        "--disable-background-media-suspend",
        "--disable-renderer-backgrounding",
      ],
    });

    try {
      const manifestPath = path.join(args.outputDir, "manifest.json");
      const existingManifest = await readExistingManifest(manifestPath);
      const manifestBySlug = new Map(
        existingManifest.map((entry) => [entry.slug, entry])
      );

      for (const spec of selectedSpecs) {
        process.stdout.write(`\nCapturing ${spec.slug}...\n`);
        const captureResult = await captureSpec({
          browser,
          baseUrl: args.baseUrl || server.baseUrl,
          outputDir: args.outputDir,
          scale: args.scale,
          fps: args.fps,
          durationMs: args.durationMs,
          warmupMs: args.warmupMs,
          keepRaw: args.keepRaw,
          spec,
        });

        manifestBySlug.set(captureResult.slug, captureResult);
      }

      const manifest = specs
        .map((spec) => manifestBySlug.get(spec.slug))
        .filter(Boolean);

      await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
      process.stdout.write(`\nWrote manifest to ${path.relative(repoRoot, manifestPath)}\n`);
    } finally {
      await browser.close();
    }
  } finally {
    if (server) {
      await server.stop();
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
