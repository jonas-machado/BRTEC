"use client";

import { useState, useEffect, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";

import Input from "@/components/inputs/inputLabelUseForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AutocompleteInput from "../inputs/AutocompleteInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const VerifyCTO = ({ olt }: any) => {
  const schema: any = {
    pon: z
      .string()
      .trim()
      .min(1, { message: "A pon deve conter entre 2 e 12 caracteres" })
      .max(6, { message: "A pon deve conter entre 2 e 12 caracteres" }),
  };

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

  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };

  const onSubmit = () => {};

  return (
    <div className="grid lg:grid-cols-4">
      <div>
        <form
          className="p-4 space-y-1 row-span-2"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <AutocompleteInput
            id="olt"
            label="OLT"
            placeHolder="Selecione a OLT"
            options={olt}
            control={control}
            name="oltName"
          />
          <Input
            label="PON"
            placeholder="x/x/x"
            id="pon"
            register={register}
            error={errors}
            required
          />
          <div className="w-full ">
            <button
              type="submit"
              className="flex w-full justify-center py-2 px-3 rounded-md border border-gray-900 bg-gray-900  text-sm font-medium leading-4 text-gray-200 shadow-sm hover:bg-gray-600 focus:outline-none"
            >
              GERAR
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 col-span-2">
        <h1 className="text-gray-300">ONU COM QUEDA RECENTEMENTE</h1>
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eos
          delectus soluta expedita eligendi dolore debitis. Dicta, libero magnam
          excepturi sequi, voluptatum ullam quibusdam blanditiis optio eaque
          nulla numquam vero?
        </p>
      </div>
    </div>
  );
};

export default VerifyCTO;
