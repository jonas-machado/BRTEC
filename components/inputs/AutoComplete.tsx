import React, { Fragment, useState } from "react";
import { Controller } from "react-hook-form";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface AutoCompleteType {
  options: any[];
  placeHolder: string;
  id: string;
  className?: any;
  selectedItem: any;
  setSelectedItem: any;
}

export default function AutoComplete({
  options,
  placeHolder,
  className,
  id,
  selectedItem,
  setSelectedItem,
}: AutoCompleteType) {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  console.log(options);
  //shadow-[0px_0px_4px_0_rgb(147_51_234/1)] shadow-black
  return (
    <>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className="relative cursor-default w-[8rem] h-[2.1rem] rounded-md bg-white text-left text-gray-900 shadow-sm focus:outline-none text-xl sm:text-md">
                <span className="pointer-events-none w-full absolute inset-y-0 right-0 flex items-center pl-2">
                  Técnologia
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
                <Listbox.Options className="absolute w-full z-10 mt-1 max-h-56 w-[10rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {item.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
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
        )}
      </Listbox>
    </>
  );
}
