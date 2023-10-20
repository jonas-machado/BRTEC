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
import Image from "next/image";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(status);
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
      if (callback?.error) {
        setIsLoading(false);
        return notify(callback.error);
      }
      //router.push("/config/manual");
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
            xmlnsXlink="http://www.w3.org/1999/xlink"
            height="800px"
            width="800px"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 274.927 274.927"
            xmlSpace="preserve"
            className="w-[9rem] h-[9rem] m-12 animate-pulse opacity-70"
          >
            <g>
              <path d="M218.221,154.718c0.63,0.42,1.257,0.867,1.879,1.336l0,0c-4.536,2.701-9.998,5.464-16.54,8.417   c-26.93,12.161-54.078,10.846-87.987,5.216c-19.063-3.164-35.444-6.836-48.518-11.497c0.697-0.599,1.397-1.166,2.102-1.703   c12.715,4.318,28.359,7.771,46.416,10.769c33.909,5.63,61.057,6.945,87.987-5.216C209.221,159.484,214.076,157.069,218.221,154.718   z M242.463,206.606c0,4.335-0.337,8.666-0.974,12.961c-2.867,17.34-10.928,31.616-24.289,42.39   c-12.045,9.724-23.367,13.684-33.905,12.866c-5.536-0.449-10.683-3.241-15.441-8.352c-8.32,4.543-16.25,6.79-23.779,6.796   c-7.006,0.011-14.536-2.073-22.584-6.266c-4.631,4.749-9.634,7.357-15.038,7.786c-10.286,0.797-21.341-3.214-33.129-12.972   c-13.11-10.68-21.363-24.876-24.873-42.281c-1.055-4.655-1.574-9.45-1.568-14.316c0-16.332,4.923-30.607,14.858-41.777   c1.145-1.29,2.306-2.487,3.475-3.595c13.368,4.982,30.389,8.855,50.356,12.171c33.909,5.63,61.057,6.945,87.987-5.216   c7.361-3.325,13.358-6.406,18.201-9.43c2.13,1.778,4.206,3.848,6.233,6.223l0,0C237.654,174.933,242.463,189.609,242.463,206.606z    M99.807,195.973c1.687,0.652,3.498,0.972,5.441,0.972c6.335,0,11.199-3.367,14.562-10.097l-31.064-11.075   C87.574,184.843,91.273,191.571,99.807,195.973z M186.41,213.249c-3.495,1.167-7.517,2.272-12.047,3.305l-8.352,10.87l-7.584-7.76   c-2.979,0.376-5.824,0.638-8.542,0.768l-7.388,9.131l-8.167-8.783c-3.233-0.12-6.672-0.439-10.289-0.976l-7.211,7.526   l-8.127-10.414c-4.774-1.41-8.25-2.759-10.447-4.052c0.262,8.412,3.756,15.794,10.488,22.131c2.717,2.718,5.956,5.115,9.709,7.192   l6.99-7.572l6.598,11.44c3.111,0.393,6.346,0.596,9.708,0.596c2.329,0,4.792-0.135,7.384-0.393l5.819-9.896l6.997,6.41   C176.048,235.908,184.206,226.072,186.41,213.249z M191.844,176.368l-31.252,11.06c3.484,6.73,8.341,10.104,14.556,10.104   c2.069,0,3.94-0.326,5.628-0.974l0,0C189.193,192.152,192.885,185.421,191.844,176.368z M203.976,159.477   c28.518-12.878,36.604-22.106,36.184-38.522l0,0c-0.409,14.986-9.045,23.937-36.184,36.191   c-26.93,12.161-54.078,10.846-87.987,5.216c-50.797-8.433-82.541-20.476-83.496-45.195c-0.992,26.302,31.128,38.83,83.496,47.525   C149.898,170.323,177.044,171.638,203.976,159.477z M115.988,159.931c33.909,5.629,61.057,6.945,87.987-5.216   c30.653-13.841,37.703-23.466,35.954-42.334c-1.598-17.236-24.079-15.682-63.647-4.082c-0.921-8.637-3.711-24.687-5.909-35.546   c16.388-21.922,21.817-28.324,35.63-72.752c-40.828,45.967-57.664,39.475-81.497,68.409c-9.165,11.128-15.503,25.319-18.624,35.782   c-0.518-0.174-1.017-0.348-1.49-0.52l0,0c-35.089-12.783-68.579-21.733-71.718,6.265   C29.536,137.934,62.006,150.968,115.988,159.931z M206.004,0L206.004,0L206.004,0L206.004,0z" />
            </g>
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
