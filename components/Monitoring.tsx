"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import InlineEditor from "./inlineEditor";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import PageWrapper from "@/lib/framerMotion/pageWrapper";
import { AnimatePresence } from "framer-motion";
import MotionComponent from "@/lib/framerMotion/motionComponent";
import { useRouter } from "next/navigation";
import { SocketContext } from "@/lib/socket";

const basesObj = [
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

export default function Monitoring({ monitoring }: { monitoring: any }) {
  const [monitor, setMonitor] = useState<any>();
  const router = useRouter();
  const date = new Date();
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket?.on("routerRefresh", async () => {
      router.refresh();
    });

    return () => {
      socket.off("routerRefresh");
    };
  }, [socket, router, monitoring]);

  useEffect(() => {
    setMonitor(monitoring);
  }, [monitoring]);

  const add = async () => {
    await axios.post("/api/monitoring/create", {
      isUp: false,
      dateDown: date,
    });
    socket?.emit("refresh");
  };

  const alert = () => {
    socket?.emit("alert", {
      message: "Novo alerta no monitoramento!",
    });
  };
  return (
    <div className="flex w-full justify-center flex-col gap-2">
      <div className=" flex z-40 justify-between gap-2 bg-black bg-opacity-80 backdrop-blur-md rounded-md p-2">
        <p className="text-gray-300 flex items-center font-bold ml-4 text-2xl gap-4">
          MONITORAMENTO
        </p>
        <div className=" flex gap-2 p-2">
          <button
            onClick={alert}
            className="bg-gray-900 rounded-md text-gray-300 p-1 px-2"
          >
            Enviar alerta
          </button>
          <button
            onClick={add}
            className="bg-gray-900 rounded-md text-gray-300 p-1 px-2"
          >
            Adicionar
          </button>
        </div>
      </div>
      <AnimatePresence>
        {monitor?.map((item: any, i: number) => (
          <MotionComponent
            key={item.id}
            style={{
              zIndex: 30 - i,
            }}
          >
            <InlineEditor
              index={i}
              id={item.id}
              date={item.dateDown}
              bases={item.bases}
              text={item.text}
              isUp={item.isUp}
            />
          </MotionComponent>
        ))}
      </AnimatePresence>
    </div>
  );
}
