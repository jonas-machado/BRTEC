"use client";

import React, { HtmlHTMLAttributes, useContext } from "react";
import { useState, useEffect, Fragment } from "react";
import { useForm, Controller, FieldValues, useWatch } from "react-hook-form";
import Input from "@/components/inputs/inputLabelUseForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ControlledCheckbox from "@/components/inputs/controlledCheckbox";
import AutocompleteInput from "../../inputs/AutocompleteInput";
import { SocketContext } from "@/lib/socket";

const VerifyPon = ({ olt }: any) => {
  const socket = useContext(SocketContext);
  console.log(olt);
  const [text, setText] = useState<string>("");
  const [excludeText, setExcludeText] = useState<string>("");
  const [quantidadeOnu, setQuantidadeOnu] = useState<string>("");
  const [idLivre, setIdLivre] = useState<number[]>([]);

  //Datacom
  const [onuDown, setOnuDown] = useState<string[]>([]);
  const [onuUp, setOnuUp] = useState<string[]>([]);

  const [servicePort, setServicePort] = useState<string[]>([]);

  //ZTE
  const [onuLos, setOnuLos] = useState<string[]>([]);
  const [onuDyingGasp, setOnuDyingGasp] = useState<string[]>([]);
  const [onuOff, setOnuOff] = useState<string[]>([]);
  const [onuWorking, setOnuWorking] = useState<string[]>([]);
  const [exclude, setExclude] = useState<boolean>(false);
  const [response, setResponse] = useState<any>();
  const [multipleResponse, setMultipleResponse] = useState<any>();
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerDown,
    handleSubmit: handleSubmitDown,
    reset: resetDown,
    control: controlDown,
    formState: { errors: errorsDown },
  } = useForm();

  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };

  const oltSelected = watch().olt;
  const pon = watch().pon;

  useEffect(() => {
    // Handle connection event

    // Handle disconnection event

    function onTelnetResponse(value: any) {
      setResponse(value);
    }

    function onMultipleResponse(value: any) {
      setMultipleResponse(value);
    }

    socket.on("telnet response", onTelnetResponse);
    socket.on("multipleResponse", onMultipleResponse);

    return () => {
      socket.off("telnet response", onTelnetResponse);
      socket.off("multipleResponse", onMultipleResponse);
    };
  }, []);

  const onDetail = (ont: any, todos?: boolean) => {
    if (oltSelected?.brand == "ZTE") {
      if (!todos) {
        socket.emit("connectTelnet", {
          ip: oltSelected.ip,
          command: `show gpon onu detail-info gpon-onu_${ont}`,
          commandType: "detail",
        });
      } else {
        socket.emit("multipleTelnet", {
          ip: oltSelected.ip,
          commands: ont.map(
            (el: any) => `show gpon onu detail-info gpon-onu_${el}`
          ),
          commandType: "detail",
        });
      }
    }
    if (oltSelected?.brand == "DATACOM") {
      if (!todos) {
        socket.emit("connectTelnetDatacom", {
          ip: oltSelected.ip,
          command: `do show inter gpon ${pon} onu ${ont}`,
          commandType: "detail",
        });
      } else {
        socket.emit("multipleDatacomTelnet", {
          ip: oltSelected.ip,
          commands: ont.map((el: any) => `do show inter gpon ${pon} onu ${el}`),
          commandType: "detail",
        });
      }
    }
  };

  const onSubmit = async ({ pon, olt }: FieldValues) => {
    socket.emit("connectTelnet", {
      ip: olt.ip,
      command: `show gpon onu state gpon-olt_${pon}`,
      brand: olt.brand,
      commandType: "state",
    });
    // if (selected?.brand == "ZTE") {
    //   socket.emit("connectTelnet", {
    //     ip: selected.ip,
    //     command: `show gpon onu state gpon-olt_${pon}`,
    //     brand: selected.brand,
    //     commandType: "state",
    //   });
    // }
    // if (selected?.brand == "DATACOM") {
    //   console.log(selected);
    //   socket.emit("connectTelnetDatacom", {
    //     ip: selected.ip,
    //     command: `do show interface gpon ${pon} onu`,
    //     brand: selected.brand,
    //     commandType: "state",
    //   });
    //   socket.emit("connectTelnetDatacom", {
    //     ip: selected.ip,
    //     command: `show service-port gpon ${pon}`,
    //     brand: selected.brand,
    //     commandType: "showServicePort",
    //   });
    // }
  };

  function isArrayIncluded(string: string, subArray: any[]) {
    for (const element of subArray) {
      if (string.includes(`onu ${element} `)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    const res = multipleResponse?.data?.map((res: any) =>
      res.replace(/.*/g, "")
    );
    setText(res?.join("\n"));
  }, [multipleResponse]);

  useEffect(() => {
    if (response?.commandType == "detail") {
      const res = response.data.replace(/.*/g, "");
      setText(res);
    }
    if (response?.commandType == "state") {
      setIdLivre([]);
      setText("");
      if (oltSelected?.brand == "ZTE") {
        if (response.res?.includes("Error")) {
          return notify("Pon vazia");
        }
        const res = response.data.replace(//g, "").split("\n");
        const toMatch = res.filter((el: any) => el.includes("ONU Number"));
        const onuTotal = res.filter((el: any) => el.includes(`${pon}:`));
        const startString = "ONU Number: ";

        // Create a regular expression pattern using the start and end strings
        const pattern = `${startString}(.*)`;

        // Execute the regular expression and retrieve the captured substring
        const match = toMatch[0]?.match(new RegExp(pattern));
        if (match && match.length > 1) {
          const capturedSubstring = match[1];
          setQuantidadeOnu(capturedSubstring);
        }

        const exception = [
          "BS02",
          "ITAPOA",
          "ITINGA",
          "MIRANDA",
          "ITACOLOMI",
          "VILA NOVA",
        ];
        const include = (value: any, find: any, not?: boolean) => {
          if (exception.includes(oltSelected.olt)) {
            return value
              .filter((onu: any) =>
                not ? !onu.includes(find) : onu.includes(find)
              )
              .map(
                (el: any) =>
                  el
                    .split(" ")
                    .filter((str: any) => str != "")[0]
                    .split("_")[1]
              );
          } else {
            return value
              .filter((onu: any) =>
                not ? !onu.includes(find) : onu.includes(find)
              )
              .map(
                (el: any) => el.split(" ").filter((str: any) => str != "")[0]
              );
          }
        };
        setOnuDown(include(onuTotal, "working", true));
        setOnuDyingGasp(include(onuTotal, "DyingGasp"));
        setOnuOff(include(onuTotal, "OffLine"));
        setOnuLos(include(onuTotal, "LOS"));
        setOnuWorking(include(onuTotal, "working"));

        setText(onuTotal.join("\n"));

        for (let i = 1; i <= 128; i++) {
          const idToCheck = `${pon}:${i} `;
          const verify = response.data.includes(idToCheck);
          if (verify) {
          } else {
            setIdLivre((prevState) => [...prevState, i]);
          }
        }
      }
      if (oltSelected?.brand == "DATACOM") {
        setText(response.data);
        const res = response.data
          .split("\n")
          .filter((el: any) => el.includes(`${pon}`));

        const include = (value: any, find: any, not?: boolean) => {
          return value
            .filter((onu: any) =>
              not ? !onu.includes(find) : onu.includes(find)
            )
            .map((el: any) => el.split(" ").filter((str: any) => str != "")[1]);
        };
        setQuantidadeOnu(res.length);

        setOnuDown(include(res, "Down"));
        setOnuUp(include(res, "Up"));
        setText(res.join("\n"));
        for (let i = 1; i <= 127; i++) {
          const idToCheck = ` ${i} `;
          const verify: any = response.data.includes(idToCheck);
          if (!verify) {
            setIdLivre((prevState) => [...prevState, i]);
          }
        }
      }
    }
    if (response?.commandType == "showServicePort") {
      setServicePort(response.data.split("!"));
    }
  }, [response]);

  const onSubmitDown = ({ options }: FieldValues) => {
    if (oltSelected.brand == "ZTE") {
      const onu = options.map((arr: string) => arr.split(":")[1]);
      setExcludeText(`\
conf t
interface gpon-olt_${pon}
${onu.map((el: string) => `no onu ${el}`).join("\n")} 
`);
    }
    if (oltSelected.brand == "DATACOM") {
      const startString = "service-port ";

      const pattern = `${startString}(.*)`;

      // Execute the regular expression and retrieve the captured substring

      const onuServicePort = servicePort
        .filter((el) => isArrayIncluded(el, options))
        .map((el) => el.match(new RegExp(pattern))![1]);
      if (onuServicePort && onuServicePort.length > 0) {
        setExcludeText(`\
conf t
${onuServicePort.map((el) => `no service-port ${el}`).join("\n")}
commit

interface gpon ${pon}
${
  options.lenght > 1
    ? options.map((el: string) => `no onu ${el}`).join("\n")
    : `no onu ${options[0]}`
} 
commit
`);
      }
    }
  };

  return (
    <div className="bg-black bg-opacity-70 rounded-md backdrop-blur-md w-full">
      <div className="grid lg:grid-cols-4 ">
        <div>
          <form
            className="p-4 space-y-1 row-span-2"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <AutocompleteInput
              id="olt"
              name="olt"
              label="OLT"
              placeHolder="Selecione a OLT"
              options={olt}
              control={control}
            />
            <Input
              id="pon"
              placeholder="x/x/x"
              register={register}
              required
              label="PON"
              error={errors}
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
          <div className=" py-2 m-4 mt-0">
            <div className="m-4 ">
              <h1 className="text-gray-300 text-md font-bold">INFORMAÇÕES</h1>
              <div className="mt-4">
                <p className="text-gray-300">
                  ONTs configuradas: {quantidadeOnu}
                </p>
                <p className="text-gray-300">Quantidade UP: {onuUp?.length}</p>
                <p className="text-gray-300">
                  Quantidade DOWN: {onuDown?.length}
                </p>
                {oltSelected?.brand == "ZTE" && (
                  <>
                    <p className="text-gray-300">
                      Equipamentos em LOS: {onuLos?.length}
                    </p>
                    <p className="text-gray-300">
                      Equipamentos em DYINGGASP: {onuDyingGasp?.length}
                    </p>
                    <p className="text-gray-300">
                      Equipamentos OFFLINE: {onuOff?.length}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="m-4">
              <h1 className="text-gray-300 text-xl font-bold">ID Livres</h1>
              <div className="mt-4">
                <p className="text-gray-300">{idLivre?.join(" // ")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full col-span-3 grid-cols-4">
          {oltSelected?.brand == "ZTE" ? (
            <>
              <div className="my-2">
                <h1 className="text-gray-300 text-xl font-bold text-center">
                  DETAIL OFFLINE
                </h1>
                <div className="flex flex-col gap-1 m-4">
                  {onuOff?.map((onu: any) => (
                    <>
                      <button
                        key={onu}
                        onClick={() => onDetail(onu)}
                        className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                      >
                        {onu}
                      </button>
                    </>
                  ))}
                  <button
                    onClick={() => onDetail(onuOff, true)}
                    className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                  >
                    TODOS
                  </button>
                </div>
              </div>
              <div className="my-2">
                <h1 className="text-gray-300 text-xl font-bold text-center">
                  DETAIL LOS
                </h1>
                <div className="flex flex-col gap-1 m-4">
                  {onuLos?.map((onu: any) => (
                    <>
                      <button
                        key={onu}
                        onClick={() => onDetail(onu)}
                        className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                      >
                        {onu}
                      </button>
                    </>
                  ))}
                  <button
                    onClick={() => onDetail(onuLos, true)}
                    className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                  >
                    TODOS
                  </button>
                </div>
              </div>
              <div className="my-2">
                <h1 className="text-gray-300 text-xl font-bold text-center">
                  DETAIL DYINGGASP
                </h1>
                <div className="flex flex-col gap-1 m-4">
                  {onuDyingGasp?.map((onu: any) => (
                    <>
                      <button
                        key={onu}
                        onClick={() => onDetail(onu)}
                        className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                      >
                        {onu}
                      </button>
                    </>
                  ))}
                  <button
                    onClick={() => onDetail(onuDyingGasp, true)}
                    className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                  >
                    TODOS
                  </button>
                </div>
              </div>
              <div className="my-2">
                <h1 className="text-gray-300 text-xl font-bold text-center">
                  DETAIL WORKING
                </h1>
                <div className="flex flex-col gap-1 m-4">
                  {onuWorking?.map((onu: any) => (
                    <>
                      <button
                        key={onu}
                        onClick={() => onDetail(onu)}
                        className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                      >
                        {onu}
                      </button>
                    </>
                  ))}
                  <button
                    onClick={() => onDetail(onuWorking, true)}
                    className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                  >
                    TODOS
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="my-2">
                <h1 className="text-gray-300 text-xl font-bold text-center">
                  DETAIL DOWN
                </h1>
                <div className="flex flex-col gap-1 m-4">
                  {onuDown?.map((onu: any) => (
                    <>
                      <button
                        key={onu}
                        onClick={() => onDetail(onu)}
                        className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                      >
                        {`${pon} onu ${onu}`}
                      </button>
                    </>
                  ))}
                  <button
                    onClick={() => onDetail(onuDown, true)}
                    className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                  >
                    TODOS
                  </button>
                </div>
              </div>
              <div className="my-2">
                <h1 className="text-gray-300 text-xl font-bold text-center">
                  DETAIL UP
                </h1>
                <div className="flex flex-col gap-1 m-4">
                  {onuUp?.map((onu: any) => (
                    <>
                      <button
                        key={onu}
                        onClick={() => onDetail(onu)}
                        className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                      >
                        {`${pon} onu ${onu}`}
                      </button>
                    </>
                  ))}
                  <button
                    onClick={() => onDetail(onuUp, true)}
                    className="text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
                  >
                    TODOS
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[70%,29%] gap-2 px-4">
        <textarea
          readOnly
          value={text}
          className="container p-4 h-screen scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 outline-none scrollbar-track-transparent text-gray-300 bg-black bg-opacity-60 rounded-xl whitespace-pre-line"
        />
        <div className="w-full h-full">
          <form onSubmit={handleSubmitDown(onSubmitDown)} className="h-full">
            {exclude ? (
              <>
                <textarea
                  readOnly
                  value={excludeText}
                  className="container p-4 h-[94%] scrollbar-corner-transparent resize-none scrollbar-thumb-rounded-md scrollbar-thin scrollbar-thumb-gray-800 outline-none scrollbar-track-transparent text-gray-300 bg-black bg-opacity-60 rounded-xl whitespace-pre-line"
                />
              </>
            ) : oltSelected?.brand == "ZTE" ? (
              <>
                <ControlledCheckbox
                  register={registerDown}
                  name="onuDownDatacom"
                  direction="col"
                  array={onuDyingGasp.concat(onuLos, onuOff)}
                />
              </>
            ) : (
              <>
                <ControlledCheckbox
                  register={registerDown}
                  name="onuDownDatacom"
                  direction="col"
                  array={onuDown}
                />
              </>
            )}
            <button
              type="submit"
              onClick={(e) => setExclude(!exclude)}
              className="w-full mt-4 text-gray-300 bg-gray-900 bg-opacity-80 p-1 hover:bg-gray-700 transition-all rounded-md"
            >
              {exclude ? "Editar" : "Gerar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPon;
