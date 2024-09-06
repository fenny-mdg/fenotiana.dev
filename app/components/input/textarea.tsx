import clsx from "clsx";
import type { InputProps } from "./common";

export default function Textarea({
  name,
  label,
  defaultValue,
  id,
  className,
  placeholder = "",
  rows = 10,
  required = false,
}: InputProps & { rows?: number }) {
  return (
    <div
      className={clsx(
        "relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500",
        "text-gray-900 dark:text-white",
        className
      )}
    >
      {label ? (
        <label
          htmlFor={id || name}
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium  dark:bg-slate-800 "
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={id || name}
        name={name}
        className="block w-full   border-0 bg-inherit px-2 py-1  placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
      />
    </div>
  );
}
