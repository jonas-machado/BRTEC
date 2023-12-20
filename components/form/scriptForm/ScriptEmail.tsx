"use client";

import TextAreaUseForm from "../../inputs/textAreaLabelUseForm";
import ControlledInput from "../../inputs/controlledInput";
import Input from "@/components/inputs/inputLabelUseForm";

import { User } from "@prisma/client";
//constants
import { bases } from "@/constants/bases";
import { sla } from "@/constants/sla";
import { motion } from "framer-motion";

const ScriptForm = ({
  currentUser,
  control,
  errors,
  register,
}: {
  currentUser?: User | null;
  control: any;
  errors: any;
  register: any;
}) => {
  return (
    <>
      <motion.div
        key={`email`}
        className="flex flex-col gap-2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
      >
        <div>
          <ControlledInput
            name="base"
            array={bases}
            control={control}
            error={errors}
          />
        </div>
        <Input
          label="CLIENTE"
          placeholder="Nome e código"
          id="client"
          register={register}
          error={errors}
          required
        />

        <Input
          label="PROTOCOLO"
          placeholder="20230000000000"
          id="protocol"
          error={errors}
          register={register}
        />
        <TextAreaUseForm
          label="ENDEREÇO"
          placeholder="Endereço"
          id="addres"
          error={errors}
          register={register}
          required
        />
        <div>
          <ControlledInput
            name="sla"
            array={sla}
            error={errors}
            control={control}
          />
        </div>
        <Input
          label="RESPONSÁVEL"
          placeholder="Nome"
          id="name"
          error={errors}
          register={register}
          required
        />
        <Input
          label="TELEFONE"
          placeholder="(xx) xxxxx-xxxx"
          id="tel"
          error={errors}
          register={register}
          required
        />
      </motion.div>
    </>
  );
};

export default ScriptForm;
