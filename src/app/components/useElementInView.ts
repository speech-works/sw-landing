"use client";

import { RefObject, useEffect, useState } from "react";

type UseElementInViewOptions = {
  disabled?: boolean;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useElementInView<T extends Element>(
  ref: RefObject<T | null>,
  {
    disabled = false,
    once = false,
    rootMargin = "0px",
    threshold = 0,
  }: UseElementInViewOptions = {}
) {
  const [isInView, setIsInView] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
          return;
        }

        if (!once) {
          setIsInView(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [disabled, once, ref, rootMargin, threshold]);

  return isInView;
}
