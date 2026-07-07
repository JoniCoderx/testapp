'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PwaState {
  /** An install is possible (native prompt available, or iOS add-to-home). */
  canInstall: boolean;
  /** The app is already running as an installed PWA. */
  isInstalled: boolean;
  isIOS: boolean;
  /** Trigger install: native prompt where supported, else iOS instructions. */
  promptInstall: () => void;
  /** Whether the iOS "Add to Home Screen" help sheet is open. */
  iosHelpOpen: boolean;
  closeIosHelp: () => void;
}

const Ctx = createContext<PwaState | null>(null);

export function usePwa(): PwaState {
  return (
    useContext(Ctx) ?? {
      canInstall: false,
      isInstalled: false,
      isIOS: false,
      promptInstall: () => {},
      iosHelpOpen: false,
      closeIosHelp: () => {},
    }
  );
}

export default function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [iosHelpOpen, setIosHelpOpen] = useState(false);

  // Register the service worker (production only).
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }
    const onLoad = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    };
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Detect install state + platform, wire install events.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-expect-error iOS Safari only
      window.navigator.standalone === true ||
      document.referrer.startsWith('android-app://');
    setIsInstalled(standalone);

    const ua = window.navigator.userAgent;
    const ios =
      /iphone|ipad|ipod/i.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = /^((?!chrome|crios|fxios|edgios|android).)*safari/i.test(ua);
    setIsIOS(ios && isSafari && !standalone);

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setDeferred(null);
    };
    window.addEventListener('beforeinstallprompt', onBIP);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBIP);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const promptInstall = useCallback(() => {
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.finally(() => setDeferred(null));
      return;
    }
    if (isIOS) setIosHelpOpen(true);
  }, [deferred, isIOS]);

  const closeIosHelp = useCallback(() => setIosHelpOpen(false), []);

  const value = useMemo<PwaState>(
    () => ({
      canInstall: (!!deferred || isIOS) && !isInstalled,
      isInstalled,
      isIOS,
      promptInstall,
      iosHelpOpen,
      closeIosHelp,
    }),
    [deferred, isIOS, isInstalled, promptInstall, iosHelpOpen, closeIosHelp],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <IosHelpSheet open={iosHelpOpen} onClose={closeIosHelp} />
    </Ctx.Provider>
  );
}

/** iOS "Add to Home Screen" instructions — shown only when the user taps
 * Install on an iPhone/iPad (never auto-shown). Dismissible bottom sheet. */
function IosHelpSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Install instructions"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        className="relative w-full max-w-md glass-strong rounded-t-3xl sm:rounded-3xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-6"
        style={{ animation: 'mpxSheetUp .28s ease-out' }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15 sm:hidden" />
        <h3 className="text-lg font-bold text-white">Install MarketPulse X</h3>
        <p className="mt-1 text-sm text-white/55">
          Add it to your Home Screen for a full-screen, app-like experience.
        </p>
        <ol className="mt-5 space-y-3 text-sm text-white/80">
          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-cyan">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M12 16V4m0 0L8 8m4-4 4 4M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Tap the <b className="text-white">Share</b> button in Safari&apos;s toolbar.
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-cyan">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            Choose <b className="text-white">Add to Home Screen</b>.
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-cyan">✓</span>
            Tap <b className="text-white">Add</b> — done!
          </li>
        </ol>
        <button onClick={onClose} className="btn-primary mt-6 w-full">
          Got it
        </button>
      </div>
    </div>
  );
}
