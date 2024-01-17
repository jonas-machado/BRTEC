"use client";

import React, { useState, useEffect, Fragment } from "react";
//import io from "socket.io-client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TabBody from "../../tab/TabBody";
import TabHeadLink from "../../tab/TabHeadLink";
import { navbarUtilitiesTabs } from "@/constants/navbarUtilitiesTab";

export default function NavbarUtilities() {
  const path = usePathname();
  const session = useSession();
  const router = useRouter();

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

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(navbarUtilitiesTabs[0].name);
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
    <>
      <div className="flex flex-col m-2 bg-black backdrop-blur-sm shadow-xl shadow-black rounded-md bg-opacity-80">
        <TabBody>
          {navbarUtilitiesTabs.map((tab, i) => (
            <TabHeadLink
              key={i}
              id={tab.link}
              href={tab.link}
              state={path}
              onClick={() => setCurrentPage(tab.name)}
            >
              {tab.name}
            </TabHeadLink>
          ))}
        </TabBody>
      </div>

      <ToastContainer />
    </>
  );
}
