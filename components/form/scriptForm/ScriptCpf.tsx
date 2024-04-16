"use client";

import TextAreaUseForm from "../../inputs/textAreaLabelUseForm";
import ControlledInput from "../../inputs/controlledInput";
import Input from "@/components/inputs/inputLabelUseForm";

import { User } from "@prisma/client";
//constants
import { bases } from "@/constants/bases";
import { sla } from "@/constants/sla";
import { motion } from "framer-motion";
import DatePickerUseForm from "@/components/inputs/DatePickerUseForm";

const period = [{ name: "Manhã" }, { name: "Tarde" }, { name: "Dia todo" }];

const ScriptCpf = ({
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
        <TextAreaUseForm
          rows={3}
          label="MOTIVO"
          placeholder="Insira o motivo do chamado"
          id="reason"
          error={errors}
          register={register}
          required
        />
        <Input
          label="CLIENTE"
          placeholder="Nome e código"
          id="client"
          register={register}
          error={errors}
          required
        />

        <TextAreaUseForm
          label="ENDEREÇO"
          placeholder="Endereço"
          id="address"
          error={errors}
          register={register}
          required
        />
        <TextAreaUseForm
          label="COMPLEMENTO"
          placeholder="Complemento"
          id="complement"
          error={errors}
          register={register}
          required
        />
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
        <DatePickerUseForm
          name="dateCall"
          id="dateCall"
          label="DATA PARA O CONTATO"
          control={control}
          error={errors}
        />
        <div>
          <ControlledInput
            name="periodCall"
            array={period}
            control={control}
            error={errors}
          />
        </div>
        <DatePickerUseForm
          name="dateTec1"
          id="dateTec1"
          label="DATA PARA O CHAMADO"
          daysAfter={1}
          control={control}
          error={errors}
        />
        <div>
          <ControlledInput
            name="periodTec1"
            array={period}
            control={control}
            error={errors}
          />
        </div>
        <DatePickerUseForm
          name="dateTec2"
          id="dateTec2"
          label="DATA PARA O CHAMADO"
          daysAfter={2}
          control={control}
          error={errors}
        />
        <div>
          <ControlledInput
            name="periodTec2"
            array={period}
            control={control}
            error={errors}
          />
        </div>
        <DatePickerUseForm
          name="dateTec3"
          id="dateTec3"
          label="DATA PARA O CHAMADO"
          daysAfter={3}
          control={control}
          error={errors}
        />
        <div>
          <ControlledInput
            name="periodTec3"
            array={period}
            control={control}
            error={errors}
          />
        </div>
      </motion.div>
    </>
  );
};

export default ScriptCpf;
