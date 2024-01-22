"use client";

import { useState, useEffect, Fragment } from "react";
import { useForm, Controller, FieldValue, FieldValues } from "react-hook-form";

import Input from "@/components/inputs/inputLabelUseForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AutocompleteInput from "../../inputs/AutocompleteInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledCheckbox from "@/components/inputs/controlledCheckbox";
const oltBrand = ["ZTE", "DATACOM", "INTELBRAS G", "INTELBRAS I"];
const VerifyCTO = ({ olt }: any) => {
  const [command, setCommand] = useState<string>();

  const schema: any = {
    olt: z.string().nonempty(),
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
  } = useForm();
  const [comando, setComando] = useState();
  const { olt: oltData, pon } = watch();
  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
  console.log(oltData);

  const onSubmit = ({ olt, pon }: FieldValues) => {
    console.log(olt, pon);

    switch (olt) {
      case "ZTE":
        setCommand(`show gpon onu state gpon-olt_${pon}`);
        break;
      case "DATACOM":
        setCommand(`do show interface gpon ${pon} onu`);
        break;
      case "INTELBRAS G":
        setCommand(``);
        break;
      case "INTELBRAS I":
        setCommand(``);
        break;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 w-full bg-black bg-opacity-80 backdrop-blur-md p-4">
      <form
        className="flex flex-col p-4 space-y-1 row-span-2 gap-1"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <ControlledCheckbox
          array={oltBrand}
          direction="row"
          name={"olt"}
          register={register}
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
      <div className="mt-4">
        <h1 className="text-gray-300 text-2xl font-bold">Comandos:</h1>
        <p className="text-gray-300">{command}</p>
      </div>
    </div>
  );
};

export default VerifyCTO;
