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
  bases: string[];
  text: string;
  isUp: boolean;
  tecnology: string;
  dateDown: any;
  router: any;
  socket: any;
}

export default function InlineOutput({
  index,
  id,
  tecnology,
  text,
  isUp,
  dateDown,
  bases,
  router,
  socket,
}: InlineEditorProps) {
  const [currentBase, setCurrentBase] = useState(bases);
  const [isUpNow, setIsUpNow] = useState(isUp);
  const [currentText, setCurrentText] = useState(text);
  const [currentTime, setCurrentTime] = useState(dateDown);
  const [currentTecnology, setCurrentTecnology] = useState<string | null>(
    tecnology
  );
  useEffect(() => {
    console.log("iniciado");
    socket?.on(
      "attMessage",
      async ({ message, textId }: { message: string; textId: string }) => {
        if (textId == id) {
          setCurrentText(message);
        }
      }
    );

    socket?.on(
      "attStatus",
      async ({ isUp, itemId }: { isUp: boolean; itemId: string }) => {
        if (itemId == id) {
          setIsUpNow(isUp);
        }
      }
    );

    socket?.on(
      "attTecnology",
      async ({ tecnology, itemId }: { tecnology: string; itemId: string }) => {
        if (itemId == id) {
          setCurrentTecnology(tecnology);
        }
      }
    );

    socket?.on(
      "attDate",
      async ({ currentDate, itemId }: { currentDate: any; itemId: string }) => {
        if (itemId == id) {
          setCurrentTime(currentDate);
        }
      }
    );

    socket?.on(
      "attBases",
      async ({
        currentBases,
        itemId,
      }: {
        currentBases: string[];
        itemId: string;
      }) => {
        if (itemId == id) {
          setCurrentBase(currentBases);
        }
      }
    );

    socket?.on("error", (err: any) => {
      console.log("Connection error:", err.message);
    });

    return () => {
      console.log("reiniciado");
      socket.off("attMessage");
      socket.off("attStatus");
      socket.off("attDate");
      socket.off("attBases");
      socket.off("error");
    };
  }, [socket, router]);
  const currentDatetime = new Date(currentTime);
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
        className={`bg-black relative z-0 p-2 backdrop-blur-md flex flex-row w-full transition h-full rounded-md items-center gap-4 bg-opacity-20 ${
          isUpNow ? "bg-green-400" : "bg-red-600"
        }`}
      >
        <button
          className={`text-black rounded-md text-sm sm:text-lg py-2 font-bold min-w-[55px] sm:min-w-[70px] ${
            isUpNow ? "bg-green-400" : "bg-red-600"
          }`}
          disabled
        >
          {isUpNow ? "UP" : "DOWN"}
        </button>
        <div className="flex flex-col w-full">
          <p className="w-full bg-transparent resize-none text-gray-300 sm:text-2xl outline-none text-lg">
            {currentText}
          </p>

          <div className="mr-4 flex items-center flex-col sm:flex-row w-full gap-2">
            <div className=" font-bold text-gray-300 text-lg">
              {`${formattedDate} ${formattedTime}`}
            </div>
            <div className="">
              {currentBase.map((item) => (
                <span
                  key={item}
                  className={` truncate ${
                    array.find((base: any) => base.name == item)?.class
                  } rounded-full px-2 text-lg sm:text-lg font-bold `}
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
