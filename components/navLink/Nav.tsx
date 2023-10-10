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
    <footer className="fixed bottom-0 left-0 z-20 w-full bg-black bg-opacity-80 backdrop-blur-lg border-t border-gray-950 shadow">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            J.M.™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
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
        <div className="flex bg-gray-800 items-center rounded-sm h-10 p-4 pl-0 shadow-md shadow-black border-gray-900 border-2">
          <Link
            href={home.link}
            className="flex  rounded-md bg-gray-900 p-2 items-center mr-2 shadow-lg shadow-black"
          >
            <HomeIcon className="w-10 h-10 text-gray-300" />
          </Link>
          <ul className="flex gap-4">
            {links.map((link) => (
              <li key={link.name} className="text-gray-300 hover:text-gray-50">
                <Link href={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </footer>
  );
};

export default Nav;
