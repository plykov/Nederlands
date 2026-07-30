import type { KeyboardEvent } from "react";

/**
 * A `<div className="card tappable" onClick={...}>` reads as inert content
 * to a screen reader and cannot be reached by Tab — it needs the same
 * role/keyboard handling a real `<button>` gets for free. Spread this onto
 * every such div instead of repeating it at 20+ call sites.
 */
export function tappable(onClick: () => void) {
  return {
    role: "button" as const,
    tabIndex: 0,
    onClick,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
  };
}
