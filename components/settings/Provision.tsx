"use client";

import React, { useState, useEffect, Fragment, useRef } from "react";
//import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "../form/RegisterForm";
import Image from "next/image";
import Search from "../inputs/search";
import useRegisterModal from "@/lib/zustand/useRegisterModal";
import Modal from "../modals/Modal";

//Constants

import axios from "axios";
import MotionComponent from "@/lib/framerMotion/motionComponent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import Spinner from "../Spinner";

export default function Provision({ provisioned }: any) {
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

  const isOpen = useRegisterModal((state) => state.isOpen);
  const onOpen: () => void = useRegisterModal((state) => state.onOpen);
  const onClose: () => void = useRegisterModal((state) => state.onClose);

  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? provisioned
      : provisioned.filter((user: any) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const fntest = async ({ pageParam }: any) => {
    return provisioned.slice((pageParam - 1) * 6, pageParam * 6);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["query"],
    queryFn: fntest,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const deleteUser = async (user: any, index: number) => {
    await axios
      .post("/api/user/delete", {
        email: user.email,
      })
      .then(async (res: any) => {
        if (res.data.error) {
        }
        router.refresh();
        console.log(res);
      });
  };
  console.log(provisioned);
  console.log(data);

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);
  return (
    <>
      <MotionComponent id="users" className="w-full">
        <div className="flex flex-col m-2 w-full pt-4 bg-black backdrop-blur-sm shadow-xl shadow-black rounded-md bg-opacity-80">
          <div className="flex m-6 justify-end gap-2">
            <div className=" max-w-xs">
              <Search
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
              />
            </div>
            <button
              className="bg-gray-800 rounded-md p-2 text-gray-300"
              onClick={() => onOpen()}
            >
              Adicionar usuário
            </button>
          </div>
          <ul role="list" className="flex flex-col px-6 gap-2">
            provisioned:
            {data?.pages.map((group: any, i: number) => (
              <React.Fragment key={i}>
                {group.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="flex justify-between gap-x-6 p-5 bg-gray-900 bg-opacity-80 rounded-md"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-300 whitespace-nowrap">
                          {i}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-300 whitespace-nowrap">
                          {item.id}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-300 whitespace-nowrap">
                          {item.serial}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-300">
                          {item.olt}
                        </p>
                        <p className="text-sm leading-6 text-gray-300">
                          {item.pon}
                        </p>
                        <p className="text-sm leading-6 text-gray-300 ">
                          {item.idLivre}
                        </p>
                        <p className="text-sm leading-6 text-gray-300 ">
                          {item.cliente}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-gray-800 text-gray-300 p-2 rounded-md w-full hover:bg-gray-700 transition"
                        onClick={() => deleteUser(item, i)}
                      >
                        Excluir
                      </button>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
          <div className="flex justify-center m-8 " ref={ref}>
            {isFetchingNextPage ? (
              <Spinner />
            ) : hasNextPage ? (
              <Spinner />
            ) : (
              "Nada mais para carregar"
            )}
          </div>
        </div>
      </MotionComponent>
      <Modal
        isOpen={isOpen}
        cancel={() => {
          onClose();
        }}
      >
        <div className="">
          <RegisterForm />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}
