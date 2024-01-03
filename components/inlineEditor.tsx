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
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const array = [
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
  date: Date;
  bases: string[];
  text: string;
  isUp: boolean;
}

export default function InlineEditor({
  date,
  bases,
  text,
  isUp,
}: InlineEditorProps) {
  const [currentBase, setCurrentBase] = useState(bases);
  const [isUpNow, setIsUpNow] = useState(isUp);
  console.log(currentBase);
  const save = (value: any) => {
    console.log(value);
  };
  const cancel = () => {
    console.log("Cancelled");
  };
  console.log(isUpNow);
  return (
    <>
      <div
        className={`bg-black relative z-0 p-2 backdrop-blur-md flex w-full transition h-full rounded-md items-center gap-4 bg-opacity-20 ${
          isUpNow ? "bg-green-400" : "bg-red-600"
        }`}
      >
        <button
          onClick={() => setIsUpNow(!isUpNow)}
          className={`text-black rounded-md p-2 min-w-[70px] ${
            isUpNow ? "bg-green-400" : "bg-red-600"
          }`}
        >
          {isUpNow ? "UP" : "DOWN"}
        </button>
        <TextareaAutosize className="w-full bg-transparent resize-none text-gray-300 text-2xl outline-none" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="mr-4"
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
        <div className="relative z-0 ml-4 backdrop-blur-xl rounded-lg shadow-black">
          <Listbox value={currentBase} onChange={setCurrentBase} multiple>
            <div className="relative h-full items-center">
              <Listbox.Button className="relative flex items-center min-w-[90px] w-full h-9 cursor-pointer rounded-lg bg-transparent pr-10 text-left">
                {currentBase.map((item: any) => (
                  <>
                    <span
                      key={item}
                      className={` truncate ${
                        array.find((base: any) => base.name == item)?.class
                      } rounded-full px-2 text-lg font-bold`}
                    >
                      {item}
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {array.map((item: any, itemIdx: number) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active ? "bg-gray-800" : "text-gray-900"
                        }`
                      }
                      value={item.name}
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
        <button>
          <XMarkIcon className="w-10 h-10 font-bold" />
        </button>
      </div>
    </>
  );
}
