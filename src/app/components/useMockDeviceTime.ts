"use client";

import { useEffect, useState } from "react";

function formatDeviceTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

type UseMockDeviceTimeOptions = {
  enabled?: boolean;
  syncIntervalMs?: number;
};

export function useMockDeviceTime(
  fallback = "09:41",
  { enabled = true, syncIntervalMs = 10000 }: UseMockDeviceTimeOptions = {}
) {
  const [timeLabel, setTimeLabel] = useState(fallback);

  useEffect(() => {
    if (!enabled) {
      setTimeLabel(fallback);
      return;
    }

    const setTime = (date: Date) => {
      setTimeLabel(formatDeviceTime(date));
    };

    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, syncIntervalMs);

    return () => clearInterval(timer);
  }, [enabled, fallback, syncIntervalMs]);

  return timeLabel;
}
