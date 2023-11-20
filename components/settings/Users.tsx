"use client";

import React, { useState, useEffect } from "react";
//import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
import RegisterForm from "../form/RegisterForm";
import Image from "next/image";

//Constants
const sidebar = [
  {
    name: "Dashboard",
    icon: PresentationChartLineIcon,
    link: "",
    margin: false,
  },
  {
    name: "Users",
    icon: UserIcon,
    link: "",
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

export default function Users({ users }: any) {
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

  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <RegisterForm />
        <ul role="list" className="divide-y divide-gray-100 w-11/12">
          {users.map((person: any) => (
            <li
              key={person.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <Image
                  width={50}
                  height={40}
                  className="rounded-full bg-gray-800"
                  src={person?.image ? person.image : "/images/defaultUser.png"}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-300">
                    {person.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-300">
                    {person.email}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-300">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </>
  );
}
