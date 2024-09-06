import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import type { SelectProps } from "./common";

export default function Select({
  label,
  options,
  defaultSelected,
  onChange = (value) => {},
}: SelectProps) {
  const [selected, setSelected] = useState(defaultSelected);

  const handleChange = (value: string | number) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => {
        const selectedOption = options?.find(
          (option) => option.value === selected
        );

        return (
          <>
            {label ? (
              <Listbox.Label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </Listbox.Label>
            ) : null}
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-md border bg-inherit  py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 sm:text-sm">
                <span className="flex items-center">
                  {selectedOption?.icon}
                  <span className="ml-3 block truncate">
                    {selectedOption?.label}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-inherit bg-white py-1 text-base shadow-lg ring-1 ring-gray-200 ring-opacity-100 focus:outline-none dark:bg-slate-800 dark:ring-gray-700 sm:text-sm">
                  {options?.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        clsx(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={option.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {option.icon}
                            {option?.label ? (
                              <span
                                className={clsx(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {option.label}
                              </span>
                            ) : null}
                          </div>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        );
      }}
    </Listbox>
  );
}
