"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import InlineEditor from "@/components/inlineEditor";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import PageWrapper from "@/lib/framerMotion/pageWrapper";
import { AnimatePresence } from "framer-motion";
import MotionComponent from "@/lib/framerMotion/motionComponent";
import { useRouter } from "next/navigation";
import { SocketContext } from "@/lib/socket";
import MotionDelay from "@/lib/framerMotion/motionDelay";
import Image from "next/image";
import InlineOutput from "./inlineOutput";

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

export default function MonitoringOutput({ monitoring }: { monitoring: any }) {
  const [monitor, setMonitor] = useState<any>();
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
        router.refresh();
        console.log("refreshed");
      }
    );

    socket?.on("attMessage", (message: string, textId: string) => {
      console.log("working");
      if (monitoring) {
        const updatedMonitoring = monitoring.map((item: any) => {
          if (item.id === textId) {
            return { ...item, text: message };
          }
          return item;
        });
        setMonitor(updatedMonitoring);
      }
    });

    socket?.on("attStatus", (isUp: boolean, itemId: string) => {
      if (monitoring) {
        const updatedMonitoring = monitoring.map((item: any) => {
          if (item.id === itemId) {
            return { ...item, isUp };
          }
          return item;
        });
        setMonitor(updatedMonitoring);
      }
    });

    socket?.on("attDate", (currentDate: any, itemId: string) => {
      if (monitoring) {
        const updatedMonitoring = monitoring.map((item: any) => {
          if (item.id === itemId) {
            return { ...item, dateDown: currentDate };
          }
          return item;
        });
        setMonitor(updatedMonitoring);
      }
    });

    socket?.on("attBases", (currentBases: string[], itemId: string) => {
      if (monitoring) {
        const updatedMonitoring = monitoring.map((item: any) => {
          if (item.id === itemId) {
            return { ...item, bases: currentBases };
          }
          return item;
        });
        setMonitor(updatedMonitoring);
      }
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
  }, [socket, router]);

  useEffect(() => {
    setMonitor(monitoring);
  }, [monitoring]);

  return (
    <>
      <Image
        src={`/images/deskBurn.gif`}
        alt="bg"
        fill
        className="-z-50 bg-no-repeat"
        blurDataURL={`/images/deskBurn.gif`}
      />
      <div className="flex flex-col w-full gap-2">
        <div className=" flex sm:flex-row flex-col z-40 md:justify-between justify-center gap-2 bg-black bg-opacity-60 backdrop-blur-md rounded-md p-2 px-4 mt-12">
          <div className="flex justify-center">
            <p className="text-gray-300 flex items-center font-bold text-2xl gap-4 ">
              FIBRA
            </p>
          </div>
        </div>
        <AnimatePresence>
          {monitor?.map(
            (item: any, i: number) =>
              item.tecnology == "FIBRA" && (
                <MotionDelay
                  key={item.id}
                  index={i}
                  style={{
                    zIndex: 30 - i,
                  }}
                >
                  <InlineOutput
                    socket={socket}
                    router={router}
                    index={i}
                    id={item.id}
                    dateDown={item.dateDown}
                    bases={item.bases}
                    text={item.text}
                    isUp={item.isUp}
                    tecnology={item.tecnology}
                  />
                </MotionDelay>
              )
          )}
        </AnimatePresence>

        <div className=" flex sm:flex-row flex-col z-40 md:justify-between justify-center gap-2 bg-black bg-opacity-60 backdrop-blur-md rounded-md p-2 px-4">
          <div className="flex justify-center">
            <p className="text-gray-300 flex items-center font-bold text-2xl gap-4 ">
              RÁDIO
            </p>
          </div>
        </div>
        <AnimatePresence>
          {monitor?.map(
            (item: any, i: number) =>
              item.tecnology == "RÁDIO" && (
                <MotionDelay
                  key={item.id}
                  index={i}
                  style={{
                    zIndex: 30 - i,
                  }}
                >
                  <InlineOutput
                    socket={socket}
                    router={router}
                    index={i}
                    id={item.id}
                    dateDown={item.dateDown}
                    bases={item.bases}
                    text={item.text}
                    isUp={item.isUp}
                    tecnology={item.tecnology}
                  />
                </MotionDelay>
              )
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
