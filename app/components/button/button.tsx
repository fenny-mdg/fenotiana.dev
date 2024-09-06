import clsx from "clsx";

import type { ButtonProps } from "./common.ts";

export default function Button({
  children,
  className,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        disabled
          ? "cursor-not-allowed from-slate-600 to-slate-400"
          : "from-violet-500 via-pink-500 to-rose-600",
        "rounded-lg bg-gradient-to-r  px-6 py-3 font-medium text-white",
        className
      )}
      type={type}
      disabled={disabled}
    >
      {children ? children : null}
    </button>
  );
}
