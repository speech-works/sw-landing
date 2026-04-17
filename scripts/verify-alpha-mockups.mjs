#!/usr/bin/env node

import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
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
const DEFAULT_PORT = 3410;
const DEFAULT_BACKGROUND = "#34d399";
const DEFAULT_OUTPUT_DIR = path.join(os.tmpdir(), "mockup-alpha-verify");
const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_SAMPLE_INSET = 40;
const BROWSER_CHOICES = new Set(["chrome", "safari", "both"]);

function parseArgs(argv) {
  const args = {
    manifests: [],
    browsers: "both",
    outputDir: DEFAULT_OUTPUT_DIR,
    background: DEFAULT_BACKGROUND,
    port: DEFAULT_PORT,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    slugs: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--manifest" && argv[index + 1]) {
      args.manifests.push(path.resolve(repoRoot, argv[index + 1]));
      index += 1;
      continue;
    }

    if (arg === "--asset-dir" && argv[index + 1]) {
      args.manifests.push(path.resolve(repoRoot, argv[index + 1], "manifest.json"));
      index += 1;
      continue;
    }

    if (arg === "--browser" && argv[index + 1]) {
      const value = argv[index + 1];
      if (BROWSER_CHOICES.has(value)) {
        args.browsers = value;
      }
      index += 1;
      continue;
    }

    if (arg === "--output-dir" && argv[index + 1]) {
      args.outputDir = path.resolve(repoRoot, argv[index + 1]);
      index += 1;
      continue;
    }

    if (arg === "--background" && argv[index + 1]) {
      args.background = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--port" && argv[index + 1]) {
      args.port = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (arg === "--timeout-ms" && argv[index + 1]) {
      args.timeoutMs = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (arg === "--slug" && argv[index + 1]) {
      args.slugs.push(
        ...argv[index + 1]
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      );
      index += 1;
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

function spawnCommand(command, args, options = {}) {
  return spawn(command, args, {
    cwd: repoRoot,
    stdio: options.stdio ?? "pipe",
    env: {
      ...process.env,
      ...options.env,
    },
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForUrl(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
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

    await sleep(300);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function readManifest(manifestPath) {
  const raw = await readFile(manifestPath, "utf8");
  return JSON.parse(raw).map((entry) => ({
    manifestPath,
    ...entry,
  }));
}

function resolveAssetPath(assetPath) {
  if (!assetPath) return null;
  return path.isAbsolute(assetPath) ? assetPath : path.resolve(repoRoot, assetPath);
}

function getAssetCandidates(entry) {
  const candidates = [];
  const posterPath = resolveAssetPath(entry.posterPng ?? entry.poster);
  const webmPath = resolveAssetPath(entry.webmAlpha ?? entry.webm);
  const movPath = resolveAssetPath(entry.movAlpha ?? entry.mov);

  if (posterPath) {
    candidates.push({
      key: "poster",
      label: `${entry.slug} poster`,
      browser: "chrome",
      mimeType: "image/png",
      path: posterPath,
      width: entry.width,
      height: entry.height,
      kind: "image",
      expectedAlpha: true,
      slug: entry.slug,
    });
  }

  if (webmPath) {
    candidates.push({
      key: "webm",
      label: `${entry.slug} webm`,
      browser: "chrome",
      mimeType: "video/webm",
      path: webmPath,
      width: entry.width,
      height: entry.height,
      kind: "video",
      expectedAlpha: true,
      slug: entry.slug,
    });
  }

  if (movPath) {
    candidates.push({
      key: "mov",
      label: `${entry.slug} mov`,
      browser: "safari",
      mimeType: "video/quicktime",
      path: movPath,
      width: entry.width,
      height: entry.height,
      kind: "video",
      expectedAlpha: true,
      slug: entry.slug,
    });
  }

  return candidates;
}

function getMimeType(filePath, fallback) {
  if (fallback) return fallback;
  const extension = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".mp4": "video/mp4",
  };

  return mimeTypes[extension] ?? "application/octet-stream";
}

function buildHarnessHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mockup Alpha Verify</title>
    <style>
      :root {
        color-scheme: light;
      }
      html, body {
        margin: 0;
        min-height: 100%;
        background: #111827;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        display: grid;
        place-items: center;
      }
      .shell {
        padding: 48px;
        display: grid;
        gap: 20px;
        justify-items: center;
      }
      .label {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.8);
      }
      .frame {
        position: relative;
        display: grid;
        place-items: center;
        outline: 2px dashed rgba(255, 255, 255, 0.22);
        outline-offset: 12px;
        box-shadow: 0 16px 50px rgba(0, 0, 0, 0.24);
      }
      .asset {
        display: block;
        width: 100%;
        height: 100%;
      }
      .asset.video {
        object-fit: contain;
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <div class="label" id="label"></div>
      <div class="frame" id="frame"></div>
    </div>
    <script>
      const params = new URLSearchParams(window.location.search);
      const bg = params.get("bg") || "#34d399";
      const label = params.get("label") || "";
      const width = Number.parseInt(params.get("width") || "0", 10);
      const height = Number.parseInt(params.get("height") || "0", 10);
      const kind = params.get("kind") || "image";
      const mimeType = params.get("mimeType") || "";
      const assetUrl = params.get("assetUrl");
      const inset = Number.parseInt(params.get("inset") || "40", 10);

      const labelNode = document.getElementById("label");
      const frameNode = document.getElementById("frame");
      labelNode.textContent = label;
      document.body.style.background = bg;
      frameNode.style.background = bg;
      frameNode.style.width = width + "px";
      frameNode.style.height = height + "px";

      function hexToRgb(hex) {
        const normalized = hex.replace("#", "");
        const value = normalized.length === 3
          ? normalized.split("").map((part) => part + part).join("")
          : normalized;
        const parsed = Number.parseInt(value, 16);
        return {
          r: (parsed >> 16) & 255,
          g: (parsed >> 8) & 255,
          b: parsed & 255,
        };
      }

      function isBackgroundPixel(data, bgRgb, tolerance = 10) {
        return (
          Math.abs(data[0] - bgRgb.r) <= tolerance &&
          Math.abs(data[1] - bgRgb.g) <= tolerance &&
          Math.abs(data[2] - bgRgb.b) <= tolerance &&
          data[3] >= 250
        );
      }

      async function waitForVideoReady(video) {
        if (video.readyState >= 2) {
          return;
        }

        await new Promise((resolve, reject) => {
          const timeout = window.setTimeout(() => reject(new Error("Timed out waiting for video")), 15000);
          function cleanup() {
            window.clearTimeout(timeout);
            video.removeEventListener("loadeddata", handleReady);
            video.removeEventListener("error", handleError);
          }
          function handleReady() {
            cleanup();
            resolve();
          }
          function handleError() {
            cleanup();
            reject(new Error("Video failed to load"));
          }
          video.addEventListener("loadeddata", handleReady, { once: true });
          video.addEventListener("error", handleError, { once: true });
        });
      }

      function buildSamples(canvas, bgRgb) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const points = [
          { name: "top-left", x: inset, y: inset },
          { name: "top-center", x: Math.round(canvas.width / 2), y: inset },
          { name: "top-right", x: canvas.width - inset, y: inset },
          { name: "mid-left", x: inset, y: Math.round(canvas.height / 2) },
          { name: "mid-right", x: canvas.width - inset, y: Math.round(canvas.height / 2) },
          { name: "bottom-left", x: inset, y: canvas.height - inset },
          { name: "bottom-center", x: Math.round(canvas.width / 2), y: canvas.height - inset },
          { name: "bottom-right", x: canvas.width - inset, y: canvas.height - inset },
        ];

        return points.map((point) => {
          const imageData = ctx.getImageData(point.x, point.y, 1, 1).data;
          return {
            ...point,
            rgba: Array.from(imageData),
            matchesBackground: isBackgroundPixel(imageData, bgRgb),
          };
        });
      }

      async function run() {
        if (!assetUrl) {
          throw new Error("Missing assetUrl");
        }

        const bgRgb = hexToRgb(bg);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        let assetNode;
        if (kind === "video") {
          assetNode = document.createElement("video");
          assetNode.className = "asset video";
          assetNode.muted = true;
          assetNode.loop = true;
          assetNode.autoplay = true;
          assetNode.playsInline = true;
          assetNode.preload = "auto";
          const sourceNode = document.createElement("source");
          sourceNode.src = assetUrl;
          if (mimeType) sourceNode.type = mimeType;
          assetNode.appendChild(sourceNode);
          frameNode.appendChild(assetNode);
          await waitForVideoReady(assetNode);
          try {
            await assetNode.play();
          } catch {
            // Safari may autoplay after an extra ready cycle.
          }
          await new Promise((resolve) => window.setTimeout(resolve, 450));
          ctx.drawImage(assetNode, 0, 0, width, height);
        } else {
          assetNode = document.createElement("img");
          assetNode.className = "asset";
          assetNode.decoding = "sync";
          frameNode.appendChild(assetNode);
          await new Promise((resolve, reject) => {
            assetNode.onload = () => resolve();
            assetNode.onerror = () => reject(new Error("Image failed to load"));
            assetNode.src = assetUrl;
          });
          ctx.drawImage(assetNode, 0, 0, width, height);
        }

        const samples = buildSamples(canvas, bgRgb);
        const backgroundMatches = samples.filter((sample) => sample.matchesBackground).length;
        window.__alphaResult = {
          ready: true,
          pass: backgroundMatches >= 3,
          backgroundMatches,
          sampleCount: samples.length,
          samples,
          kind,
          mimeType,
          width,
          height,
        };
      }

      run().catch((error) => {
        window.__alphaResult = {
          ready: true,
          pass: false,
          error: error instanceof Error ? error.message : String(error),
          kind,
          mimeType,
          width,
          height,
        };
      });
    </script>
  </body>
</html>`;
}

async function startHarnessServer(port, registry) {
  const harnessHtml = buildHarnessHtml();
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);

    if (url.pathname === "/health") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.end("ok");
      return;
    }

    if (url.pathname === "/render") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html; charset=utf-8");
      response.end(harnessHtml);
      return;
    }

    if (url.pathname === "/asset") {
      const assetId = url.searchParams.get("id");
      if (!assetId || !registry.has(assetId)) {
        response.statusCode = 404;
        response.end("Missing asset");
        return;
      }

      const asset = registry.get(assetId);
      response.statusCode = 200;
      response.setHeader("Content-Type", getMimeType(asset.path, asset.mimeType));
      createReadStream(asset.path).pipe(response);
      return;
    }

    response.statusCode = 404;
    response.end("Not found");
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });

  await waitForUrl(`http://127.0.0.1:${port}/health`);

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

function buildHarnessUrl(baseUrl, asset, assetId, background) {
  const url = new URL("/render", baseUrl);
  url.searchParams.set("assetUrl", `/asset?id=${encodeURIComponent(assetId)}`);
  url.searchParams.set("kind", asset.kind);
  url.searchParams.set("mimeType", asset.mimeType);
  url.searchParams.set("width", `${asset.width}`);
  url.searchParams.set("height", `${asset.height}`);
  url.searchParams.set("bg", background);
  url.searchParams.set("label", asset.label);
  url.searchParams.set("inset", `${DEFAULT_SAMPLE_INSET}`);
  return url.toString();
}

function createAssetRegistry(entries, browserSelection) {
  const registry = new Map();
  const targets = [];

  for (const entry of entries) {
    for (const candidate of getAssetCandidates(entry)) {
      if (
        browserSelection !== "both" &&
        candidate.browser !== browserSelection
      ) {
        continue;
      }

      const assetId = `${candidate.slug}-${candidate.key}-${targets.length}`;
      registry.set(assetId, candidate);
      targets.push({
        ...candidate,
        assetId,
      });
    }
  }

  return { registry, targets };
}

function getViewportSize(asset) {
  return {
    width: Math.min(Math.max(asset.width + 220, 1400), 4200),
    height: Math.min(Math.max(asset.height + 220, 1200), 4200),
  };
}

function createFailedVerificationResult(browser, target, error, extra = {}) {
  return {
    browser,
    slug: target.slug,
    asset: target.key,
    label: target.label,
    screenshot: null,
    ready: false,
    pass: false,
    error: error instanceof Error ? error.message : String(error),
    kind: target.kind,
    mimeType: target.mimeType,
    width: target.width,
    height: target.height,
    ...extra,
  };
}

async function verifyInChrome({ baseUrl, background, outputDir, targets, timeoutMs }) {
  const chromePath = detectChromeExecutable();
  if (!chromePath) {
    throw new Error("Unable to find a Chrome executable for alpha verification.");
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
    const results = [];

    for (const target of targets.filter((item) => item.browser === "chrome")) {
      const viewport = getViewportSize(target);
      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: 1,
      });

      try {
        const page = await context.newPage();
        const verifyUrl = buildHarnessUrl(baseUrl, target, target.assetId, background);
        await page.goto(verifyUrl, { waitUntil: "networkidle" });
        await page.waitForFunction(() => window.__alphaResult?.ready === true, {
          timeout: timeoutMs,
        });
        const alphaResult = await page.evaluate(() => window.__alphaResult);
        const screenshotPath = path.join(
          outputDir,
          "chrome",
          `${target.slug}-${target.key}.png`
        );
        await mkdir(path.dirname(screenshotPath), { recursive: true });
        await page.screenshot({ path: screenshotPath, fullPage: true });
        results.push({
          browser: "chrome",
          slug: target.slug,
          asset: target.key,
          label: target.label,
          screenshot: screenshotPath,
          ...alphaResult,
        });
      } finally {
        await context.close();
      }
    }

    return results;
  } finally {
    await browser.close();
  }
}

async function waitForJson(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Keep polling until ready.
    }

    await sleep(300);
  }

  throw new Error(`Timed out waiting for JSON at ${url}`);
}

async function startSafariDriver(port) {
  const child = spawnCommand("safaridriver", ["-p", `${port}`], {
    stdio: "pipe",
  });

  let stderr = "";
  child.stderr?.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  let stdout = "";
  child.stdout?.on("data", (chunk) => {
    stdout += chunk.toString();
  });

  await waitForJson(`http://127.0.0.1:${port}/status`);

  return {
    port,
    stdout,
    stderr,
    stop: () =>
      new Promise((resolve) => {
        child.once("close", resolve);
        child.kill("SIGTERM");
      }),
  };
}

async function safariRequest(port, pathname, options = {}) {
  const response = await fetch(`http://127.0.0.1:${port}${pathname}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const payload = await response.json();

  if (!response.ok) {
    const message =
      payload?.value?.message ??
      payload?.message ??
      `Safari WebDriver request failed for ${pathname}`;
    throw new Error(message);
  }

  return payload.value;
}

async function waitForSafariAlphaResult(port, sessionId, timeoutMs) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const result = await safariRequest(
      port,
      `/session/${sessionId}/execute/sync`,
      {
        method: "POST",
        body: {
          script: "return window.__alphaResult || null;",
          args: [],
        },
      }
    );

    if (result?.ready) {
      return result;
    }

    await sleep(400);
  }

  throw new Error("Timed out waiting for Safari alpha verification.");
}

async function verifyInSafari({ baseUrl, background, outputDir, targets, timeoutMs, port }) {
  const safariTargets = targets.filter((item) => item.browser === "safari");
  if (safariTargets.length === 0) {
    return [];
  }

  let driver;
  try {
    driver = await startSafariDriver(port + 1);
  } catch (error) {
    return safariTargets.map((target) =>
      createFailedVerificationResult("safari", target, error, {
        blocked: true,
        phase: "driver-start",
      })
    );
  }

  try {
    let session;
    try {
      session = await safariRequest(driver.port, "/session", {
        method: "POST",
        body: {
          capabilities: {
            alwaysMatch: {
              browserName: "safari",
              acceptInsecureCerts: true,
            },
          },
        },
      });
    } catch (error) {
      return safariTargets.map((target) =>
        createFailedVerificationResult("safari", target, error, {
          blocked: true,
          phase: "session-create",
        })
      );
    }

    const sessionId = session.sessionId ?? session["sessionId"];
    const results = [];

    try {
      for (const target of safariTargets) {
        try {
          const viewport = getViewportSize(target);
          await safariRequest(driver.port, `/session/${sessionId}/window/rect`, {
            method: "POST",
            body: {
              width: viewport.width,
              height: viewport.height,
            },
          });

          const verifyUrl = buildHarnessUrl(baseUrl, target, target.assetId, background);
          await safariRequest(driver.port, `/session/${sessionId}/url`, {
            method: "POST",
            body: { url: verifyUrl },
          });

          const alphaResult = await waitForSafariAlphaResult(
            driver.port,
            sessionId,
            timeoutMs
          );
          const screenshotBase64 = await safariRequest(
            driver.port,
            `/session/${sessionId}/screenshot`
          );
          const screenshotPath = path.join(
            outputDir,
            "safari",
            `${target.slug}-${target.key}.png`
          );
          await mkdir(path.dirname(screenshotPath), { recursive: true });
          await writeFile(screenshotPath, Buffer.from(screenshotBase64, "base64"));
          results.push({
            browser: "safari",
            slug: target.slug,
            asset: target.key,
            label: target.label,
            screenshot: screenshotPath,
            ...alphaResult,
          });
        } catch (error) {
          results.push(
            createFailedVerificationResult("safari", target, error, {
              phase: "target-verify",
            })
          );
        }
      }
    } finally {
      await safariRequest(driver.port, `/session/${sessionId}`, {
        method: "DELETE",
      }).catch(() => {});
    }

    return results;
  } finally {
    await driver.stop();
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const manifestPaths =
    args.manifests.length > 0
      ? args.manifests
      : [path.join(repoRoot, "public", "assets", "mockups", "mobile", "manifest.json")];

  const manifestEntries = (
    await Promise.all(manifestPaths.map((manifestPath) => readManifest(manifestPath)))
  ).flat();

  const selectedEntries =
    args.slugs.length > 0
      ? manifestEntries.filter((entry) => args.slugs.includes(entry.slug))
      : manifestEntries;

  if (selectedEntries.length === 0) {
    throw new Error("No manifest entries matched the requested slug(s).");
  }

  for (const entry of selectedEntries) {
    for (const candidate of getAssetCandidates(entry)) {
      const assetStats = await stat(candidate.path).catch(() => null);
      if (!assetStats?.isFile()) {
        throw new Error(`Missing asset for verification: ${candidate.path}`);
      }
    }
  }

  const { registry, targets } = createAssetRegistry(selectedEntries, args.browsers);
  if (targets.length === 0) {
    throw new Error("No alpha assets matched the selected browser(s).");
  }

  await mkdir(args.outputDir, { recursive: true });
  const server = await startHarnessServer(args.port, registry);

  try {
    const results = [];

    if (args.browsers === "chrome" || args.browsers === "both") {
      results.push(
        ...(await verifyInChrome({
          baseUrl: server.baseUrl,
          background: args.background,
          outputDir: args.outputDir,
          targets,
          timeoutMs: args.timeoutMs,
        }))
      );
    }

    if (args.browsers === "safari" || args.browsers === "both") {
      results.push(
        ...(await verifyInSafari({
          baseUrl: server.baseUrl,
          background: args.background,
          outputDir: args.outputDir,
          targets,
          timeoutMs: args.timeoutMs,
          port: args.port,
        }))
      );
    }

    const summaryPath = path.join(args.outputDir, "alpha-verification.json");
    await writeFile(summaryPath, `${JSON.stringify(results, null, 2)}\n`, "utf8");
    process.stdout.write(`Wrote verification summary to ${summaryPath}\n`);

    const failedResults = results.filter((result) => !result.pass);
    if (failedResults.length > 0) {
      process.exitCode = 1;
    }
  } finally {
    await server.stop();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
