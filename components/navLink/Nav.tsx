"use client";

import React, { useState, useRef, Fragment, Children } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PaperClipIcon, Bars3Icon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { motion, useDragControls } from "framer-motion";

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
  const controls = useDragControls();

  return (
    <motion.div className="fixed bottom-18 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        drag
        dragConstraints={{
          top: -570,
          bottom: 0,
          left: -360,
          right: 360,
        }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.5}
        whileTap={{ cursor: "grabbing" }}
        dragControls={controls}
        dragListener={false}
        className="flex items-center shadow-2xl shadow-black z-50"
      >
        <div
          className={`flex bg-gray-800 items-center rounded-sm h-10 p-4 pl-0 shadow-md shadow-black border-gray-900 border-2`}
        >
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
        <div
          onPointerDown={(e) => {
            controls.start(e);
          }}
          className="p-2 rounded-md bg-gray-800 border-2 border-gray-900 shadow-black shadow-md z-0 cursor-pointer"
        >
          <Bars3Icon title="drag" titleId="drag" className="h-6 w-6 " />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Nav;
