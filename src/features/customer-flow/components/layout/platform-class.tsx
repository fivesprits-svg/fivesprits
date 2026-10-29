"use client";

import { useEffect } from "react";

export function PlatformClass() {
  useEffect(() => {
    const { documentElement } = document;

    if (/Win/i.test(navigator.userAgent)) documentElement.dataset.platform = "windows";

    return () => {
      delete documentElement.dataset.platform;
    };
  }, []);

  return null;
}
