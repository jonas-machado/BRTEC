"use client";

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z, ZodType } from "zod";
import { useForm, FieldValues, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputUseForm from "@/components/inputs/inputUseForm";
import useNavbarUtilitiesModal from "@/lib/zustand/useNavbarUtilities";
import { storage } from "@/lib/firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { v4 } from "uuid";
import DropzoneInput from "@/components/inputs/dropzone/Dropzone";

export default function FirmwareForm({ id }: { id?: string }) {
  const IsOpen = useNavbarUtilitiesModal((state) => state.isOpen);
  const OnOpen: () => void = useNavbarUtilitiesModal((state) => state.onOpen);
  const OnClose: () => void = useNavbarUtilitiesModal((state) => state.onClose);

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
      company: z.string({}).nonempty({ message: "Preencha todos os campos" }),
      model: z.string({}).nonempty({ message: "Preencha todos os campos" }),
      version: z.string({}).nonempty({ message: "Preencha todos os campos" }),
      dropZone: z.any(),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });
  const watchAll = watch();
  //use effect para verificar erros nos campos
  useEffect(() => {
    for (let error in errors) {
      notify(errors[error]?.message);
    }
  }, [errors]);
  console.log(watchAll);
  //função on submit que envia os dados para o nextauth e posteriomente para o mongoDB
  const handleClickUpdate = async ({
    company,
    model,
    version,
    dropZone,
  }: FieldValues) => {
    console.log(dropZone[0]);
    const fileRef = ref(storage, `firmware/${v4() + dropZone[0].name}`);

    await uploadBytes(fileRef, dropZone[0]).then(() => {
      console.log("file uploaded");
    });
    const url = await getDownloadURL(fileRef);
    console.log(url);
    return await axios
      .post("/api/firmware/create", {
        company,
        model,
        version,
        link: url,
      })
      .then(async (res: any) => {
        if (res.data.error) {
          setIsLoading(false);
          return notify(res.data.error);
        }
        notifySuc("Atualizado com sucesso");
        router.refresh();
        OnClose();
      });
  };

  return (
    <>
      <motion.div
        key="reg"
        id="container"
        className={` py-1 px-6 w-full h-full pt-8`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0 }}
      >
        <form
          onSubmit={handleSubmit(handleClickUpdate)}
          className="grid gap-2 w-[30rem]"
        >
          <InputUseForm
            id="company"
            label="Empresa"
            name="company"
            register={register}
            error={errors}
            required
          />
          <InputUseForm
            id="model"
            label="Modelo"
            name="model"
            register={register}
            error={errors}
            required
          />
          <InputUseForm
            id="version"
            label="Versão"
            name="version"
            register={register}
            error={errors}
            required
          />
          <DropzoneInput
            id="dropZone"
            name="dropZone"
            error={errors}
            control={control}
            setValue={setValue}
            required
          />
          <button
            className="bg-gray-800 rounded-md px-4 py-2 text-gray-300"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </motion.div>
    </>
  );
}
