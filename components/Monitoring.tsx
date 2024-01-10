"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import InlineEditor from "./inlineEditor";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Socket, io } from "socket.io-client";

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
  return (
    <div className="flex w-full justify-center flex-col gap-2">
      <div className="bg-black bg-opacity-80 backdrop-blur-xl rounded-md p-2">
        <button className="bg-gray-900 rounded-md text-gray-300 p-1 px-2">
          Enviar alerta
        </button>
        <button className="bg-gray-900 rounded-md text-gray-300 p-1 px-2">
          Adicionar
        </button>
      </div>
      {monitoring.map((item: any, i: number) => (
        <div
          style={{
            zIndex: 30 - i,
          }}
          key={i}
        >
          <InlineEditor
            id={item.id}
            date={item.dateDown}
            bases={item.bases}
            text={item.text}
            isUp={item.isUp}
          />
        </div>
      ))}
    </div>
  );
}
