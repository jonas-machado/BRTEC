"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { Session } from "next-auth";
import Image from "next/image";
import usePerfilModal from "@/lib/usePerfilModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputFormLabeled from "../inputs/inputFormLabeled";
import axios from "axios";
import { storage } from "@/lib/firebase";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

function Perfil({ currentUser }: { currentUser?: Session | null }) {
  const perfilModal = usePerfilModal();
  const router = useRouter();
  const { data: session, update } = useSession();

  console.log(currentUser);
  const [avatar, setAvatar] = useState<any>();
  const [backgroundImage, setBackgroundImage] = useState<any>();
  const [avatarUrl, setAvatarUrl] = useState<any>();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<any>();
  console.log(avatar);
  console.log(backgroundImage);
  console.log(avatarUrl);
  console.log(backgroundImageUrl);

  useEffect(() => {
    if (avatar) {
      setAvatarUrl(URL.createObjectURL(avatar));
    }
    return () => URL.revokeObjectURL(avatarUrl); // Clean up the URL when the component unmounts or avatar changes
  }, [avatar]);

  useEffect(() => {
    if (backgroundImage) {
      setBackgroundImageUrl(URL.createObjectURL(backgroundImage));
    }
    return () => URL.revokeObjectURL(backgroundImageUrl); // Clean up the URL when the component unmounts or backgroundImage changes
  }, [backgroundImage]);

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

  const onSubmit = async ({ email, password, name }: FieldValues) => {
    const imageRefAvatar = refStorage(storage, `images/${avatar?.name + v4()}`);
    if (avatar) {
      const uploadAvatar = await uploadBytes(imageRefAvatar, avatar).then(
        () => {
          console.log("image uploaded");
        }
      );
    }
    const urlAvatar: any = await getDownloadURL(imageRefAvatar).catch((err) =>
      console.log(err)
    );

    const imageRefBackground = refStorage(
      storage,
      `images/${backgroundImage?.name + v4()}`
    );
    if (backgroundImage) {
      const uploadBackground = await uploadBytes(
        imageRefBackground,
        backgroundImage
      ).then(() => {
        console.log("image uploaded");
      });
    }
    const urlBackground = await getDownloadURL(imageRefBackground).catch(
      (err) => console.log(err)
    );

    axios
      .post("/api/profile", {
        id: currentUser?.user.id,
        email,
        password,
        name,
        image: urlAvatar
          ? urlAvatar
          : currentUser?.user.image
          ? currentUser?.user.image
          : null,
        backgroundImage: urlBackground
          ? urlBackground
          : currentUser?.user.backgroundImage
          ? currentUser?.user.backgroundImage
          : null,
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
        backgroundImage: urlBackground
          ? urlBackground
          : currentUser?.user.backgroundImage
          ? currentUser?.user.backgroundImage
          : null,
      },
    };
    await update(newSession);
    router.refresh();
  };
  return (
    <div className="flex flex-col gap-4 p-2 ">
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
              className="rounded-xl bg- h-full border-4 border-gray-600 hover:border-purple-600 transition-colors cursor-pointer"
              src={
                currentUser?.user.image && !avatarUrl
                  ? currentUser?.user.image!
                  : avatarUrl
                  ? avatarUrl
                  : `/images/Default-user-picture.webp`
              }
              height={200}
              width={200}
              alt="avatar"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={
                currentUser?.user.image && !avatarUrl
                  ? currentUser?.user.image!
                  : avatarUrl
                  ? avatarUrl
                  : `/images/Default-user-picture.webp`
              }
            />
          </label>
          <input
            onChange={(e) => setAvatar(e.target.files![0])}
            id="fileInputAvatar"
            type="file"
            className="hidden"
          />
        </div>

        <div className="h-full">
          <label htmlFor="fileInputBg">
            <Image
              className="h-full w-auto rounded-xl border-4 border-gray-600 hover:border-purple-600 transition-colors cursor-pointer"
              src={
                currentUser?.user.backgroundImage && !backgroundImageUrl
                  ? currentUser?.user.backgroundImage!
                  : backgroundImageUrl
                  ? backgroundImageUrl
                  : `/images/backgroundConfig.gif`
              }
              height={200}
              width={200}
              alt="avatar"
              placeholder="blur"
              blurDataURL={
                currentUser?.user.backgroundImage && !backgroundImageUrl
                  ? currentUser?.user.backgroundImage!
                  : backgroundImageUrl
                  ? backgroundImageUrl
                  : `/images/backgroundConfig.gif`
              }
            />
          </label>
          <input
            id="fileInputBg"
            onChange={(e) => setBackgroundImage(e.target.files![0])}
            type="file"
            className="hidden"
          />
        </div>
      </div>
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
