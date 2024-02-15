"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { Session } from "next-auth";
import Image from "next/image";
import usePerfilModal from "@/lib/zustand/usePerfilModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputFormLabeled from "../inputs/inputFormLabeled";
import axios from "axios";
import { storage } from "@/lib/firebase";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

function Perfil({ currentUser }: { currentUser?: Session | null }) {
  const perfilModal = usePerfilModal();
  const router = useRouter();
  const [avatarLoading, setAvatarLoading] = useState<boolean>(false);
  const [bgLoading, setBgLoading] = useState<boolean>(false);

  const { data: session, update } = useSession();

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
    })
    .required()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Senhas diferentes",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const uploadAvatar = async (image: any) => {
    setAvatarLoading(true);
    if (currentUser?.user.image) {
      const avatarRef = ref(storage, currentUser.user.image);
      deleteObject(avatarRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const imageRefAvatar = refStorage(
      storage,
      `${currentUser?.user.email}/image/${image?.name + v4()}`
    );
    if (image) {
      const uploadAvatar = await uploadBytes(imageRefAvatar, image).then(() => {
        console.log("image uploaded");
      });
    }
    const urlAvatar: any = await getDownloadURL(imageRefAvatar).catch((err) =>
      console.log(err)
    );

    await axios
      .post("/api/profile/avatar", {
        image: urlAvatar,
      })
      .catch((err) => {
        console.log(err);
      });

    const newSession = {
      user: {
        image: urlAvatar
          ? urlAvatar
          : currentUser?.user.image
          ? currentUser?.user.image
          : null,
      },
    };
    await update(newSession);
    router.refresh();
    setAvatarLoading(false);
  };

  const uploadBackground = async (image: any) => {
    setBgLoading(true);

    if (currentUser?.user.backgroundImage) {
      const bgRef = ref(storage, currentUser.user.backgroundImage);
      deleteObject(bgRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const imageRefBackground = refStorage(
      storage,
      `users/${currentUser?.user.email}/image/${image?.name + v4()}`
    );
    if (image) {
      const uploadBackground = await uploadBytes(
        imageRefBackground,
        image
      ).then(() => {
        console.log("image uploaded");
      });
    }
    const urlBackground = await getDownloadURL(imageRefBackground).catch(
      (err) => console.log(err)
    );

    await axios
      .post("/api/profile/background", {
        backgroundImage: urlBackground,
      })
      .catch((err) => {
        console.log(err);
      });

    const newSession = {
      user: {
        backgroundImage: urlBackground
          ? urlBackground
          : currentUser?.user.backgroundImage
          ? currentUser?.user.backgroundImage
          : null,
      },
    };
    await update(newSession);
    router.refresh();
    setBgLoading(false);
  };

  const onSubmit = async ({ email, password, name }: FieldValues) => {
    axios
      .post("/api/profile", {
        email,
        password,
        name,
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col gap-4 p-2 z-40">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold leading-7 text-gray-300">
          Perfil
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">
          Dados pessoais.
        </p>
      </div>
      <div className=" flex justify-center gap-2 p-2 h-[215px]">
        <div>
          <label htmlFor="fileInputAvatar">
            <Image
              className={`rounded-xl bg- h-full border-4 border-gray-600 hover:border-purple-600 transition-colors cursor-pointer ${
                avatarLoading ? "animate-pulse" : ""
              }`}
              src={
                currentUser?.user.image
                  ? currentUser?.user.image!
                  : `/images/defaultUser.png`
              }
              height={200}
              width={200}
              alt="avatar"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={
                currentUser?.user.image
                  ? currentUser?.user.image!
                  : `/images/defaultUser.png`
              }
            />
          </label>
          <input
            onChange={(e) => uploadAvatar(e.target.files![0])}
            id="fileInputAvatar"
            type="file"
            className="hidden"
          />
        </div>

        <div className="h-full">
          <label htmlFor="fileInputBg">
            <Image
              className={`h-full w-auto rounded-xl border-4 border-gray-600 hover:border-purple-600 transition-colors cursor-pointer ${
                bgLoading ? "animate-pulse" : ""
              }`}
              src={
                currentUser?.user.backgroundImage
                  ? currentUser?.user.backgroundImage!
                  : `/images/backgroundConfig.gif`
              }
              height={200}
              width={200}
              alt="avatar"
              placeholder="blur"
              blurDataURL={
                currentUser?.user.backgroundImage
                  ? currentUser?.user.backgroundImage!
                  : `/images/backgroundConfig.gif`
              }
            />
          </label>
          <input
            id="fileInputBg"
            onChange={(e) => uploadBackground(e.target.files![0])}
            type="file"
            className="hidden"
          />
        </div>
      </div>
      <div className="border-[0.1em] border-gray-400 rounded-sm" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <InputFormLabeled
            label="Nome Completo"
            id="name"
            defaultValue={currentUser?.user.name!}
            error={errors}
            register={register}
            required
          />
        </div>
        <div>
          <InputFormLabeled
            defaultValue={currentUser?.user.email!}
            label="E-mail"
            id="email"
            error={errors}
            register={register}
            required
          />
        </div>
        <div>
          <InputFormLabeled
            label="Senha"
            id="password"
            error={errors}
            register={register}
            required
          />
        </div>
        <div>
          <InputFormLabeled
            label="Confirme a senha"
            id="confirmPassword"
            error={errors}
            register={register}
            required
          />
        </div>

        <div className=" flex flex-row-reverse gap-2 mx-4">
          <button
            type="submit"
            className="inline-flex mt-3 justify-center rounded-md bg-purple-800
                    px-10 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-600 sm:ml-3 "
          >
            Enviar
          </button>
          <button
            type="button"
            className="mt-3 px-10 inline-flex justify-center rounded-md bg-black py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-gray-900 transition"
            onClick={() => perfilModal.onClose()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Perfil;
