"use client";

import React, { useState, useEffect } from "react";
//import io from "socket.io-client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { HiMenuAlt3 } from "react-icons/hi";

import { useForm, FieldValues } from "react-hook-form";

import {
  UserIcon,
  PresentationChartLineIcon,
  QueueListIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

//ZOD
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

//Constants
const sidebar = [
  {
    name: "Dashboard",
    icon: PresentationChartLineIcon,
    link: "/settings/dashboard",
    margin: false,
  },
  {
    name: "Users",
    icon: UserIcon,
    link: "/settings/users",
    margin: false,
  },
  {
    name: "Navbar utilities",
    icon: QueueListIcon,
    link: "",
    margin: false,
  },
  {
    name: "ONU/ONT configuration",
    icon: CommandLineIcon,
    link: "",
    margin: false,
  },
];

export default function Sidebar() {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const toastError = (msg: any) => {
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
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const schema: any = {};

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <section className="flex gap-6">
        <div
          className={`bg-black opacity-80 backdrop-blur-md min-h-screen ${
            open ? "w-60" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {sidebar?.map((menu, i) => (
              <Link
                href={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>
                  {React.createElement(menu?.icon, { className: "w-5 h-5" })}
                </div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
