"use client";

import React, { useState, useEffect } from "react";
//import io from "socket.io-client";
import Input from "../inputs/inputLabelUseForm";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import ControlledInputDescription from "../inputs/controlledInputDescription";
import ControlledInput from "../inputs/controlledInput";
import ControlledInputConfig from "../inputs/controlledInputConfig";
import { useForm, FieldValues } from "react-hook-form";

import { cadastro } from "@/utils/text/cadastro";
import { intelbrasI } from "@/utils/text/intelbrasI";
import { intelbrasG } from "@/utils/text/intelbrasG";
import { datacom } from "@/utils/text/datacom";
import { scriptText } from "@/utils/text/zte";
//constants
import { plans } from "@/constants/plans";
import { ponExceptions } from "@/constants/ponException";

//ZOD
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AutocompleteInput from "../inputs/AutocompleteInput";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleVlan, handleVlanDatacom } from "@/utils/provision/handleVlan";
import AdminOnly from "../AdminOnly";

//constants
const ontType = [{ name: "ONU" }, { name: "ONT" }];
const intelbrasModel = [{ name: "ITBS" }, { name: "ZNTS" }];

interface ConfigProps {
  currentUser?: User | null;
  olt: any;
}

function ConfigForm({ currentUser, olt }: ConfigProps) {
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

  useEffect(() => {
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  //selections
  const [selectedRadio, setSelectedRadio] = useState(plans[0]);

  //models handlers
  const [oltCompanyArray, setOltCompanyArray] = useState<any[]>([]);
  const [oltCompany, setOltCompany] = useState("");

  //text areas
  const [configText, setConfigText] = useState<string>();
  const [cadastroTextArea, setCadastroText] = useState<string>();
  const [pppoeTextArea, setpppoeText] = useState<string>();
  const [pppoeTextArea2, setpppoeText2] = useState<string>();

  const schema: any = {
    ZTE: z.object({
      serial: z
        .string()
        .trim()
        .min(2, { message: "O serial deve conter entre 2 e 12 caracteres" })
        .max(12, { message: "O serial deve conter entre 2 e 12 caracteres" })
        .toUpperCase(),
      pon: z
        .string()
        .trim()
        .min(1, { message: "A pon deve conter entre 2 e 12 caracteres" })
        .max(6, { message: "A pon deve conter entre 2 e 12 caracteres" }),
      idLivre: z
        .string()
        .trim()
        .min(1, { message: "O ID deve conter entre 1 e 3 caracteres" })
        .max(3, { message: "O ID deve conter entre 1 e 3 caracteres" }),
      client: z
        .string()
        .trim()
        .min(2, { message: "O cliente não pode estar vazio" }),
      customVlan: z.string().trim().nullish(),
    }),
    IntelbrasI: z.object({
      serial: z
        .string()
        .trim()
        .min(2, { message: "O serial deve conter entre 2 e 12 caracteres" })
        .max(12, { message: "O serial deve conter entre 2 e 12 caracteres" })
        .toUpperCase(),
      pon: z
        .string()
        .trim()
        .min(1, { message: "A pon deve conter entre 2 e 12 caracteres" })
        .max(6, { message: "A pon deve conter entre 2 e 12 caracteres" }),
      idLivre: z
        .string()
        .trim()
        .min(1, { message: "O ID deve conter entre 1 e 3 caracteres" })
        .max(3, { message: "O ID deve conter entre 1 e 3 caracteres" }),
      client: z
        .string()
        .trim()
        .min(2, { message: "O cliente não pode estar vazio" }),
      idOnu: z.string().trim().min(1, {
        message: "O ID da ONU deve ser preenchido",
      }), // Add more fields and validation rules as needed      customVlan: z.string().trim().nullish(),
      customVlan: z.string().trim().nullish(),
    }),
    IntelbrasG: z.object({
      serial: z
        .string()
        .trim()
        .min(2, { message: "O serial deve conter entre 2 e 12 caracteres" })
        .max(12, { message: "O serial deve conter entre 2 e 12 caracteres" })
        .toUpperCase(),
      pon: z
        .string()
        .trim()
        .min(1, { message: "A pon deve conter entre 2 e 12 caracteres" })
        .max(6, { message: "A pon deve conter entre 2 e 12 caracteres" }),
      idLivre: z
        .string()
        .trim()
        .min(1, { message: "O ID deve conter entre 1 e 3 caracteres" })
        .max(3, { message: "O ID deve conter entre 1 e 3 caracteres" }),
      client: z
        .string()
        .trim()
        .min(2, { message: "O cliente não pode estar vazio" }),
      intelbrasModel: z.string().min(1, {
        message: "O modelo de onu deve ser preenchido entre ITBS e ZNTS",
      }),
      customVlan: z.string().trim().nullish(),
    }),
    Datacom: z.object({
      ontType: z.string().min(1, {
        message: "O tipo deve ser preenchido entre ONU e ONT",
      }), // Replace with appropriate validation rules
      serial: z
        .string()
        .trim()
        .min(2, { message: "O serial deve conter entre 2 e 12 caracteres" })
        .max(12, { message: "O serial deve conter entre 2 e 12 caracteres" })
        .toUpperCase(),
      pon: z
        .string()
        .trim()
        .min(1, { message: "A pon deve conter entre 2 e 12 caracteres" })
        .max(6, { message: "A pon deve conter entre 2 e 12 caracteres" }),
      idLivre: z
        .string()
        .trim()
        .min(1, { message: "O ID deve conter entre 1 e 3 caracteres" })
        .max(3, { message: "O ID deve conter entre 1 e 3 caracteres" }),
      client: z
        .string()
        .trim()
        .min(2, { message: "O cliente não pode estar vazio" }),
      customVlan: z.string().trim().nullish(),
      customProfile: z.string().trim().nullish(),
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
    resolver: zodResolver(
      schema[oltCompany] ? schema[oltCompany] : schema["ZTE"]
    ),
  });

  const { serial, pon, idLivre, client, customVlan, oltName } = watch();

  useEffect(() => {
    if (errors) {
      console.log(errors);
      for (let error in errors) {
        toastError(errors[error]?.message);
      }
    }
  }, [errors]);

  const resetForm = () => {
    setConfigText("");
    setCadastroText("");
    setpppoeText("");
    setpppoeText2("");
    reset();
  };

  const resetText = () => {
    setConfigText("");
    setCadastroText("");
    setpppoeText("");
    setpppoeText2("");
  };

  useEffect(() => {
    if (selectedRadio.name == "ZTE/ITBS" && serial) {
      if (serial.length > 8) {
        setOltCompanyArray(olt.filter((olt: any) => olt.brand == "ZTE"));
        setOltCompany("ZTE");
      } else {
        setOltCompanyArray(
          olt.filter((olt: any) => olt.brand.includes("INTELBRAS"))
        );
        oltName?.olt == "ERVINO"
          ? setOltCompany("IntelbrasI")
          : setOltCompany("IntelbrasG");
      }
    }
    if (selectedRadio.name == "Datacom" && serial) {
      setOltCompanyArray(olt.filter((olt: any) => olt.brand == "DATACOM"));
      setOltCompany("Datacom");
    }
  }, [serial, selectedRadio, oltName]);

  //comandos
  const comando = (pon: string, id: number, olt: string) => {
    switch (olt) {
      case "ZTE":
        return `show pon power attenuation gpon-onu_${pon}:${id}`;
      case "IntelbrasG":
        return `onu power show 1-1-${pon}-${id}`;
      case "IntelbrasI":
        return `onu status gpon ${pon} onu ${id}`;
      case "Datacom":
        return `do show interface gpon ${pon} onu ${id}`;
      default:
        // Handle the case when olt is not recognized
        return `Unsupported olt type: ${olt}`;
    }
  };

  const pppoeText = (client: string[]) => {
    const toFilter = ["", "das", "dos", "de", "do", "da"];
    const filtered = client.filter(function (el) {
      return !toFilter.includes(el);
    });
    return filtered
      .flatMap((v) =>
        filtered.map((w) => {
          if (v != w) {
            return v + "." + w;
          }
        })
      )
      .filter((el) => {
        if (el != undefined) {
          return el;
        }
      });
  };
  const pppoeText2 = (client: string[]) => {
    const toFilter = ["das", "dos", "de", "do", "da", "ltda"];
    const filtered = client.filter(function (el) {
      return !toFilter.includes(el);
    });

    return filtered.map((w) => "2ponto." + w);
  };

  const handleConfigSubmit = async ({
    client,
    customProfile,
    customVlan,
    idOnu,
    idLivre,
    intelbrasModel,
    ontType,
    pon,
  }: FieldValues) => {
    resetText();

    const name = client
      .normalize("NFD")
      .replace(/-/g, " ")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .split(" ")
      .join("_");

    const clientPPPoE = client
      .toLowerCase()
      .normalize("NFD")
      .replace(/-/g, " ")
      .replace(/[0-9]/g, "")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .split(" ");

    const script: scriptText = new scriptText(
      pon,
      idLivre,
      serial,
      name,
      oltName?.olt,
      handleVlan(oltName, pon, oltName?.vlan, customVlan)
    );

    setpppoeText(pppoeText(clientPPPoE).join("\n"));
    setpppoeText2(pppoeText2(clientPPPoE).join("\n"));

    const provision = () => {
      if (selectedRadio.name == "ZTE/ITBS" && oltName?.brand == "ZTE") {
        setCadastroText(
          cadastro(comando(pon, idLivre, "ZTE"), currentUser, oltName, serial)
        );
        if (serial.substring(0, 5) == "ZTEG3") {
          return script.valenet();
        }
        if (serial.substring(0, 4) == "ZTEG") {
          return script.zte();
        }
        if (serial.substring(0, 4) == "CMSZ") {
          return script.chima();
        }
        return script.chima();
      }

      if (
        selectedRadio.name == "ZTE/ITBS" &&
        oltName?.brand.includes("INTELBRAS")
      ) {
        switch (oltName?.olt) {
          case "ERVINO":
            setCadastroText(
              cadastro(
                comando(pon, idLivre, "IntelbrasI"),
                currentUser,
                oltName,
                serial
              )
            );

            return intelbrasI(
              pon,
              idLivre,
              idOnu,
              name,
              handleVlan(oltName, pon, oltName?.vlan, customVlan)
            );
          default:
            setCadastroText(
              cadastro(
                comando(pon, idLivre, "IntelbrasG"),
                currentUser,
                oltName,
                serial
              )
            );
            return intelbrasG(
              pon,
              idLivre,
              serial,
              name,
              intelbrasModel,
              handleVlan(oltName, pon, oltName?.vlan, customVlan)
            );
        }
      }

      if (selectedRadio.name == "Datacom" && oltName?.brand == "DATACOM") {
        setCadastroText(
          cadastro(
            comando(pon, idLivre, "Datacom"),
            currentUser,
            oltName,
            serial
          )
        );
        switch (oltName?.olt) {
          default:
            return datacom(
              pon,
              idLivre,
              serial,
              name,
              ontType,
              oltName,
              customProfile,
              handleVlanDatacom(ontType, pon, oltName?.vlan, customVlan)
            );
        }
      }
    };
    setConfigText(provision());
    axios
      .post("/api/configManual", {
        onutype: ontType,
        serial,
        olt: oltName?.ip,
        pon,
        idLivre,
        idOnu,
        customVlan,
        cliente: name,
        script: provision(),
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <section className="lg:grid lg:grid-cols-[minmax(240px,400px),minmax(200px,900px),minmax(0,275px),minmax(0,275px)] grid-auto-rows gap-2 py-14 w-full flex flex-col justify-center">
        <form
          className="row-span-2 h-full z-10"
          onSubmit={handleSubmit(handleConfigSubmit)}
          autoComplete="off"
        >
          <div className=" flex flex-col bg-black bg-opacity-90 backdrop-blur-sm border-gray-900 border-2 rounded-xl p-4 space-y-2">
            <ControlledInputDescription
              id="oltScript"
              name="oltScript"
              array={plans}
              selectedRadio={selectedRadio}
              onChange={setSelectedRadio}
            />
            {selectedRadio.name == "Datacom" && (
              <ControlledInput
                name="ontType"
                array={ontType}
                control={control}
                defaultValue="ONU"
                error={errors}
              />
            )}

            <Input
              label="SN"
              placeholder="Serial"
              id="serial"
              error={errors}
              register={register}
              required
            />
            <div className="flex w-full flex-col lg:flex-row gap-2 lg:gap-0 lg:space-y-0">
              <AutocompleteInput
                id="olt"
                name="oltName"
                label="OLT"
                options={oltCompanyArray}
                placeHolder="Selecione a OLT"
                control={control}
                className={oltCompany == "IntelbrasG" && "lg:rounded-r-none"}
              />
              {oltCompany == "IntelbrasG" && (
                <div className="flex w-full lg:w-[8rem]">
                  <ControlledInputConfig
                    name="intelbrasModel"
                    control={control}
                    array={intelbrasModel}
                    error={errors}
                  />
                </div>
              )}
            </div>
            <Input
              label="PON"
              placeholder={oltName?.brand.includes("INTELBRAS") ? "0" : "0/0/0"}
              id="pon"
              error={errors}
              register={register}
              required
            />
            <Input
              label="ID Livre"
              placeholder="Posição"
              id="idLivre"
              error={errors}
              register={register}
              required
            />
            {oltName?.brand == "INTELBRAS I" && (
              <>
                <Input
                  label="ID Onu"
                  placeholder="ID Onu"
                  id="idOnu"
                  error={errors}
                  register={register}
                  required
                />
              </>
            )}
            <Input
              label="Cliente"
              placeholder="Nome"
              id="client"
              error={errors}
              register={register}
              required
            />
            <Input
              label="Vlan"
              error={errors}
              placeholder="Custom Vlan"
              id="customVlan"
              register={register}
              required={false}
            />
            {selectedRadio.name == "Datacom" && (
              <Input
                label="Profile"
                error={errors}
                placeholder="Custom Profile"
                id="customProfile"
                register={register}
                required={false}
              />
            )}
            <div className="flex w-full gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-md border border-gray-900 bg-gray-900 py-2 px-3 text-sm font-medium leading-4 text-gray-200 shadow-sm hover:bg-gray-600 focus:outline-none"
              >
                LIMPAR
              </button>
              <button
                type="submit"
                className="w-full rounded-md border border-gray-900 bg-gray-900 py-2 px-3 text-sm font-medium leading-4 text-gray-200 shadow-sm hover:bg-gray-600 focus:outline-none"
              >
                GERAR
              </button>
            </div>
          </div>
        </form>
        <div className="row-span-2 h-full">
          <textarea
            id="about"
            name="about"
            className="lg:h-full whitespace-pre scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent min-h-[400px] lg:min-h-0 border-2 w-full rounded-md bg-gray-900 bg-opacity-90 backdrop-blur-sm border-black shadow-sm outline-none text-sm text-white p-3"
            value={configText}
            autoComplete="false"
            spellCheck="false"
            onChange={(e) => setConfigText(e.target.value)}
          />
        </div>
        <div className="col-span-2 h-full">
          <textarea
            id="about"
            name="about"
            className="lg:h-full whitespace-pre scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent min-h-[400px] lg:min-h-0 border-2 w-full rounded-md bg-gray-900 bg-opacity-90 backdrop-blur-sm border-black shadow-sm outline-none text-sm text-white p-3"
            value={cadastroTextArea}
            spellCheck="false"
            onChange={(e) => setCadastroText(e.target.value)}
          />
        </div>
        <div className="h-full">
          <textarea
            id="about"
            name="about"
            className="lg:h-full whitespace-pre min-h-[400px] scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent lg:min-h-0 border-2 w-full rounded-md bg-gray-900 bg-opacity-90 backdrop-blur-sm border-black shadow-sm outline-none text-sm text-white p-3"
            value={pppoeTextArea}
            spellCheck="false"
            onChange={(e) => setpppoeText(e.target.value)}
          />
        </div>
        <div className="h-full">
          <textarea
            id="about"
            name="about"
            className="lg:h-full whitespace-pre min-h-[400px] scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent lg:min-h-0 border-2 w-full rounded-md bg-gray-900 opacity-90 backdrop-blur-sm border-black shadow-sm outline-none text-sm text-white p-3"
            defaultValue={""}
            spellCheck="false"
            value={pppoeTextArea2}
            onChange={(e) => setpppoeText2(e.target.value)}
          />
        </div>
      </section>

      <ToastContainer />
    </div>
  );
}

export default ConfigForm;
