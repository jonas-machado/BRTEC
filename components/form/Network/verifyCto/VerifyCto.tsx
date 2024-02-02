"use client";

import { useState, useEffect, Fragment } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";

import Input from "@/components/inputs/inputLabelUseForm";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "@/components/inputs/controlledInput";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Config from "./config";
import Verify from "./verify";
import { AnimatePresence } from "framer-motion";
import MotionContent from "@/lib/framerMotion/motionContent";
import MotionComponent from "@/lib/framerMotion/motionComponent";

const oltBrand = [
  { name: "ZTE" },
  { name: "DATACOM" },
  { name: "INTELBRAS G" },
  { name: "INTELBRAS I" },
];
const VerifyCTO = ({ olt }: any) => {
  const [verify, setVerify] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<any>([]);

  const [command, setCommand] = useState<string[]>();

  const schema = z.object({
    olts: z.string().nonempty(),
    pon: z.string().trim().nonempty(),
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const { olts, pon } = watch();

  const schemaVerify =
    olts == "DATACOM"
      ? z.object({
          firstPon: z.string().trim(),
          secondPon: z.string().trim(),
          mac: z.string().trim(),
          servicePort: z.string().trim(),
        })
      : z.object({
          firstPon: z.string().trim(),
          secondPon: z.string().trim(),
          mac: z.string().trim(),
        });

  const {
    register: registerVerify,
    handleSubmit: handleSubmitVerify,
    control: controlVerify,
    reset: resetVerify,
    watch: watchVerify,
    formState: { errors: errorsVerify },
  } = useForm({ resolver: zodResolver(schemaVerify) });

  const { mac } = watchVerify();

  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
  console.log(filtered);

  const onSubmit = ({ olts, pon }: FieldValues) => {
    console.log(olts, pon);

    switch (olts) {
      case "ZTE":
        const commandZte = [
          `show gpon onu state gpon-olt_${pon}`,
          `show mac gpon olt gpon-olt_${pon}`,
        ];
        setCommand(commandZte);
        break;
      case "DATACOM":
        const commandDatacom = [
          `do show interface gpon ${pon} onu`,
          `show service-port gpon ${pon}`,
          `do show mac-address-table vlan 10${pon.split("/").slice(-1)}`,
        ];

        setCommand(commandDatacom);
        break;
      case "INTELBRAS G":
        break;
      case "INTELBRAS I":
        break;
    }
  };

  const onSubmitVerify = ({ firstPon, secondPon, mac, servicePort }: any) => {
    setVerify(true);
    const arrayFirstPon = firstPon.split("\n");
    const arraySecondPon = secondPon.split("\n");
    const arrayMac = mac.split("\n");
    const arrayervicePort = servicePort?.split("\n");

    const filterArray = arraySecondPon.filter((item: any, i: number) => {
      return item != arrayFirstPon[i];
    });

    let arrayDown = [];

    for (let i = 0; i < arrayFirstPon.length; i++) {
      if (arraySecondPon[i] != arrayFirstPon[i]) {
        const macDown = arrayMac.filter((item: any) => {
          return item.includes(arraySecondPon[i].split(" ")[0] + " ");
        });
        const getMac = macDown.split(" ")[0];
        const changeMac = macDown.fill(
          getMac.replace(/[^.](.{1})/g, "$&:").replace(/\./g, ""),
          0,
          1
        );
        arrayDown.push({
          state: arraySecondPon[i],
          mac: macDown.spl,
        });
      }
    }
    console.log(arrayDown);

    const macAddress = "d877.8b41.4f7f";
    const macfilter = macAddress
      .replace(/[^.](.{1})/g, "$&:")
      .replace(/\./g, "");

    console.log(macfilter);
    setFiltered(arrayDown);
  };

  return (
    <>
      <div className=" w-full bg-black bg-opacity-80 backdrop-blur-md transition-all p-4 gap-4 h-full">
        <div className="grid lg:grid-cols-2 w-full gap-4 h-full">
          {!verify && (
            <>
              <MotionContent id="config" className={``}>
                <form
                  className="flex flex-col space-y-1 gap-1"
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                >
                  <ControlledInput
                    array={oltBrand}
                    name={"olts"}
                    control={control}
                    error={errors}
                    defaultValue="ZTE"
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
              </MotionContent>
              <MotionContent id="config" className={``}>
                <h1 className="text-gray-300 text-2xl font-bold">Comandos:</h1>
                {command?.map((item) => (
                  <div className="flex gap-2 my-2">
                    <span className="text-gray-300">{item}</span>
                    <CopyToClipboard text={item}>
                      <button className="text-gray-300 bg-gray-900 rounded-md px-1 focus:bg-gray-800 transition">
                        Copiar
                      </button>
                    </CopyToClipboard>
                  </div>
                ))}
              </MotionContent>
            </>
          )}
          <form
            className=" col-span-2 grid grid-cols-2 gap-2"
            onSubmit={handleSubmitVerify(onSubmitVerify)}
            autoComplete="off"
          >
            {!verify && (
              <MotionContent id="before" className={``}>
                <h1 className="text-gray-300 text-xl mb-2">
                  Texto para comparar <strong>antes</strong>:
                </h1>
                <textarea
                  {...registerVerify("firstPon")}
                  id="firstPon"
                  className="w-full bg-gray-900 outline-none rounded-md h-60 text-gray-300 p-2 scrollbar-corner-transparent resize-none scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
                ></textarea>
              </MotionContent>
            )}

            <MotionContent
              id={verify.toString()}
              className={verify ? "col-span-2" : ""}
            >
              <h1 className="text-gray-300 text-xl mb-2">
                Texto para comparar <strong>depois</strong>:
              </h1>
              <textarea
                {...registerVerify("secondPon")}
                id="secondPon"
                className="w-full bg-gray-900 outline-none rounded-md h-60 text-gray-300 p-2 scrollbar-corner-transparent resize-none scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
              ></textarea>
            </MotionContent>
            {!verify && (
              <MotionContent id="macServicePort" className={`col-span-2`}>
                <h1 className="text-gray-300 text-xl mb-2">
                  Todos os MAC da PON:
                </h1>
                <textarea
                  {...registerVerify("mac")}
                  className="w-full bg-gray-900 outline-none rounded-md h-60 text-gray-300 p-2 scrollbar-corner-transparent resize-none scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
                ></textarea>
                {olts == "DATACOM" && (
                  <>
                    <h1 className="text-gray-300 text-xl mb-2">
                      Todos os service-port da PON:
                    </h1>
                    <textarea
                      {...registerVerify("servicePort")}
                      className="w-full bg-gray-900 outline-none rounded-md h-60 text-gray-300 p-2 scrollbar-corner-transparent resize-none scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
                    ></textarea>
                  </>
                )}
              </MotionContent>
            )}
            <MotionContent
              id={verify.toString()}
              className="flex gap-4 col-span-2"
            >
              {verify && (
                <button
                  onClick={() => setVerify(false)}
                  className={`bg-gray-900 rounded-md p-2  text-gray-300 w-full col-span-2 hover:bg-gray-800 transition`}
                >
                  Editar
                </button>
              )}
              <button
                type="submit"
                className="bg-gray-900 outline-none rounded-md p-2 text-gray-300 w-full col-span-2 hover:bg-gray-800 transition"
              >
                Verificar
              </button>
            </MotionContent>
          </form>
        </div>
      </div>
      <div className="bg-black bg-opacity-70 backdrop-blur-md rounded-md divide-y-2 p-4">
        {filtered.map((item: any) => (
          <div key={item.state} className=" p-4">
            <p className="text-gray-300">{item.state}</p>
            <p className="text-gray-300">{item.mac.join("\n")}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default VerifyCTO;
