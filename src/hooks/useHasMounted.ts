"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during server rendering and hydration, true once the client is running.
 * Lets a component read browser-only state (localStorage) without a hydration mismatch.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
