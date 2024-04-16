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

  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
  console.log(olts);

  const onSubmit = ({ olts, pon }: FieldValues) => {
    const vlanDatacom =
      pon.split("/").slice(-1)[0].length < 2
        ? 10 + pon.split("/").slice(-1)
        : 1 + pon.split("/").slice(-1);
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
          `do show mac-address-table vlan ${vlanDatacom}`,
          `show service-port gpon ${pon}`,
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
    const arrayServicePort = servicePort?.split("!\n");

    const filterArray = arraySecondPon.filter((item: any, i: number) => {
      return item != arrayFirstPon[i];
    });
    if (olts == "ZTE") {
      let arrayDown = [];

      for (let i = 0; i < arrayFirstPon.length; i++) {
        if (arraySecondPon[i] != arrayFirstPon[i]) {
          const macDown = arrayMac.filter((item: any) => {
            return item.includes(arraySecondPon[i].split(" ")[0] + " ");
          });
          const hexMac = macDown.map((item: any) => {
            const newMac = item
              .split(" ")[0]
              .replace(/\./g, "")
              .match(/.{2}/g)
              ?.join(":");
            return item.replace(item.split(" ")[0], newMac);
          });
          console.log(hexMac);
          arrayDown.push({
            state: arraySecondPon[i],
            mac: hexMac,
          });
        }
      }
      setFiltered(arrayDown);
    }
    if (olts == "DATACOM") {
      let arrayDown = [];

      for (let i = 0; i < arrayFirstPon.length; i++) {
        if (arraySecondPon[i] != arrayFirstPon[i]) {
          const [servicePortDown]: any = arrayServicePort.filter(
            (item: any) => {
              const pon = arraySecondPon[i].split(" ").filter((item: any) => {
                return item != "";
              });
              return item.includes(`gpon ${pon[0]} onu ${pon[1]} `);
            }
          );
          const macDown = arrayMac.filter((item: any) => {
            const servicePort = servicePortDown.split("\n")[0].split(" ")[1];

            return item.includes(`service-port-${servicePort} `);
          });
          console.log(servicePortDown);
          arrayDown.push({
            state: arraySecondPon[i],
            mac: macDown,
            servicePort: servicePortDown.split("\n")[0],
          });
        }
      }
      setFiltered(arrayDown);
    }
  };

  return (
    <>
      <div className=" w-full bg-black bg-opacity-80 backdrop-blur-md transition-all p-4 gap-4 h-full">
        <div className="grid lg:grid-cols-2 w-full gap-4 h-full">
          {!verify && (
            <>
              <MotionContent id="config" className={`col-span-2 lg:col-span-1`}>
                <form
                  className="flex flex-col space-y-1 gap-1"
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                >
                  <ControlledInput
                    className="flex-col md:flex-row"
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
              <MotionContent id="config" className={`col-span-2 lg:col-span-1`}>
                <h1 className="text-gray-300 text-2xl font-bold">Comandos:</h1>
                {command?.map((item) => (
                  <div key={item} className="flex gap-2 my-2">
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
                  className="w-full bg-gray-900 outline-none rounded-md h-60 text-gray-300 p-2 scrollbar-corner-transparent scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
                ></textarea>
              </MotionContent>
            )}

            <MotionContent
              id={verify.toString()}
              className={verify ? "col-span-2" : ""}
            >
              {verify && command && (
                <>
                  <h1 className="text-lg font-bold text-gray-300">Comando:</h1>
                  <div key={command![0]} className="flex gap-2">
                    <span className="text-gray-300">{command![0]}</span>
                    <CopyToClipboard text={command![0]}>
                      <button className="text-gray-300 bg-gray-900 rounded-md px-1 focus:bg-gray-800 transition">
                        Copiar
                      </button>
                    </CopyToClipboard>
                  </div>
                </>
              )}
              <h1 className="text-gray-300 text-xl mb-2">
                Texto para comparar <strong>depois</strong>:
              </h1>
              <textarea
                {...registerVerify("secondPon")}
                id="secondPon"
                className="w-full bg-gray-900 outline-none rounded-md h-60 text-gray-300 p-2 scrollbar-corner-transparent scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
              ></textarea>
            </MotionContent>
            {!verify && (
              <MotionContent id="macServicePort" className={`col-span-2`}>
                <h1 className="text-gray-300 text-xl mb-2">
                  Todos os MAC da PON:
                </h1>
                <textarea
                  {...registerVerify("mac")}
                  className="w-full bg-gray-900 outline-none rounded-md h-60 text-gray-300 p-2 scrollbar-corner-transparent scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
                ></textarea>
                {olts == "DATACOM" && (
                  <>
                    <h1 className="text-gray-300 text-xl mb-2">
                      Todos os service-port da PON:
                    </h1>
                    <textarea
                      {...registerVerify("servicePort")}
                      className="w-full bg-gray-900 outline-none rounded-md h-60 text-gray-300 p-2 scrollbar-corner-transparent scrollbar-w-3 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-transparent scrollbar-track-rounded-md"
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
            <p className="text-gray-300">{item.servicePort}</p>

            <p className="text-gray-300">{item.state}</p>
            {item.mac.map((mac: any) => (
              <p key={mac} className="text-gray-300">
                {mac}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default VerifyCTO;
