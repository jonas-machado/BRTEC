"use client";

import React, { useState, useRef, Fragment, Children } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, HomeIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

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
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <div className={classname}>
      <Link
        href={home.link}
        className="flex rounded-full bg-gray-900 p-2 items-center mr-2 shadow-lg shadow-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="35"
          height="35"
          viewBox="0,10,256,256"
        >
          <g
            fill="#ffffff"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            //style="mix-blend-mode: normal"
          >
            <g transform="translate(-10,-21.07422) scale(2,2)">
              <path d="M70,18.07422c-0.775,0 -1.54961,0.27617 -2.09961,0.82617l-53.80078,53.69922c-1.2,1.2 -1.2,3.10117 0,4.20117l8.5,8.5c0.6,0.6 1.29961,0.89844 2.09961,0.89844c0.8,0 1.60156,-0.29844 2.10156,-0.89844l43.19922,-43.10156l32,32v40.30078c-2.9,1 -5.10078,3.5 -5.80078,6.5h-12.19922v-41c0,-1.7 -1.3,-3 -3,-3h-22c-1.7,0 -3,1.3 -3,3v41h-18v-27c0,-1.7 -1.3,-3 -3,-3c-1.7,0 -3,1.3 -3,3v7.40039c-4.9,1.2 -8.69922,5.00039 -9.69922,9.90039c-4.9,1 -8.80039,4.89922 -9.90039,9.69922h-8.40039c-1.7,0 -3,1.3 -3,3c0,1.7 1.3,3 3,3h95c1.7,0 3,-1.3 3,-3v-1c0,-1.7 1.3,-3 3,-3c1.7,0 3,1.3 3,3v1c0,1.7 1.3,3 3,3h3c1.7,0 3,-1.3 3,-3c0,-1.7 -1.3,-3 -3,-3h-0.19922c-0.7,-3 -2.90078,-5.5 -5.80078,-6.5v-34.30078l5.09961,5.10156c0.6,0.6 1.29961,0.89844 2.09961,0.89844c0.8,0 1.60156,-0.29844 2.10156,-0.89844l8.5,-8.5c1.2,-1.2 1.2,-3.10117 0,-4.20117l-53.70117,-53.69922c-0.55,-0.55 -1.32461,-0.82617 -2.09961,-0.82617zM70,25.30078l49.5,49.5l-4.19922,4.19922l-43.20117,-43.09961c-0.6,-0.6 -1.29961,-0.90039 -2.09961,-0.90039c-0.8,0 -1.49961,0.30039 -2.09961,0.90039l-43.20117,43.09961l-4.19922,-4.19922zM64,101c1.7,0 3,1.3 3,3c0,1.7 -1.3,3 -3,3c-1.7,0 -3,-1.3 -3,-3c0,-1.7 1.3,-3 3,-3zM32,107.69922v13.30078h-13.30078c1.1,-2.4 3.50078,-4 6.30078,-4c1.7,0 3,-1.3 3,-3c0,-2.8 1.6,-5.20078 4,-6.30078zM124,121c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z"></path>
            </g>
          </g>
        </svg>
      </Link>
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.name} className="text-gray-300 hover:text-gray-50">
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;