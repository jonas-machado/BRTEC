"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BeatLoader, PulseLoader, PacmanLoader } from "react-spinners";
import InputUseForm from "../inputs/inputUseForm";
import { z, ZodType } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  const notify = (text: any) =>
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const schema: ZodType<FieldValues> = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    for (let error in errors) {
      notify(errors[error]?.message);
    }
  }, [errors]);

  const handleClickLogin = async ({ email, password }: FieldValues) => {
    setIsLoading(true);

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/config/manual",
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.error) {
        return notify(callback.error);
      }
      router.push("/config/manual");
    });
  };

  if (status == "authenticated") {
    router.push("/config/manual");
  }

  if (status == "loading" || isLoading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loading"
          id="container"
          className="flex justify-center items-center bg-black  rounded-full bg-opacity-50 shadow-[0px_0px_40px] shadow-black"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[9rem] h-[9rem] m-12 animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          id="container"
          className="bg-black py-1 px-6 rounded-md bg-opacity-50 shadow-[0px_0px_40px] shadow-black w-[25rem]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          exit={{ opacity: 0 }}
        >
          <h1 className="text-center text-5xl mb-4 text-gray-200">Login</h1>
          <form onSubmit={handleSubmit(handleClickLogin)}>
            <InputUseForm
              id="email"
              label="Email"
              register={register}
              error={errors}
              required
            />
            <InputUseForm
              id="password"
              label="Senha"
              register={register}
              error={errors}
              required
            />
            <button
              className="mt-1 mb-2 transition h-10 rounded-md text-gray-400 bg-black bg-opacity-60 hover:opacity-90 w-full text-center cursor-pointer bg-[rgba(0, 0, 0, 0.455)]"
              type="submit"
            >
              {!isLoading ? (
                <>
                  <span>Enviar</span>
                </>
              ) : (
                <>
                  <PulseLoader color="black" size={8} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </AnimatePresence>

      <ToastContainer />
    </>
  );
}
