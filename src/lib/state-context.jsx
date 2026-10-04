"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Which state the visitor is in: Victoria or New South Wales.
 *
 * This exists because almost every incentive, loan and finance offer on the
 * site is state-specific, and the old build simply assumed Victoria. A NSW
 * visitor was shown Solar Victoria programs they cannot apply for, which is
 * the same class of error as an out-of-date rebate figure.
 *
 * The rule the punch list sets, and the one every consumer of this context
 * must honour: THE SELECTOR COMES BEFORE THE CONTENT. A reader should never
 * see an incentive or a finance offer before they have been told, or have
 * told us, which state it applies to.
 *
 * Federal programs are deliberately NOT part of this. They apply in both
 * states and are rendered from their own list, so that switching VIC to NSW
 * never makes a federal program appear or disappear and imply it is
 * state-conditional.
 */

export const STATES = [
  { code: "VIC", label: "Victoria", short: "VIC" },
  { code: "NSW", label: "New South Wales", short: "NSW" },
];

export const DEFAULT_STATE = "VIC";

/* Lumenx has two offices and the Victorian one is the head office, so VIC is
   the honest default rather than a guess at the reader's location. We do not
   geolocate: being silently switched to another state's programs is worse
   than picking the wrong default and showing a visible control to change it. */

const StateCtx = createContext(null);

const STORAGE_KEY = "lumenx.state";

export function StateProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);
  // Until the stored choice has been read, nothing state-specific should be
  // committed to. Server render and first client paint must agree, so the
  // stored value is applied in an effect and components can use `ready` to
  // avoid announcing a program for the wrong state for one frame.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && STATES.some((s) => s.code === saved)) setState(saved);
    } catch {
      // Private mode, blocked storage. The default stands; the selector works.
    }
    setReady(true);
  }, []);

  const value = useMemo(
    () => ({
      state,
      ready,
      isVic: state === "VIC",
      isNsw: state === "NSW",
      label: STATES.find((s) => s.code === state)?.label ?? "Victoria",
      setState(next) {
        if (!STATES.some((s) => s.code === next)) return;
        setState(next);
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* nothing to do: the choice still applies for this visit */
        }
      },
    }),
    [state, ready]
  );

  return <StateCtx.Provider value={value}>{children}</StateCtx.Provider>;
}

/**
 * Safe outside the provider: returns the default state and `ready: false`
 * rather than throwing, so a component that drifts out of the tree degrades
 * to "Victoria, not yet confirmed" instead of crashing the page.
 */
export function useAuState() {
  const ctx = useContext(StateCtx);
  if (ctx) return ctx;
  return {
    state: DEFAULT_STATE,
    ready: false,
    isVic: true,
    isNsw: false,
    label: "Victoria",
    setState() {},
  };
}
