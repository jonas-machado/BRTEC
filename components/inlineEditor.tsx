"use client";
//@ts-ignore
import EasyEdit, { Types } from "react-easy-edit";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const people = [
  {
    name: "VOU",
    class: "text-orange-600 bg-orange-600 bg-opacity-20",
  },
  {
    name: "ATELE",
    class: "text-green-600 bg-green-600 bg-opacity-20",
  },
  {
    name: "XTELE",
    class: "text-gray-400 bg-gray-600 bg-opacity-20",
  },
];

export default function InlineEditor() {
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState(false);
  const save = (value: any) => {
    console.log(value);
  };
  const cancel = () => {
    console.log("Cancelled");
  };

  return (
    <>
      <div className="bg-black bg-opacity-80 backdrop-blur-md flex w-full h-full p-12 rounded-md items-center">
        <button
          onClick={() => setStatus(!status)}
          className={`text-black rounded-md p-2 w-20 ${
            status ? "bg-green-400" : "bg-red-600"
          }`}
        >
          {!status ? "DOWN" : "UP"}
        </button>
        <EasyEdit
          type={Types.TEXT}
          onSave={save}
          onCancel={cancel}
          saveButtonLabel={<CheckIcon className="w-4 h-4" />}
          cancelButtonLabel={<XMarkIcon className="w-4 h-4" />}
          attributes={{ name: "awesome-input", id: 1 }}
        />

        <div className="w-60 h-20">
          <Listbox value={selected} onChange={setSelected} multiple>
            <div className="relative h-full items-center">
              <Listbox.Button className="relative w-full h-full cursor-pointer rounded-lg bg-transparent py-2 pl-3 pr-10 text-left">
                {selected.map((item: any) => (
                  <>
                    <span
                      className={` truncate ${item.class} rounded-full p-1 px-2 text-lg`}
                    >
                      {item.name}
                    </span>
                  </>
                ))}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center ">
                  <ChevronUpDownIcon
                    className="h-10 w-10 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {people.map((item, itemIdx) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active ? "bg-gray-800" : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate p-2 rounded-md ${
                              item.class
                            } ${selected ? "font-medium" : "font-normal"}`}
                          >
                            {item.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-6 text-purple-600">
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
          </Listbox>
        </div>
      </div>
    </>
  );
}
