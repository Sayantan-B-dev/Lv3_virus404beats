"use client";

import { useEffect } from "react";
import { applyTheme } from "@/config/theme";

export function ThemeInit() {
  useEffect(() => {
    applyTheme();
  }, []);
  return null;
}