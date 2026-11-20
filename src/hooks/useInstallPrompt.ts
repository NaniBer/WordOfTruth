"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Non-standard properties that older iOS Safari and IE expose on the globals.
type IOSNavigator = Navigator & { standalone?: boolean };
type LegacyWindow = Window & { MSStream?: unknown };

const noopSubscribe = () => () => {};
const detectIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as LegacyWindow).MSStream;
const detectStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as IOSNavigator).standalone === true;

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installedThisSession, setInstalledThisSession] = useState(false);
  const isIOS = useSyncExternalStore(noopSubscribe, detectIOS, () => false);
  const isInStandaloneMode = useSyncExternalStore(noopSubscribe, detectStandalone, () => false);
  const isInstalled = installedThisSession || isInStandaloneMode;

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstalledThisSession(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return false;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setInstalledThisSession(true);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  return {
    canInstall: !isInstalled && (!!deferredPrompt || isIOS),
    isInstalled,
    isIOS,
    isInStandaloneMode,
    installApp,
    deferredPrompt,
  };
}
