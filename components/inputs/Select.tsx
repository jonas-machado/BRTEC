import React, { Fragment, useState } from "react";
import { Controller } from "react-hook-form";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface AutoCompleteType {
  options: any[];
  placeHolder: string;
  id: string;
  className?: any;
  selectedItem?: any;
  setSelectedItem: any;
  onChange: any;
}

export default function Select({
  options,
  placeHolder,
  className,
  id,
  selectedItem,
  setSelectedItem,
  onChange,
}: AutoCompleteType) {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const setSelected = (value: any) => {
    setSelectedItem(value);
    onChange(value);
  };
  console.log(selectedItem);
  //shadow-[0px_0px_4px_0_rgb(147_51_234/1)] shadow-black
  return (
    <>
      <Listbox value={selectedItem} onChange={(e) => setSelected(e)}>
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button
                placeholder={placeHolder}
                className="relative cursor-default w-[8rem] h-[2.1rem] rounded-md bg-transparent text-left text-gray-300 focus:outline-none text-xl sm:text-md shadow-[0px_0px_4px_0_rgb(147_51_234/1)] shadow-black"
              >
                <span className="pointer-events-none w-full absolute inset-y-0 right-0 flex items-center pl-2 justify-between">
                  {selectedItem ?? placeHolder}
                  <ChevronUpDownIcon
                    className="h-8 w-8 text-gray-400"
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
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-[8rem] overflow-auto rounded-md bg-gray-900 border-2 bg-opacity-70 backdrop-blur-sm border-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((item) => (
                    <Listbox.Option
                      key={item}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-gray-800 text-white" : "text-gray-300",
                          "relative cursor-default select-none w-full"
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center justify-center">
                            <span
                              className={classNames(
                                selected
                                  ? "font-semibold text-purple-600"
                                  : "font-normal",
                                " block truncate py-2"
                              )}
                            >
                              {item}
                            </span>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
}
