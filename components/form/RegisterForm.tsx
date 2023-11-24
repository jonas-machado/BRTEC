"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { BeatLoader, PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z, ZodType } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputUseForm from "../inputs/inputUseForm";
import ControlledInputArray from "../inputs/controlledInputArray";
import { sectorArray } from "@/constants/sectorArray";
import useRegisterModal from "@/lib/zustand/useRegisterModal";

export default function RegisterForm({ isVisible }: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //função para notificações
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

  //schema do zod
  const schema = z
    .object({
      email: z
        .string()
        .email({ message: "Email inválido" })
        .nonempty({ message: "Preencha todos os campos" }),
      password: z.string({}).nonempty({ message: "Preencha todos os campos" }),
      confirmPassword: z
        .string({})
        .nonempty({ message: "Preencha todos os campos" }),
      name: z.string({}).nonempty({ message: "Preencha todos os campos" }),
      sector: z.string({}).nonempty({ message: "Preencha todos os campos" }),
    })
    .required()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Senhas diferentes",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  //use effect para verificar erros nos campos
  useEffect(() => {
    for (let error in errors) {
      notify(errors[error]?.message);
    }
  }, [errors]);

  //função on submit que envia os dados para o nextauth e posteriomente para o mongoDB
  const handleClickRegister = async ({
    email,
    password,
    confirmPassword,
    name,
    sector,
  }: FieldValues) => {
    setIsLoading(true);
    const isOpen = useRegisterModal((state) => state.isOpen);
    const onOpen: () => void = useRegisterModal((state) => state.onOpen);
    const onClose: () => void = useRegisterModal((state) => state.onClose);
    await axios
      .post("/api/register", {
        email,
        password,
        name,
        sector,
      })
      .then(async (res: any) => {
        if (res.data.error) {
          setIsLoading(false);
          return notify(res.data.error);
        }
        onClose();
        router.refresh();
        return notifySuc("Usuário incluido com sucesso.");
      });
  };

  return (
    <>
      <motion.div
        key="reg"
        id="container"
        className={` py-1 px-6 mt-8`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-gray-300 text-2xl mb-4">Register</h1>
        <form
          className={`col space-y-2`}
          onSubmit={handleSubmit(handleClickRegister)}
        >
          <div className="col-span-3 sm:col-span-2 ">
            <InputUseForm
              id="email"
              label="Email"
              register={register}
              error={errors}
              required
            />
          </div>
          <div className="col-span-3 sm:col-span-2">
            <InputUseForm
              id="name"
              label="Nome completo"
              register={register}
              error={errors}
              required
            />
          </div>
          <div className="">
            <ControlledInputArray
              control={control}
              name="sector"
              array={sectorArray}
              direction="row"
            />
          </div>
          <div className="col-span-3 sm:col-span-2">
            <InputUseForm
              id="password"
              label="Senha"
              register={register}
              error={errors}
              required
            />
          </div>
          <div className="col-span-3 sm:col-span-2">
            <InputUseForm
              id="confirmPassword"
              label="Confirmar Senha"
              register={register}
              error={errors}
              required
            />
          </div>

          <div className="w-full shadow-sm flex justify-end">
            <button
              className="transition mt-8 h-10 rounded-md text-gray-400 bg-gray-800 bg-opacity-60 hover:opacity-90 px-4 text-center cursor-pointer bg-[rgba(0, 0, 0, 0.455)]"
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
          </div>
        </form>
      </motion.div>
    </>
  );
}
