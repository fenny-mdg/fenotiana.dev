import type { InputHTMLAttributes } from "react";

export type InputProps = {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  required?: boolean;
};
