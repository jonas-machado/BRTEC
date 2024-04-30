"use client";
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
import axios from "axios";
import { SocketContext } from "@/lib/socket";
import { useRouter } from "next/navigation";
import Select from "./inputs/Select";
import { toast } from "react-toastify";

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
const arrayTecnology = ["FIBRA", "RÁDIO"];

interface InlineEditorProps {
  index: number;
  id: string;
  date: Date;
  bases: string[];
  text: string;
  isUp: boolean;
  tecnology: string;
}

export default function InlineEditor({
  index,
  id,
  date,
  bases,
  text,
  isUp,
  tecnology,
}: InlineEditorProps) {
  const socket = useContext(SocketContext);
  const router = useRouter();
  const [currentBase, setCurrentBase] = useState(bases);
  const [isUpNow, setIsUpNow] = useState(isUp);
  const [currentText, setCurrentText] = useState(text);
  const [currentTime, setCurrentTime] = useState(date);
  const [currentTecnology, setCurrentTecnology] = useState<string | null>(
    tecnology
  );

  const toastError = (msg: any) => {
    console.log("called: " + msg);
    return toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    setCurrentBase(bases);
    setIsUpNow(isUp);
    setCurrentText(text);
    setCurrentTime(date);
    setCurrentTecnology(tecnology);
  }, [id, date, bases, text, isUp, tecnology]);
  console.log(id);
  const message = (value: string) => {
    setCurrentText(value);
    socket?.emit("message", { message: value, id });
  };

  const statusFn = (value: boolean) => {
    setIsUpNow(value);
    socket?.emit("status", { isUp: value, id });
  };

  const dateDownFn = (value: any) => {
    setCurrentTime(value);
    socket?.emit("date", { currentDate: value, id });
  };

  const basesFn = (value: any) => {
    socket?.emit("bases", { currentBases: value, id });
  };

  const tecnologyFn = (value: any) => {
    socket?.emit("tecnology", { tecnology: value, id });
  };

  const deleteItem = async () => {
    await axios
      .post("/api/monitoring/delete", { id })
      .then((res) => {
        if (res.data.error) {
          toastError(res.data.error);
        }
      })
      .catch((err) => console.log(err));
    socket?.emit("refresh");
  };

  return (
    <>
      <div
        className={`bg-black relative z-0 p-2 backdrop-blur-md flex flex-row w-full transition h-full rounded-md items-center gap-4 bg-opacity-20 ${
          isUpNow ? "bg-green-400" : "bg-red-600"
        }`}
      >
        <button
          onClick={() => {
            setIsUpNow(!isUpNow);
            statusFn(!isUpNow);
          }}
          className={`text-black rounded-md text-sm sm:text-lg py-2 font-bold min-w-[55px] sm:min-w-[70px] ${
            isUpNow ? "bg-green-400" : "bg-red-600"
          }`}
        >
          {isUpNow ? "UP" : "DOWN"}
        </button>
        <div className="flex gap-2 flex-col w-full">
          <TextareaAutosize
            onChange={(e) => message(e.target.value)}
            className="w-full bg-transparent resize-none text-gray-300 sm:text-2xl outline-none text-lg"
            value={currentText ?? "Escreva aqui"}
          />

          <div className="mr-4 flex items-center flex-col sm:flex-row w-full">
            <div className="">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  onChange={(e) => dateDownFn(e?.toDate())}
                  className=""
                  ampm={false}
                  value={dayjs(currentTime)}
                  defaultValue={dayjs()}
                  format="DD/MM/YY HH:mm"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="relative shadow-[0px_0px_4px_0_rgb(147_51_234/1)] shadow-black z-0 min-w-[130px] rounded-lg transition">
              <Listbox
                value={currentBase}
                onChange={(e) => {
                  setCurrentBase(e);
                  basesFn(e);
                }}
                multiple
              >
                <div className="relative h-full items-center w-full">
                  <Listbox.Button className="relative flex items-center w-full h-9 cursor-pointer rounded-lg bg-transparent transition pr-10 text-left">
                    {currentBase.map((item: any) => (
                      <span
                        key={item}
                        className={` truncate ${
                          array.find((base: any) => base.name == item)?.class
                        } rounded-full px-2 text-sm sm:text-lg font-bold `}
                      >
                        {item}
                      </span>
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 border-2 border-black bg-opacity-70 backdrop-blur-sm py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {array.map((item: any, itemIdx: number) => (
                        <Listbox.Option
                          key={itemIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 px-2 ${
                              active ? "bg-gray-800" : "text-gray-900"
                            }`
                          }
                          value={item.name}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate px-2 rounded-md text-sm sm:text-lg ${
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
            <div className="w-full h-full ml-2">
              <Select
                options={arrayTecnology}
                placeHolder="Selecione"
                id="tecnology"
                selectedItem={currentTecnology}
                setSelectedItem={setCurrentTecnology}
                onChange={tecnologyFn}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <button onClick={deleteItem}>
            <XMarkIcon className="w-10 h-10 font-bold absolute top-0 right-0 sm:relative" />
          </button>
        </div>
      </div>
    </>
  );
}
