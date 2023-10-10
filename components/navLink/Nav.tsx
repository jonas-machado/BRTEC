"use client";

import React, { useState, useRef, Fragment, Children } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  PaperClipIcon,
  Bars3Icon,
  HomeIcon,
  ChevronDoubleUpIcon,
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
  },
  {
    name: "Aferir pon",
    link: "/ponVerification",
  },
  {
    name: "Banco de soluções",
    link: "/solutionBank",
  },
];

const Nav = ({ classname }: { classname: string }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [showNav, setShowNav] = useState(false);
  return (
    <div
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full h-28"
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setShowNav(false)}
    >
      <div className="flex justify-center h-full items-center">
        <Transition
          show={!isShowing}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-6"
          afterLeave={() => setShowNav(true)}
        >
          <ChevronDoubleUpIcon className="h-14 w-14 text-gray-950" />
        </Transition>
        <Transition
          show={showNav}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-6"
          afterLeave={() => setIsShowing(false)}
        >
          <div className="flex bg-gray-800 items-center rounded-sm h-10 p-4 pl-0 shadow-md shadow-black border-gray-900 border-2">
            <Link
              href={home.link}
              className="flex  rounded-md bg-gray-900 p-2 items-center mr-2 shadow-lg shadow-black"
            >
              <HomeIcon className="w-10 h-10 text-gray-300" />
            </Link>
            <ul className="flex gap-4">
              {links.map((link) => (
                <li
                  key={link.name}
                  className="text-gray-300 hover:text-gray-50"
                >
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Nav;
