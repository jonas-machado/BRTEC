"use client";

import React, { useState, useEffect } from "react";
//import io from "socket.io-client";
import Input from "../inputs/inputLabelUseForm";
import InputLabel from "../inputs/InputLabel";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import ControlledInputDescription from "../inputs/controlledInputDescription";
import ControlledInput from "../inputs/controlledInput";
import ControlledInputConfig from "../inputs/controlledInputConfig";
import { useForm, Controller, FieldValues } from "react-hook-form";
import ComboboxInput from "../inputs/comboboxInput";

import { cadastro } from "@/lib/text/cadastro";
import { intelbrasI } from "@/lib/text/intelbrasI";
import { intelbrasG } from "@/lib/text/intelbrasG";
import { datacom } from "@/lib/text/datacom";
import { scriptText } from "@/lib/text/zte";
//constants
import { plans } from "@/constants/plans";
import { ponExceptions } from "@/constants/ponException";

//ZOD
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//constants
const ontType = [{ name: "ONU" }, { name: "ONT" }];
const intelbrasModel = [{ name: "ITBS" }, { name: "ZNTS" }];

interface selectedType {
  createdAt: any;
  id: string;
  olt: string;
  updatedAt: any;
  vlan: number;
  brand: string;
  ip: string;
}

interface ConfigProps {
  currentUser?: User | null;
  olt: any;
}

function ConfigForm({ currentUser, olt }: ConfigProps) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status == "unauthenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  //selections
  const [selected, setSelected] = useState<selectedType>();
  const [selectedRadio, setSelectedRadio] = useState(plans[0]);

  //inputs config
  const [sn, setSn] = useState("");

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
      sn: z.string().trim().min(2).max(12),
      pon: z.string().trim().min(1).max(6),
      idLivre: z.string().trim().min(1).max(3),
      client: z.string().trim().min(2).max(50),
      customVlan: z.string().trim().nullish(),
    }),
    Intelbras: z.object({
      sn: z.string().trim().min(2).max(12),
      pon: z.string().trim().min(1).max(6),
      idLivre: z.string().trim().min(1).max(3),
      idOnu: z.string().trim().min(1), // Add more fields and validation rules as needed
      client: z.string().trim().trim().min(2).max(50),
      customVlan: z.string().trim().nullish(),
      customProfile: z.string().trim().trim().nullish(),
    }),
    Datacom: z.object({
      ontType: z.string().trim(), // Replace with appropriate validation rules
      sn: z.string().trim().min(2).max(12),
      pon: z.string().trim().min(1).max(6),
      idLivre: z.string().trim().min(1).max(3),
      idOnu: z.string().trim().min(1), // Add more fields and validation rules as needed
      client: z.string().trim().min(2).max(50),
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
    resolver: zodResolver(schema[oltCompany]),
  });

  const showAll = watch();

  console.log(errors);
  console.log(showAll);

  const resetForm = () => {
    setSn("");
    setConfigText("");
    setCadastroText("");
    setpppoeText("");
    setpppoeText2("");
    reset();
  };

  useEffect(() => {
    if (selectedRadio.name == "ZTE/ITBS" && sn) {
      if (sn.length > 8) {
        setOltCompanyArray(olt.filter((olt: any) => olt.brand == "ZTE"));
        setOltCompany("ZTE");
      } else {
        setOltCompanyArray(
          olt.filter((olt: any) => olt.brand.includes("INTELBRAS"))
        );
        selected?.olt == "ERVINO"
          ? setOltCompany("IntelbrasI")
          : setOltCompany("IntelbrasG");
      }
    }
    if (selectedRadio.name == "Datacom" && sn) {
      setOltCompanyArray(olt.filter((olt: any) => olt.brand == "DATACOM"));
      setOltCompany("Datacom");
    }
  }, [sn, selectedRadio, olt]);

  const handleVlan = (pon: string, vlan?: number, customVlan?: number) => {
    if (vlan && !customVlan) {
      return vlan;
    } else if (customVlan) {
      return customVlan;
    } else if (selected?.olt == "ITAPOA2") {
      const lastPon = pon.split("/");
      const lastVlanSlot1 = 0 + lastPon[2];
      const lastVlanSlot2 = parseInt(lastPon[2]) + 16;
      switch (lastPon[1]) {
        case "1":
          return Number("5" + lastVlanSlot1.slice(-2));
        case "2":
          return Number("5" + lastVlanSlot2);
      }
    } else if (
      ponExceptions[selected!.olt] &&
      ponExceptions[selected!.olt].includes(pon)
    ) {
      return ponExceptions[selected!.olt].vlan;
    } else if (!vlan && !customVlan) {
      return Number(pon.replace(/[/]/gi, ""));
    }
  };

  const handleVlanDatacom = (
    onuType: string,
    pon: string,
    vlan?: number,
    customVlan?: number
  ) => {
    if (vlan && !customVlan) {
      return vlan;
    } else if (customVlan) {
      return customVlan;
    } else if (!vlan && !customVlan) {
      if (onuType == "ONU") {
        const lastPon = pon.split("/");
        const lastVlanSlot1 = 0 + lastPon[2];
        return Number("1" + lastVlanSlot1.slice(-2));
      } else {
        return 119;
      }
    }
  };

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
    console.log(idOnu);
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

    // axios
    //   .post("http://127.0.0.1:5000/configure-onu", {
    //     onutype: ontType,
    //     serial: sn,
    //     olt: selected?.ip,
    //     pon,
    //     idLivre,
    //     idOnu,
    //     customVlan,
    //     cliente: name,
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const script = new scriptText(
      pon,
      idLivre,
      sn,
      name,
      selected?.olt,
      handleVlan(pon, selected?.vlan, customVlan)
    );

    setpppoeText(pppoeText(clientPPPoE).join("\n"));
    setpppoeText2(pppoeText2(clientPPPoE).join("\n"));

    if (selectedRadio.name == "ZTE/ITBS" && selected?.brand == "ZTE") {
      setCadastroText(
        cadastro(comando(pon, idLivre, "ZTE"), currentUser, selected, sn)
      );
      if (sn.substring(0, 5) == "ZTEG3") {
        console.log("pass");
        return setConfigText(script.valenet());
      }
      if (sn.substring(0, 4) == "ZTEG") {
        console.log("pass");
        return setConfigText(script.zte());
      }
      if (sn.substring(0, 4) == "CMSZ") {
        console.log("pass");
        return setConfigText(script.chima());
      }
      return setConfigText(script.chima());
    }

    if (
      selectedRadio.name == "ZTE/ITBS" &&
      selected?.brand.includes("INTELBRAS")
    ) {
      switch (selected?.olt) {
        case "ERVINO":
          setCadastroText(
            cadastro(
              comando(pon, idLivre, "IntelbrasI"),
              currentUser,
              selected,
              sn
            )
          );
          setConfigText(
            intelbrasI(
              pon,
              idLivre,
              idOnu,
              name,
              handleVlan(pon, selected?.vlan)
            )
          );
          break;
        case "GARUVA":
        case "SFS":
        default:
          setCadastroText(
            cadastro(
              comando(pon, idLivre, "IntelbrasG"),
              currentUser,
              selected,
              sn
            )
          );
          setConfigText(
            intelbrasG(
              pon,
              idLivre,
              sn,
              name,
              intelbrasModel,
              handleVlan(pon, selected?.vlan)
            )
          );
          break;
      }
    }

    if (selectedRadio.name == "Datacom" && selected?.brand == "DATACOM") {
      setCadastroText(
        cadastro(comando(pon, idLivre, "Datacom"), currentUser, selected, sn)
      );
      switch (selected?.olt) {
        case "JACU":
        case "ARAQUARI":
        case "BRUSQUE":
        case "BS1":
        case "ITAPOCU":
        case "SNL101":
        default:
          setConfigText(
            datacom(
              pon,
              idLivre,
              sn,
              name,
              ontType,
              selected,
              customProfile,
              handleVlanDatacom(ontType, pon, selected?.vlan, customVlan)
            )
          );
          break;
      }
    }
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
              />
            )}

            <Input
              value={sn}
              label="SN"
              placeholder="Serial"
              id="serial"
              register={register}
              required
              onChange={(e: any) => setSn(e.target.value)}
            />
            <div className="flex w-full flex-col lg:flex-row gap-2 lg:gap-0 lg:space-y-0">
              <ComboboxInput
                id="olt"
                selected={selected}
                onChange={setSelected}
                label="OLT"
                placeHolder="Selecione a OLT"
                oltCompanyArray={oltCompanyArray}
                className={
                  oltCompany == "Intelbras" &&
                  selected?.brand != "INTELBRAS I" &&
                  "lg:rounded-r-none"
                }
              />
              {oltCompany == "Intelbras" &&
                selected?.brand != "INTELBRAS I" && (
                  <div className="flex w-full lg:w-[8rem]">
                    <ControlledInputConfig
                      name="intelbrasModel"
                      control={control}
                      array={intelbrasModel}
                    />
                  </div>
                )}
            </div>
            <Input
              label="PON"
              placeholder={
                selected?.brand.includes("INTELBRAS") ? "0" : "0/0/0"
              }
              id="pon"
              register={register}
              required
            />
            <Input
              label="ID Livre"
              placeholder="Posição"
              id="idLivre"
              register={register}
              required
            />
            {selected?.brand == "INTELBRAS I" && (
              <>
                <Input
                  label="ID Onu"
                  placeholder="ID Onu"
                  id="idOnu"
                  register={register}
                  required
                />
              </>
            )}
            <Input
              label="Cliente"
              placeholder="Nome"
              id="client"
              register={register}
              required
            />
            <Input
              label="Vlan"
              placeholder="Custom Vlan"
              id="customVlan"
              register={register}
              required={false}
            />
            {selectedRadio.name == "Datacom" && (
              <Input
                label="Profile"
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
            className="lg:h-full scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent whitespace-nowrap min-h-[400px] lg:min-h-0 border-2 w-full rounded-md bg-gray-900 bg-opacity-90 backdrop-blur-sm border-black shadow-sm outline-none text-sm text-white p-3"
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
            className="lg:h-full scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent whitespace-nowrap min-h-[400px] lg:min-h-0 border-2 w-full rounded-md bg-gray-900 bg-opacity-90 backdrop-blur-sm border-black shadow-sm outline-none text-sm text-white p-3"
            value={cadastroTextArea}
            spellCheck="false"
            onChange={(e) => setCadastroText(e.target.value)}
          />
        </div>
        <div className="h-full">
          <textarea
            id="about"
            name="about"
            className="lg:h-full min-h-[400px] scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent lg:min-h-0 border-2 w-full rounded-md bg-gray-900 bg-opacity-90 backdrop-blur-sm border-black shadow-sm outline-none text-sm text-white p-3"
            value={pppoeTextArea}
            spellCheck="false"
            onChange={(e) => setpppoeText(e.target.value)}
          />
        </div>
        <div className="h-full">
          <textarea
            id="about"
            name="about"
            className="lg:h-full min-h-[400px] scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent lg:min-h-0 border-2 w-full rounded-md bg-gray-900 opacity-90 backdrop-blur-sm border-black shadow-sm outline-none text-sm text-white p-3"
            defaultValue={""}
            spellCheck="false"
            value={pppoeTextArea2}
            onChange={(e) => setpppoeText2(e.target.value)}
          />
        </div>
      </section>
    </div>
  );
}

export default ConfigForm;
