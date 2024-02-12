"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { HiMenuAlt3 } from "react-icons/hi";

import {
  UserIcon,
  PresentationChartLineIcon,
  QueueListIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

//Constants
import { navbarUtilitiesTabs } from "@/constants/navbarUtilitiesTab";
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
    link: navbarUtilitiesTabs[0].link,
    margin: false,
  },
  {
    name: "ONU/ONT configuration",
    icon: CommandLineIcon,
    link: "/settings/provision",
    margin: false,
  },
];

export default function Sidebar({ currentUser }: any) {
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
      <section className="flex gap-6 z-30">
        <div
          className={`bg-black opacity-80 backdrop-blur-md min-h-screen ${
            open ? "w-[4.3rem] lg:w-60" : "lg:w-[4.3rem] w-60 "
          }  duration-500 text-gray-100 px-4`}
        >
          <div className={`flex justify-between mt-4`}>
            <div
              className={`flex gap-2 py-3 duration-500 ${
                !open ? "lg:translate-y-8" : "translate-y-8 lg:translate-y-0"
              } h-full`}
            >
              <Image
                className="h-8 w-8 rounded-lg bg-cover bg-gray-800"
                src={
                  currentUser?.user.image
                    ? currentUser?.user.image!
                    : `/images/defaultUser.png`
                }
                height={30}
                width={30}
                alt="user picture"
                blurDataURL={
                  currentUser?.user.image
                    ? currentUser?.user.image!
                    : `/images/defaultUser.png`
                }
              />
              <p
                style={{
                  transitionDelay: `200ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open
                    ? "lg:opacity-0 lg:translate-x-28 lg:overflow-hidden "
                    : "opacity-0 translate-x-28 overflow-hidden lg:translate-x-0 lg:opacity-100"
                } flex items-center`}
              >
                {currentUser?.user.name.split(" ")[0]}
              </p>
            </div>
            <div
              style={{
                transitionDelay: `200ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open
                  ? " lg:-translate-x-11 lg:-translate-y-3 lg:flex lg:items-center"
                  : " -translate-x-11 -translate-y-3 flex items-center lg:-translate-x-0 lg:-translate-y-0"
              } py-3 flex justify-end`}
            >
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>

          <div
            className={`mt-4 flex flex-col gap-4 relative duration-500 ${
              !open ? "lg:translate-y-6" : "translate-y-6 lg:translate-y-0"
            }`}
          >
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
                    !open
                      ? "lg:opacity-0 lg:translate-x-28 lg:overflow-hidden"
                      : "opacity-0 translate-x-28 overflow-hidden lg:opacity-100 lg:translate-x-0"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open ? "hidden" : "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
