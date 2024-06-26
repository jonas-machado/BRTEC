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
import ScriptEmail from "./ScriptEmail";
import ScriptMaintenance from "./ScriptMaintenance";
import ScriptCpf from "./ScriptCpf";
import dayjs from "dayjs";

const ScriptForm = ({ currentUser }: { currentUser?: User | null }) => {
  const [openTab, setOpenTab] = useState("padraoEmail");
  const [text, setText] = useState("");

  const session = useSession();
  const router = useRouter();

  const toastError = (msg: any) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const schema: any = {
    padraoEmail: z.object({
      addres: z
        .string()
        .trim()
        .min(2, { message: "O endereço não pode estar vazio" })
        .toUpperCase(),
      base: z.string({ required_error: "Selecione a base" }).min(1, {
        message: "Selecione a base",
      }),
      client: z
        .string()
        .trim()
        .min(1, { message: "O campo cliente não pode estar vazio" }),
      name: z
        .string()
        .trim()
        .min(1, { message: "O campo nome não pode estar vazio" }),
      protocol: z
        .string()
        .trim()
        .min(1, { message: "O protocolo não pode estar vazio" }),
      sla: z.string({ required_error: "Selecione o SLA" }).min(1, {
        message: "Selecione o SLA",
      }),
      tel: z
        .string()
        .trim()
        .min(1, { message: "O telefone não pode estar vazio" }),
    }),
    padraoManutencao: z.object({
      base: z.string({ required_error: "Selecione a base" }).min(1, {
        message: "Selecione a base",
      }),
      inputs: z.array(
        z.object({
          input: z.string({ required_error: "Adicione pelo menos 1 CDA" }),
          cda: z.string().min(1, { message: "CDA não pode estar vazia" }),
          loc: z
            .string()
            .min(1, { message: "Localização não pode estar vazia" }),
        }),
        { required_error: "Adicione pelo menos 1 CDA" }
      ),
      clientLost: z
        .string()
        .trim()
        .min(1, { message: "O campo cliente não pode estar vazio" }),
      description: z
        .string()
        .trim()
        .min(1, { message: "O campo cliente não pode estar vazio" }),
      protocol: z.string().trim().optional(),
    }),
    padraoCpf: z.object({
      address: z
        .string()
        .trim()
        .min(2, { message: "O endereço não pode estar vazio" })
        .toUpperCase(),
      complement: z.string().trim().toUpperCase(),
      client: z
        .string()
        .trim()
        .min(1, { message: "O campo cliente não pode estar vazio" }),
      name: z
        .string()
        .trim()
        .min(1, { message: "O campo nome não pode estar vazio" }),
      dateCall: z.any(),
      reason: z.string(),
      periodCall: z.string(),
      dateTec1: z.any(),
      dateTec2: z.any(),
      dateTec3: z.any(),
      periodTec1: z.string(),
      periodTec2: z.string(),
      periodTec3: z.string(),

      tel: z
        .string()
        .trim()
        .min(1, { message: "O telefone não pode estar vazio" }),
    }),
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema[openTab]),
  });

  useEffect(() => {
    if (errors) {
      console.log(errors);
      for (let error in errors) {
        toastError(errors[error]?.message);
      }
      const cda: any = errors?.inputs;
      for (let i = 0; i < cda?.length; i++) {
        for (let input in cda[i]) {
          toastError(i + 1 + "ª " + cda[i][input]?.message);
        }
      }
    }
  }, [errors]);

  useEffect(() => {
    reset();
    setText("");
  }, [openTab]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputs",
  });

  const onSubmit = (value: any) => {
    if (openTab == "padraoEmail") {
      setText(`\
Chamado aberto: ${value.base} ${value.client} - SLA ${value.sla}

Cliente: ${value.client}
Protocolo: ${value.protocol}
Endereço: ${value.addres}
SLA: ${value.sla}
Responsável pelo atendimento: ${value.name} // ${value.tel}

Qualquer dúvida entrar em contato.
Mais informações na O.S.

att,

${currentUser?.name.split(" ").slice(0, 2).join(" ")}.
      `);
    }
    if (openTab == "padraoManutencao") {
      const filtered = bases.filter((bs: any) => bs.name.includes(value.base));
      setText(`\
Protocolo: ${value.protocol}
Motivo: ${value.description}
Cliente afetado: ${value.clientLost}
${value.inputs?.map((input: any) => `${input.cda}\n${input.loc}`).join("\n")}
Chamado aberto: ${value.base} ${filtered[0].maintenance}
      `);
    }
    if (openTab == "padraoCpf") {
      console.log(value);
      setText(`\
Data para contato: ${value.dateCall.format("DD/MM")} - ${value.periodCall}

Motivo: ${value.reason}
Cliente: ${value.client}
Endereço: ${value.address}
Complemento: ${value.complement}
Responsável pelo atendimento: ${value.name} // ${value.tel}

Datas para o chamado
${value.dateTec1.format("DD/MM")} - ${value.periodTec1}
${value.dateTec2.format("DD/MM")} - ${value.periodTec2}
${value.dateTec3.format("DD/MM")} - ${value.periodTec3}`);
    }
  };
  return (
    <>
      <div className="container bg-black bg-opacity-80 backdrop-blur w-11/12 mx-auto rounded-xl">
        <TabBody>
          {tabScript.map((tab) => (
            <TabHead
              key={tab.id}
              state={openTab}
              id={tab.id}
              onClick={() => setOpenTab(tab.id)}
            >
              {tab.name}
            </TabHead>
          ))}
        </TabBody>
        <div className="grid lg:grid-cols-[40%,60%]">
          <form
            className="flex flex-col gap-2 p-4"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <AnimatePresence mode="wait">
              {openTab == "padraoEmail" && (
                <ScriptEmail
                  currentUser={currentUser}
                  control={control}
                  errors={errors}
                  register={register}
                />
              )}
              {openTab == "padraoManutencao" && (
                <ScriptMaintenance
                  currentUser={currentUser}
                  control={control}
                  errors={errors}
                  register={register}
                  fields={fields}
                  append={append}
                  remove={remove}
                />
              )}
              {openTab == "padraoCpf" && (
                <ScriptCpf
                  currentUser={currentUser}
                  control={control}
                  errors={errors}
                  register={register}
                />
              )}
            </AnimatePresence>
            <button
              type="submit"
              className="w-full rounded-md border border-gray-900 bg-gray-900 py-2 px-3 text-sm font-medium leading-4 text-gray-200 shadow-sm hover:bg-gray-600 focus:outline-none"
            >
              GERAR
            </button>
          </form>
          <div className="p-4 lg:pl-0 w-full h-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="sm:ml-0 w-full h-full overflow-hidden min-h-[20rem] bg-gray-900 bg-opacity-80 outline-none p-4 rounded-md text-gray-300"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ScriptForm;
