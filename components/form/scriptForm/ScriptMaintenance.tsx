"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import TabBody from "@/components/tab/TabBody";
import TabHead from "@/components/tab/TabHead";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TextAreaUseForm from "../../inputs/textAreaLabelUseForm";
import ControlledInput from "../../inputs/controlledInput";
import Input from "@/components/inputs/inputLabelUseForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
//constants
import { tabScript } from "@/constants/tabScript";
import { bases } from "@/constants/bases";
import { sla } from "@/constants/sla";
import { AnimatePresence, motion } from "framer-motion";

//ZOD
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScriptMaintenance = ({
  currentUser,
  control,
  errors,
  register,
  fields,
  append,
  remove,
}: {
  currentUser?: User | null;
  control: any;
  errors: any;
  register: any;
  fields: any;
  append: any;
  remove: any;
}) => {
  const handleAddInput = () => {
    append({ input: "" });
  };

  const handleRemoveInput = (index: number) => {
    remove(index);
  };

  return (
    <>
      <motion.div
        key={`manutencao`}
        className="flex flex-col gap-2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
      >
        <div>
          <ControlledInput
            name="base"
            error={errors}
            array={bases}
            control={control}
          />
        </div>
        <Input
          label="PROTOCOLO"
          placeholder="20230000000000"
          id="protocol"
          error={errors}
          register={register}
        />
        <TextAreaUseForm
          label="MOTIVO"
          id="description"
          error={errors}
          register={register}
          required
        />
        <Input
          label="CLIENTE"
          placeholder="Código e nome"
          id="clientLost"
          error={errors}
          register={register}
          required
        />
        {fields?.map((field: any, index: any) => (
          <div key={field.id} className="flex gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              <Input
                label="CDA"
                placeholder="PON, CDA e OLT"
                id={`inputs.${index}.cda`}
                error={errors}
                register={register}
                required
                index={index}
                name="cda"
              />
              <Input
                label="LOCALIZAÇÃO"
                placeholder="XX.XXXXXX,XX.XXXXXX"
                error={errors}
                id={`inputs.${index}.loc`}
                register={register}
                required
                index={index}
                name="loc"
              />
            </div>
            <button
              type="button"
              onClick={(e) => handleRemoveInput(index)}
              className="text-gray-300 flex items-center"
            >
              <XMarkIcon height={40} width={40} />
            </button>
          </div>
        ))}
        <div className="w-full rounded-md border border-gray-900 bg-gray-900 py-2 px-3 text-sm font-medium leading-4 text-gray-200 shadow-sm hover:bg-gray-600 focus:outline-none">
          <button
            onClick={handleAddInput}
            type="button"
            className="flex w-full justify-center "
          >
            ADICIONAR CDA
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ScriptMaintenance;
