"use client";

import { useEffect } from "react";

/** Small, spring-smoothed offsets on decorative layers only. No scroll hijacking. */
export default function SceneDepth() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const scenes = [...document.querySelectorAll<HTMLElement>(".home-page [data-depth-scene]")].map((root) => ({
      root, visible: false, pointerX: 0, pointerY: 0,
      layers: [...root.querySelectorAll<HTMLElement>("[data-depth]")].map((element) => ({
        element, depth: Number(element.dataset.depth) || 1, x: 0, y: 0, vx: 0, vy: 0,
      })),
    }));
    let frame = 0;
    let previous = 0;
    let keyboard = false;
    const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      scenes.forEach((scene) => {
        scene.pointerX = scene.pointerY = 0;
        scene.layers.forEach((layer) => {
          layer.x = layer.y = layer.vx = layer.vy = 0;
          layer.element.style.removeProperty("transform");
        });
      });
    };
    const tick = (time: number) => {
      frame = 0;
      if (reduced.matches || document.hidden || keyboard) return;
      const dt = previous ? Math.min((time - previous) / 1000, .032) : 1 / 60;
      previous = time;
      let moving = false;
      // Read section geometry before applying any layer transforms.
      const positions = scenes.map((scene) => scene.visible ? scene.root.getBoundingClientRect() : null);
      scenes.forEach((scene, index) => {
        const rect = positions[index];
        if (!rect) return;
        const scroll = clamp((innerHeight * .5 - (rect.top + rect.height * .5)) * .045, 24);
        const touchScale = fine.matches ? 1 : .4;
        scene.layers.forEach((layer) => {
          const targetX = scene.pointerX * 10 * layer.depth;
          const targetY = (scroll * touchScale + scene.pointerY * 7) * layer.depth;
          layer.vx += ((targetX - layer.x) * 170 - layer.vx * 26) * dt;
          layer.vy += ((targetY - layer.y) * 170 - layer.vy * 26) * dt;
          layer.x += layer.vx * dt;
          layer.y += layer.vy * dt;
          const settling = Math.abs(targetX - layer.x) + Math.abs(targetY - layer.y) + Math.abs(layer.vx) + Math.abs(layer.vy) > .08;
          if (!settling) { layer.x = targetX; layer.y = targetY; layer.vx = layer.vy = 0; }
          layer.element.style.transform = `translate3d(${layer.x.toFixed(2)}px, ${layer.y.toFixed(2)}px, 0)`;
          moving ||= settling;
        });
      });
      if (moving) frame = requestAnimationFrame(tick);
      else previous = 0;
    };
    const schedule = () => {
      if (!frame && !reduced.matches && !document.hidden && !keyboard) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const scene = scenes.find((item) => item.root === entry.target);
        if (scene) scene.visible = entry.isIntersecting;
      });
      schedule();
    });
    const cleanups = scenes.map((scene) => {
      observer.observe(scene.root);
      const pointer = (event: PointerEvent) => {
        if (!fine.matches || event.pointerType !== "mouse" || reduced.matches) return;
        keyboard = false;
        const rect = scene.root.getBoundingClientRect();
        scene.pointerX = clamp(((event.clientX - rect.left) / rect.width - .5) * 2, 1);
        scene.pointerY = clamp(((event.clientY - rect.top) / rect.height - .5) * 2, 1);
        schedule();
      };
      const leave = () => { scene.pointerX = scene.pointerY = 0; schedule(); };
      scene.root.addEventListener("pointermove", pointer, { passive: true });
      scene.root.addEventListener("pointerleave", leave);
      return () => {
        scene.root.removeEventListener("pointermove", pointer);
        scene.root.removeEventListener("pointerleave", leave);
      };
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      keyboard = true;
      reset();
    };
    const onPointer = () => { keyboard = false; schedule(); };
    const onPreference = () => { reset(); schedule(); };
    const onVisibility = () => { if (document.hidden) reset(); else schedule(); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer, { passive: true });
    document.addEventListener("wheel", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onPreference);
    fine.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("wheel", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onPreference);
      fine.removeEventListener("change", onPreference);
      reset();
    };
  }, []);
  return null;
}
