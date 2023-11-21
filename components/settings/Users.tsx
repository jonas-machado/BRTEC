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

export default function Users({ users }: any) {
  const session = useSession();
  const router = useRouter();

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
      <div className="flex flex-col m-2 w-full pt-4 bg-black backdrop-blur-sm shadow-xl shadow-black rounded-md bg-opacity-80">
        <RegisterForm />
        <ul role="list" className="divide-y divide-gray-100 px-6">
          {users.map((person: any) => (
            <li
              key={person.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <Image
                  width={50}
                  height={40}
                  className="rounded-full w-auto h-[6rem] bg-gray-800"
                  src={person?.image ? person.image : "/images/defaultUser.png"}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-300 whitespace-nowrap">
                    {person.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-300">
                    {person.email}
                  </p>
                  <p className="text-sm leading-6 text-gray-300">
                    {person.role}
                  </p>
                  <p className="text-sm leading-6 text-gray-300 ">
                    {person.sector}
                  </p>
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
      <ToastContainer />
    </>
  );
}
