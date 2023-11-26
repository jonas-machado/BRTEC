"use client";
import Navbar from "@/components/navbar/Navbar";
//import getCurrentUser from "@/actions/getCurrentUser";
import PageWrapper from "@/lib/pageWrapper";
import NextTopLoader from "nextjs-toploader";
import { getNeutralNetwork } from "@/lib/actions/getNeutralNetwork";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { getFirmware } from "@/lib/actions/getFirmware";

import getUsers from "@/lib/actions/getUsers";
import NavbarUtilities from "@/components/settings/navbarUtilities/NavbarUtilities";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "@/components/inputs/search";
import {
  ArrowDownTrayIcon,
  MapIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

export default function Firmware({ firmware }: any) {
  const session = useSession();
  const router = useRouter();
  console.log(firmware);
  const [query, setQuery] = useState("");

  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
  const notifySuc = (text: string) => {
    toast.success(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const filtered =
    query === ""
      ? firmware
      : firmware.filter((user: any) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex flex-col m-2 bg-black backdrop-blur-sm shadow-xl shadow-black rounded-md bg-opacity-80">
      <div className="flex m-6 justify-end gap-2">
        <div className=" max-w-xs">
          <Search
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
          />
        </div>
        <button className="bg-gray-800 rounded-md p-2 text-gray-300">
          Adicionar usuário
        </button>
      </div>
      <ul role="list" className="flex flex-col px-6 gap-2">
        {filtered.map((item: any, i: number) => (
          <li
            key={i}
            className="flex justify-between gap-x-6 p-5 bg-gray-900 bg-opacity-80 rounded-md"
          >
            <div className="flex min-w-0 gap-x-4">
              <ArrowDownTrayIcon className=" w-auto h-[6rem] text-gray-300" />
              <div className="min-w-0 flex-auto">
                <p className="text-base font-medium text-white whitespace-nowrap">
                  {item.company + " " + item.model + " " + item.version}
                </p>
                <p className="text-sm leading-6 text-gray-300 ">{item.link}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="hidden shrink-0 sm:flex flex-col items-center  "></div>
              <div className="hidden shrink-0 sm:flex flex-col items-center gap-2 w-20">
                <button className="bg-gray-800 text-gray-300 p-2 rounded-md w-full">
                  Editar
                </button>
                <button className="bg-gray-800 text-gray-300 p-2 rounded-md w-full">
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
