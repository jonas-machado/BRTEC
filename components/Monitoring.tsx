"use client";

import InlineEditor from "./inlineEditor";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SocketContext } from "@/lib/socket";
import MotionDelay from "@/lib/framerMotion/motionDelay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [monitor, setMonitor] = useState<any>(monitoring);
  const router = useRouter();
  const date = new Date();
  const socket = useContext(SocketContext);

  useEffect(() => {
    console.log("iniciado");

    socket?.on("routerRefresh", async () => {
      router.refresh();
      console.log("refreshed");
    });

    socket?.on(
      "attTecnology",
      async ({ tecnology, itemId }: { tecnology: string; itemId: string }) => {
        const updatedMonitoring = monitoring.map((item: any) => {
          if (item.id === itemId) {
            return { ...item, tecnology };
          }
        });
        setMonitor(updatedMonitoring);

        router.refresh();
      }
    );

    socket?.on(
      "attMessage",
      ({ message, id }: { message: string; id: string }) => {
        const updatedMonitoring = monitoring.map((item: any) => {
          console.log(item.id, id);
          if (item.id === id) {
            return { ...item, text: message };
          }
        });

        setMonitor(updatedMonitoring);
      }
    );

    socket?.on("attStatus", (isUp: boolean, itemId: string) => {
      const updatedMonitoring = monitoring.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, isUp };
        }
      });
      setMonitor(updatedMonitoring);
    });

    socket?.on("attDate", (currentDate: any, itemId: string) => {
      const updatedMonitoring = monitoring.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, dateDown: currentDate };
        }
      });
      setMonitor(updatedMonitoring);
    });

    socket?.on("attBases", (currentBases: string[], itemId: string) => {
      const updatedMonitoring = monitoring.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, bases: currentBases };
        }
      });
      setMonitor(updatedMonitoring);
    });

    socket?.on("error", (err: any) => {
      console.log("Connection error:", err.message);
    });

    return () => {
      socket.off("routerRefresh");
      socket.off("attTecnology");
      socket.off("attMessage");
      socket.off("attStatus");
      socket.off("attDate");
      socket.off("attBases");
      socket.off("error");
      console.log("finalizado");
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
      <div className=" flex sm:flex-row flex-col z-30 md:justify-between justify-center gap-2 bg-black bg-opacity-80 backdrop-blur-md rounded-md p-2">
        <div className="flex justify-center">
          <p className="text-gray-300 flex items-center font-bold text-2xl gap-4 ">
            MONITORAMENTO
          </p>
        </div>

        <div className=" flex  gap-2 p-2 justify-center">
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
          <MotionDelay
            key={item.id}
            index={i}
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
              tecnology={item.tecnology}
            />
          </MotionDelay>
        ))}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}
