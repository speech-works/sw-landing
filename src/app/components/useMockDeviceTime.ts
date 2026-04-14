"use client";

import { useEffect, useState } from "react";

function formatDeviceTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function useMockDeviceTime(fallback = "09:41") {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);
    const syncTime = () => setTime(new Date());
    syncTime();
    const timer = setInterval(syncTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return mounted ? formatDeviceTime(time) : fallback;
}
