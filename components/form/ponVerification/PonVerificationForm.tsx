"use client";

import { useState, useEffect, useContext } from "react";
import TabBody from "@/components/tab/TabBody";
import TabHead from "@/components/tab/TabHead";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyPon from "./VerifyZTE";
import VerifyCTO from "./VerifyCTO";
import { SocketContext } from "@/lib/socket";
import TabHeadLink from "@/components/tab/TabHeadLink";

//constants
const tabNames = [
  { name: "Verificar posição livre", link: "/ponVerification/verifyOlt" },
  { name: "Aferir CTO", link: "/ponVerification/verifyCto" },
  { name: "Diagnosticar ONT", link: "/ponVerification/ontDiagnostic" },
  { name: "Diagnosticar Rádio", link: "/ponVerification/radioDiagnostic" },
];

interface ConfigProps {
  olt: any;
}

const PonVerificationForm = ({ olt }: ConfigProps) => {
  const [openTab, setOpenTab] = useState("Verificar posição livre");

  const socket = useContext(SocketContext);
  const session = useSession();
  const router = useRouter();
  const path = usePathname();
  console.log(path);
  useEffect(() => {
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

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
};

export default PonVerificationForm;
