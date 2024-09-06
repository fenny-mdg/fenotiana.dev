import clsx from "clsx";
import type { InputProps } from "./common";

export default function Input({
  name,
  label,
  defaultValue,
  id,
  placeholder = "",
  type = "text",
  className,
  required = false,
}: InputProps) {
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
      <input
        id={id || name}
        type={type}
        name={name}
        className="block w-full border-0  bg-inherit placeholder-gray-500 focus:ring-0 sm:text-sm "
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
}
