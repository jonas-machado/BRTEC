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
import MotionComponent from "@/lib/framerMotion/motionComponent";
import MotionContent from "@/lib/framerMotion/motionContent";

const oltBrand = [
  { name: "ZTE" },
  { name: "DATACOM" },
  { name: "INTELBRAS G" },
  { name: "INTELBRAS I" },
];
const VerifyCTO = ({ olt }: any) => {
  const [verify, setVerify] = useState<boolean>(false);

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
  const notify = (text: any) => {
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
  console.log(command);

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

  return (
    <div className=" w-full bg-black bg-opacity-80 backdrop-blur-md p-4 gap-4 h-full">
      <AnimatePresence mode="wait">
        {!verify ? (
          <MotionContent id="config">
            <Config
              verifyState={() => setVerify(!verify)}
              handleSubmit={handleSubmit(onSubmit)}
              command={command}
              register={register}
              control={control}
              currentOlt={olts}
              errors={errors}
            />
          </MotionContent>
        ) : (
          <MotionContent id="verify">
            <Verify verifyState={() => setVerify(!verify)} />
          </MotionContent>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerifyCTO;
