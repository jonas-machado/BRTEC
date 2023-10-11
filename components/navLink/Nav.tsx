"use client";

import React, { useState, useRef, Fragment, Children, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  PaperClipIcon,
  Bars3Icon,
  HomeIcon,
  ChevronDoubleUpIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { motion, useDragControls } from "framer-motion";
import Image from "next/image";

const home = {
  name: "Config",
  link: "/config/manual",
};

const links = [
  {
    name: "Scripts",
    link: "/script",
    icon: DocumentTextIcon,
  },
  {
    name: "Aferir pon",
    link: "/ponVerification",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "Banco de soluções",
    link: "/solutionBank",
    icon: LightBulbIcon,
  },
];

const Nav = ({ classname }: { classname: string }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const [time, setTime] = useState("");

  const date = new Date();
  console.log(date);

  function updateTime(k: any) {
    if (k < 10) {
      return "0" + k;
    } else {
      return k;
    }
  }

  function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    var y = date.getFullYear();
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Domingo";
    weekday[1] = "Segunda-feira";
    weekday[2] = "Terça-feira";
    weekday[3] = "Quarta-feira";
    weekday[4] = "Quinta-feira";
    weekday[5] = "Sexta-feira";
    weekday[6] = "Sábado";
    var n = weekday[d.getDay()];
    setTime(
      hour + " : " + min + " " + n + " " + y
    ); /* adding time to the div */
    var t = setTimeout(function () {
      currentTime();
    }, 1000); /* setting timer */
  }

  useEffect(() => {
    currentTime();
  }, []);
  console.log(time);
  return (
    <>
      <footer className="shadow-[0_0px_10px_5px] shadow-black border-gray-950 border-t fixed bottom-0 left-0 z-20 w-full bg-black bg-opacity-80 backdrop-blur-lg ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              JM™
            </a>
            . All Rights Reserved.
          </span>
          <div>
            <p className="text-gray-300">{time}</p>
          </div>
        </div>
        <Transition
          show={!isShowing}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-6"
          afterLeave={() => setShowNav(true)}
          onMouseEnter={() => setIsShowing(true)}
          className={`absolute bottom-2 left-1/2 -translate-x-1/2`}
        >
          <ChevronDoubleUpIcon className="h-10 w-10 text-gray-400" />
        </Transition>
      </footer>
      <Transition
        show={showNav}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-6"
        afterLeave={() => setIsShowing(false)}
        onMouseLeave={() => setShowNav(false)}
        className={`absolute bottom-20 left-1/2 -translate-x-1/2`}
      >
        <div className="flex bg-black bg-opacity-70 backdrop-blur-sm items-center rounded-md h-10 p-4 pl-0 shadow-black border-gray-900 border-2 shadow-[0_0px_10px]">
          <Link
            href={home.link}
            className="flex  rounded-md bg-gray-900 p-2 items-center mr-4 shadow-lg shadow-black"
          >
            <HomeIcon className="w-12 h-12 text-gray-300" />
          </Link>
          <ul className="flex gap-4">
            {links.map((link) => (
              <li
                key={link.name}
                className="text-gray-300 hover:text-gray-50 flex"
              >
                <label htmlFor={link.name} className="cursor-pointer">
                  <link.icon className="w-6 h-6 pr-1" />
                </label>
                <Link id={link.name} href={link.link}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </>
  );
};

export default Nav;
