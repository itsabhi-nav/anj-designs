/**
 * A tiny shared pointer store.
 *
 * One `pointermove` listener feeds both the custom cursor and the magnetic
 * elements, so the whole site reacts to the pointer from a single source and
 * without any component re-rendering on every move.
 */

export type CursorMode = "default" | "link" | "view" | "drag" | "text";

interface PointerState {
  x: number;
  y: number;
  mode: CursorMode;
  label: string;
}

const state: PointerState = { x: 0, y: 0, mode: "default", label: "" };

type Listener = (state: PointerState) => void;
const listeners = new Set<Listener>();

let started = false;

function resolveTarget(target: EventTarget | null): {
  mode: CursorMode;
  label: string;
} {
  const element = target as HTMLElement | null;
  if (!element || typeof element.closest !== "function") {
    return { mode: "default", label: "" };
  }

  const scoped = element.closest<HTMLElement>("[data-cursor]");
  if (scoped) {
    const mode = (scoped.dataset.cursor as CursorMode) || "default";
    return { mode, label: scoped.dataset.cursorLabel ?? "" };
  }

  if (element.closest("a, button, [role='button'], input, select, textarea")) {
    return { mode: "link", label: "" };
  }

  if (element.closest("p, h1, h2, h3, blockquote")) {
    return { mode: "text", label: "" };
  }

  return { mode: "default", label: "" };
}

function handleMove(event: PointerEvent) {
  if (event.pointerType !== "mouse") return;
  state.x = event.clientX;
  state.y = event.clientY;

  const { mode, label } = resolveTarget(event.target);
  if (mode !== state.mode || label !== state.label) {
    state.mode = mode;
    state.label = label;
    emit();
  }
}

function handleOver(event: MouseEvent) {
  const { mode, label } = resolveTarget(event.target);
  if (mode !== state.mode || label !== state.label) {
    state.mode = mode;
    state.label = label;
    emit();
  }
}

function handleLeave() {
  state.mode = "default";
  state.label = "";
  emit();
}

function emit() {
  for (const listener of listeners) listener(state);
}

function start() {
  if (started) return;
  started = true;
  window.addEventListener("pointermove", handleMove, { passive: true });
  window.addEventListener("mouseover", handleOver, { passive: true });
  document.addEventListener("mouseleave", handleLeave);
}

export function subscribePointer(listener: Listener): () => void {
  listeners.add(listener);
  start();
  return () => {
    listeners.delete(listener);
  };
}

export function getPointer(): PointerState {
  return state;
}

/** True when the visitor is on a fine-pointer device that can hover. */
export function canHover(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}
