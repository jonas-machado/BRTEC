"use client";

import { links, linksBlank } from "@/constants/links";
import Link from "next/link";

const home = {
  name: "Config",
  link: "/config/manual",
};

const Nav = ({ classname }: { classname: string }) => {
  return (
    <>
      <footer className="relative z-50 h-20 none hidden lg:flex">
        <div className="fixed bottom-6 left-0 z-20 w-full">
          <div className=" absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="flex bg-opacity-70 backdrop-blur-sm items-center rounded-md h-10 bg-black shadow-[0_0px_10px_5px] shadow-black border-gray-950 border-2 p-6">
              <ul className="flex gap-4">
                {links?.map((link) => (
                  <li
                    key={link.name}
                    className="text-gray-300 hover:text-gray-50 whitespace-nowrap flex"
                  >
                    <label htmlFor={link.name} className="cursor-pointer">
                      <link.icon
                        className={`w-6 h-6 pr-1 ${
                          link.name == "Aferir pon" ? "text-red-600" : ""
                        }`}
                      />
                    </label>
                    <Link
                      id={link.name}
                      href={link.link}
                      className={
                        link.name == "Aferir pon" ? "text-red-600" : ""
                      }
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                {linksBlank?.map((link) => (
                  <li
                    key={link.name}
                    className="text-gray-300 hover:text-gray-50 whitespace-nowrap flex"
                  >
                    <label htmlFor={link.name} className="cursor-pointer">
                      <link.icon
                        className={`w-6 h-6 pr-1 ${
                          link.name == "Aferir pon" ? "text-red-600" : ""
                        }`}
                      />
                    </label>
                    <Link
                      id={link.name}
                      href={link.link}
                      target="_blank"
                      className={
                        link.name == "Aferir pon" ? "text-red-600" : ""
                      }
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Nav;
