"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/animations";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return <>{children}</>;
}