"use client";

import {
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
  TableCellsIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

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
  {
    name: "Wiki",
    link: "http://131.255.132.6:8887/doku.php",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "CNPJ/COND",
    link: "https://docs.google.com/spreadsheets/d/1aiSO7e_fERVePE9VhMXfA4sHHpbLwxpdAr__ei7k0y4/edit#gid=0",
    icon: TableCellsIcon,
  },
];

const Nav = ({ classname }: { classname: string }) => {
  return (
    <>
      <footer className="  h-20">
        <div className="fixed bottom-6 left-0 z-30 w-full">
          <div className=" absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
            <div className="flex bg-opacity-70 backdrop-blur-sm items-center rounded-md h-10 bg-black shadow-[0_0px_10px_5px] shadow-black border-gray-950 border-2 p-6">
              <ul className="flex gap-4">
                {links.map((link) => (
                  <li
                    key={link.name}
                    className="text-gray-300 hover:text-gray-50 whitespace-nowrap flex"
                  >
                    <label htmlFor={link.name} className="cursor-pointer">
                      <link.icon className="w-6 h-6 pr-1" />
                    </label>
                    <Link
                      id={link.name}
                      href={link.link}
                      className={
                        link.name == "Banco de soluções" ? "text-red-600" : ""
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
