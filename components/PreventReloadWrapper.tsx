'use client';

import { usePreventReload } from '@/hooks/usePreventReload';
import { useScrollOptimization } from '@/hooks/useScrollOptimization';

interface PreventReloadWrapperProps {
  children: React.ReactNode;
}

export default function PreventReloadWrapper({ children }: PreventReloadWrapperProps) {
  // Hooks để prevent reload và tối ưu scroll trong in-app browser
  usePreventReload();
  useScrollOptimization();

  return <>{children}</>;
}