"use client";

import TabBody from "@/components/tab/TabBody";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabHeadLink from "@/components/tab/TabHeadLink";

//constants
const tabNames = [
  { name: "Verificar posição livre", link: "/network/verifyOlt" },
  { name: "Aferir CTO", link: "/network/verifyCto" },
  { name: "Diagnosticar ONT", link: "/network/ontDiagnostic" },
  { name: "Diagnosticar Rádio", link: "/network/radioDiagnostic" },
];

export default function NetworkHead() {
  const path = usePathname();

  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };

  return (
    <>
      <div className="relative bg-black backdrop-blur bg-opacity-80 rounded-xl z-0 mb-2">
        <TabBody>
          {tabNames.map((tab) => (
            <TabHeadLink
              key={tab.name}
              id={tab.link}
              href={tab.link}
              state={path}
            >
              {tab.name}
            </TabHeadLink>
          ))}
        </TabBody>
      </div>
    </>
  );
}
