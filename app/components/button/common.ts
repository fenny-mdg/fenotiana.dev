import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  children?: React.ReactNode | React.ReactNode[] | string;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
};
