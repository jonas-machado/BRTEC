"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import InputUseForm from "../inputs/inputUseForm";
import { z, ZodType } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status, update } = useSession();
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
    })
      .then((callback) => {
        if (callback?.error) {
          setIsLoading(false);
          return notify(callback.error);
        }

        setIsLoading(false);
        //router.push("/config/manual");
      })
      .catch((err) => console.log(err));
  };
  if (status == "authenticated") {
    router.push("/config/manual");
  }

  if (status == "loading") {
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
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="1157.000000pt"
            height="1280.000000pt"
            viewBox="0 0 1157.000000 1280.000000"
            preserveAspectRatio="xMidYMid meet"
            className="w-60 h-60 p-5 animate-pulse"
          >
            <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g
              transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
              fill="#d9003a"
              stroke="none"
            >
              <path d="M5330 12245 c-284 -52 -593 -227 -935 -529 -44 -39 -157 -144 -252 -232 -94 -89 -292 -270 -440 -401 -557 -498 -782 -754 -928 -1058 -153 -318 -165 -537 -36 -658 82 -77 175 -116 515 -217 250 -74 326 -125 339 -230 18 -153 -227 -496 -577 -807 -148 -132 -372 -314 -615 -499 -424 -322 -641 -504 -799 -668 -259 -270 -372 -498 -360 -733 3 -74 9 -97 33 -142 64 -116 195 -181 430 -212 133 -18 537 -13 872 10 570 40 932 39 1056 -5 100 -35 157 -102 157 -183 0 -124 -109 -308 -299 -504 -254 -264 -622 -532 -1431 -1047 -827 -526 -1143 -758 -1337 -981 -129 -148 -178 -261 -171 -394 3 -67 10 -90 37 -142 77 -144 290 -304 538 -404 407 -164 1043 -238 1812 -210 180 6 451 20 602 31 624 44 711 51 805 60 55 5 148 10 207 10 89 0 115 -4 147 -20 75 -38 88 -91 120 -485 30 -366 51 -482 115 -635 62 -150 156 -258 269 -311 84 -39 207 -51 441 -40 99 4 254 5 345 1 348 -16 481 25 599 182 129 174 171 351 206 878 18 271 22 310 41 377 30 108 94 125 439 112 1421 -54 2053 -42 2575 47 505 86 837 227 1052 447 164 167 181 344 53 537 -55 82 -200 223 -327 318 -217 162 -436 292 -1148 687 -485 269 -713 400 -940 543 -578 363 -949 731 -968 957 -15 187 175 259 743 280 972 36 1245 82 1407 233 88 82 117 174 99 307 -27 192 -135 387 -327 593 -156 168 -374 339 -844 662 -554 382 -724 514 -930 720 -260 259 -369 446 -331 563 27 82 111 126 411 216 245 74 343 115 430 179 76 57 118 113 137 184 17 67 16 97 -3 199 -30 157 -121 346 -254 524 -145 195 -318 365 -715 706 -213 182 -198 168 -500 446 -291 267 -423 376 -582 482 -213 143 -397 224 -582 256 -102 18 -300 18 -401 0z m315 -266 c101 -14 266 -73 370 -131 199 -112 360 -238 700 -553 223 -206 335 -305 540 -481 285 -243 398 -349 526 -494 181 -205 289 -405 289 -534 0 -119 -79 -170 -430 -275 -327 -99 -456 -174 -529 -311 -43 -79 -53 -185 -26 -275 25 -90 109 -242 196 -358 207 -276 523 -552 1039 -907 91 -62 230 -158 310 -214 510 -352 739 -565 847 -786 31 -63 37 -86 37 -142 1 -65 0 -68 -39 -108 -65 -67 -175 -97 -460 -124 -193 -19 -269 -23 -615 -36 -427 -16 -587 -34 -767 -86 -156 -45 -269 -128 -326 -239 -27 -52 -31 -73 -35 -156 -5 -110 8 -168 64 -285 118 -245 380 -513 768 -789 270 -191 545 -358 1051 -637 565 -313 742 -413 925 -522 402 -241 596 -403 637 -533 15 -48 15 -55 -2 -100 -60 -162 -382 -323 -815 -408 -296 -58 -487 -76 -990 -96 -301 -11 -549 -7 -1395 24 -510 18 -708 17 -769 -7 -96 -37 -166 -124 -185 -231 -6 -33 -17 -172 -26 -310 -29 -477 -46 -616 -89 -745 -41 -120 -96 -191 -176 -228 -52 -23 -819 -29 -898 -6 -69 20 -121 67 -166 154 -71 134 -88 238 -136 833 -22 261 -33 316 -80 379 -90 124 -182 141 -560 109 -889 -78 -1619 -118 -1950 -107 -725 24 -1222 136 -1492 336 -83 61 -119 113 -126 180 -7 80 30 144 162 276 174 173 444 368 1006 725 440 280 450 287 675 436 278 183 526 362 684 492 159 131 419 392 493 497 200 281 254 523 156 707 -53 99 -174 185 -314 221 -157 41 -606 45 -1094 11 -685 -48 -909 -39 -1025 43 -77 54 -83 153 -15 287 103 204 332 422 895 852 728 557 1006 818 1230 1153 172 258 221 455 150 608 -66 142 -185 222 -445 302 -280 86 -332 104 -374 131 -62 39 -86 80 -86 150 0 105 54 238 169 411 135 205 327 408 701 741 124 110 338 305 475 433 409 381 575 510 790 614 214 104 371 135 550 109z" />
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
