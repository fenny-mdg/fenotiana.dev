import { Switch } from "@headlessui/react";

type ToggleProps = {
  checked: boolean;
  onChange: (cshecked: boolean) => void;
  screenReaderLabel?: string;
};

export default function Toggle({
  checked,
  onChange,
  screenReaderLabel,
}: ToggleProps) {
  const handleChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      className={`${
        checked ? "bg-violet-500" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      {screenReaderLabel ? (
        <span className="sr-only">{screenReaderLabel}</span>
      ) : null}
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
