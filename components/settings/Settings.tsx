"use client";

import React, { useState, useEffect } from "react";
//import io from "socket.io-client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useForm, FieldValues } from "react-hook-form";
import { Sidebar } from "flowbite-react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

//ZOD
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

//Constants
const sidebar = [
  {
    name: "Dashboard",
    icon: PresentationChartBarIcon,
    link: "",
  },
  {
    name: "Users",
    icon: PresentationChartBarIcon,
    link: "",
  },
  {
    name: "Navbar utilities",
    icon: PresentationChartBarIcon,
    link: "",
  },
  {
    name: "ONU/ONT configuration",
    icon: PresentationChartBarIcon,
    link: "",
  },
];

function Settings() {
  const session = useSession();
  const router = useRouter();

  const toastError = (msg: any) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const schema: any = {};

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <ToastContainer />
    </>
  );
}

export default Settings;
