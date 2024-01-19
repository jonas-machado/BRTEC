"use client";

import { useState, useEffect, useContext } from "react";
import TabBody from "@/components/tab/TabBody";
import TabHead from "@/components/tab/TabHead";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyPon from "./VerifyZTE";
import VerifyCTO from "./VerifyCTO";
import { SocketContext } from "@/lib/socket";

//constants
const tabNames = [
  "Verificar posição livre",
  "Aferir CTO",
  "Diagnosticar ONT",
  "Diagnosticar Rádio",
];

interface ConfigProps {
  olt: any;
}

const PonVerificationForm = ({ olt }: ConfigProps) => {
  const [openTab, setOpenTab] = useState("Verificar posição livre");

  const socket = useContext(SocketContext);
  const session = useSession();
  const router = useRouter();

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
      <div className="container relative bg-black backdrop-blur bg-opacity-80 w-11/12 mx-auto rounded-xl z-0">
        <TabBody>
          {tabNames.map((tab) => (
            <TabHead
              key={tab}
              state={openTab}
              id={tab}
              onClick={() => setOpenTab(tab)}
            >
              {tab}
            </TabHead>
          ))}
        </TabBody>
      </div>
    </>
  );
};

export default PonVerificationForm;
