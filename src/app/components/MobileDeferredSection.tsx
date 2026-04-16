"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { useIsMobileViewport } from "./useIsMobileViewport";
import { useElementInView } from "./useElementInView";

type MobileDeferredSectionProps = {
  children: ReactNode;
  className?: string;
  placeholderClassName?: string;
  rootMargin?: string;
  wrapperId?: string;
};

export default function MobileDeferredSection({
  children,
  className,
  placeholderClassName,
  rootMargin = "320px 0px",
  wrapperId,
}: MobileDeferredSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobileViewport = useIsMobileViewport();
  const isNearViewport = useElementInView(wrapperRef, {
    rootMargin,
  });
  const [hasMountedChild, setHasMountedChild] = useState(false);

  useEffect(() => {
    if (!isMobileViewport) {
      setHasMountedChild(true);
      return;
    }

    if (isNearViewport) {
      setHasMountedChild(true);
    }
  }, [isMobileViewport, isNearViewport]);

  return (
    <div
      id={wrapperId}
      ref={wrapperRef}
      className={className}
    >
      {hasMountedChild ? (
        children
      ) : (
        <div
          aria-hidden="true"
          className={placeholderClassName}
        />
      )}
    </div>
  );
}
