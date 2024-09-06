import type { ReactNode } from "react";

type SelectOption = {
  label: string;
  value: string | number;
  icon?: ReactNode;
};

export type SelectProps = {
  label?: string;
  options?: SelectOption[];
  defaultSelected?: string | number;
  onChange?: (value: string | number) => void;
};
