"use client";
import Navbar from "@/components/navbar/Navbar";
//import getCurrentUser from "@/actions/getCurrentUser";
import PageWrapper from "@/lib/pageWrapper";
import NextTopLoader from "nextjs-toploader";
import { getNeutralNetwork } from "@/lib/actions/getNeutralNetwork";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { getFirmware } from "@/lib/actions/getFirmware";

import getUsers from "@/lib/actions/getUsers";
import NavbarUtilities from "@/components/settings/navbarUtilities/NavbarUtilities";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "@/components/inputs/search";

export default function Maps() {
  const session = useSession();
  const router = useRouter();

  const [query, setQuery] = useState("");

  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
  const notifySuc = (text: string) => {
    toast.success(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  //   const filtered =
  //     query === ""
  //       ? users
  //       : users.filter((user: any) =>
  //           user.name
  //             .toLowerCase()
  //             .replace(/\s+/g, "")
  //             .includes(query.toLowerCase().replace(/\s+/g, ""))
  //         );

  return (
    <div className="flex flex-col m-2 bg-black backdrop-blur-sm shadow-xl shadow-black rounded-md bg-opacity-80">
      <div className="flex m-6 justify-end gap-2">
        <div className=" max-w-xs">
          <Search
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
          />
        </div>
        <button className="bg-gray-800 rounded-md p-2 text-gray-300">
          Adicionar usuário
        </button>
      </div>
    </div>
  );
}
