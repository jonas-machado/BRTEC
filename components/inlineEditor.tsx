"use client";
//@ts-ignore
import EasyEdit, { Types } from "react-easy-edit";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
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

interface InlineEditorProps {
  changeStatus: () => void;
  date: Date;
  bases: string[];
  setBases: any;
  text: string;
  isUp: boolean;
  array: any;
}

export default function InlineEditor({
  changeStatus,
  date,
  bases,
  setBases,
  text,
  isUp,
  array,
}: InlineEditorProps) {
  const save = (value: any) => {
    console.log(value);
  };
  const cancel = () => {
    console.log("Cancelled");
  };

  return (
    <>
      <div
        className={`bg-black relative z-0 px-2 backdrop-blur-md flex w-full transition h-full rounded-md items-center gap-4 bg-opacity-20 ${
          isUp ? "bg-green-400" : "bg-red-600"
        }`}
      >
        <button
          onClick={changeStatus}
          className={`text-black rounded-md p-2 min-w-[70px] ${
            isUp ? "bg-green-400" : "bg-red-600"
          }`}
        >
          {isUp ? "UP" : "DOWN"}
        </button>
        <EasyEdit
          type={Types.TEXT}
          onSave={save}
          onCancel={cancel}
          saveButtonLabel={<CheckIcon className="w-4 h-4" />}
          cancelButtonLabel={<XMarkIcon className="w-4 h-4" />}
          attributes={{ name: "awesome-input", id: 1 }}
          value={text}
          defaultValue="Clique para editar"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            ampm={false}
            defaultValue={dayjs(date)}
            format="DD/MM/YY HH:mm"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </LocalizationProvider>
        <div className="w-60 relative z-0 backdrop-blur-xl rounded-lg shadow-black">
          <Listbox value={bases} onChange={setBases} multiple>
            <div className="relative h-full items-center">
              <Listbox.Button className="relative w-full h-9 cursor-pointer rounded-lg bg-transparent pl-3 pr-10 text-left">
                {bases.map((item: any) => (
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
                    className="h-8 w-8 text-gray-400"
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
                <Listbox.Options className="absolute bottom-11 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {array.map((item: any, itemIdx: number) => (
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
