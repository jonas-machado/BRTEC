"use client";
//@ts-ignore
import EasyEdit, { Types } from "react-easy-edit";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import dynamic from "next/dynamic";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import { SocketContext } from "@/lib/socket";
import { useRouter } from "next/navigation";
import ControlledInput from "./inputs/controlledInput";
import AutoComplete from "./inputs/Select";
import Select from "./inputs/Select";

const array = [
  {
    name: "VOU",
    class: "text-orange-300 bg-orange-600 bg-opacity-20 ",
  },
  {
    name: "ATELE",
    class: "text-green-300 bg-green-600 bg-opacity-20",
  },
  {
    name: "XTELE",
    class: "text-gray-300 bg-gray-600 bg-opacity-20",
  },
];

interface InlineEditorProps {
  index: number;
  id: string;
  date: Date;
  bases: string[];
  text: string;
  isUp: boolean;
  tecnology: string;
}

export default function InlineOutput({
  index,
  id,
  date,
  bases,
  text,
  isUp,
  tecnology,
}: InlineEditorProps) {
  const currentDatetime = new Date(date);
  // Get year, month (0-indexed), day, hours, minutes, seconds
  const year = currentDatetime?.getFullYear();
  const month = currentDatetime?.getMonth() + 1; // Months are zero-indexed
  const day = currentDatetime?.getDate();
  const hours = currentDatetime?.getHours();
  const minutes = currentDatetime?.getMinutes();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <>
      <div
        className={`bg-black p-2 backdrop-blur-md flex flex-row w-full transition h-full rounded-md items-center gap-4 bg-opacity-80 ${
          isUp ? "bg-green-800" : "bg-red-800"
        }`}
      >
        <button
          className={`text-black rounded-md text-sm sm:text-lg py-2 font-bold min-w-[55px] sm:min-w-[70px] ${
            isUp ? "bg-green-400" : "bg-red-600"
          }`}
          disabled
        >
          {isUp ? "UP" : "DOWN"}
        </button>
        <div className="flex flex-col w-full">
          <p className="w-full font-extrabold text-gray-300 [text-shadow:_0_0px_4px_rgb(0_0_0_/1)] text-lg">
            {text}
          </p>

          <div className="mr-4 flex items-center flex-col sm:flex-row w-full gap-2">
            <div className=" font-extrabold text-gray-300 [text-shadow:_0_0px_4px_rgb(0_0_0_/1)] text-lg">
              {`${formattedDate} ${formattedTime}`}
            </div>
            <div className=" ">
              {bases.map((item) => (
                <span
                  key={item}
                  className={` truncate ${
                    array.find((base: any) => base.name == item)?.class
                  } rounded-full [text-shadow:_0_0px_10px_rgb(0_0_0_/1)] px-2 text-lg sm:text-lg font-bold `}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
