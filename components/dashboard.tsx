"use client";

import React, { useState, useEffect, Fragment } from "react";
//import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useForm, FieldValues } from "react-hook-form";

import {
  UserIcon,
  PresentationChartLineIcon,
  QueueListIcon,
  CommandLineIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

//ZOD
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import useRegisterModal from "@/lib/zustand/useRegisterModal";

//Constants
import { sectorArray } from "@/constants/sectorArray";
import { Listbox, Transition } from "@headlessui/react";
import useEditUserModal from "@/lib/zustand/useEditUser";
import axios from "axios";
import MotionComponent from "@/lib/framerMotion/motionComponent";

export default function Users({ users }: any) {
  const session = useSession();
  const router = useRouter();
  console.log(users);

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

  const editIsOpen = useEditUserModal((state) => state.isOpen);
  const editOnOpen: () => void = useEditUserModal((state) => state.onOpen);
  const editOnClose: () => void = useEditUserModal((state) => state.onClose);

  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(["Selecione o setor"]);

  const [deleteLoading, setDeleteLoading] = useState<any>();

  const filtered =
    query === ""
      ? users
      : users.filter((user: any) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const editUser = (user: any) => {
    setSelectedUser(user);
    console.log(selectedUser);
    editOnOpen();
  };
  const deleteUser = async (user: any, index: number) => {
    setDeleteLoading({ state: true, index: index });
    await axios
      .post("/api/user/delete", {
        email: user.email,
      })
      .then(async (res: any) => {
        if (res.data.error) {
          setDeleteLoading(false);
          return notify(res.data.error);
        }
        setDeleteLoading(false);
        notifySuc("Excluido com sucesso");
        router.refresh();
        console.log(res);
      });
  };

  return (
    <>
      <MotionComponent></MotionComponent>
      <ToastContainer />
    </>
  );
}
