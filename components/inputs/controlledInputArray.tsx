"use client";

import { FieldValues, UseFormRegister, Controller } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface input {
  name: string;
  control: any;
  array: any;
  direction: string;
}
const ControlledInputArray = ({ name, control, array, direction }: input) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <RadioGroup
              {...field}
              onChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <div
                className={`flex w-full h-full items-center justify-between gap-2 flex-${direction}`}
              >
                {array.map((arr: any) => (
                  <RadioGroup.Option
                    key={arr}
                    value={arr}
                    className={({
                      active,
                      checked,
                    }: {
                      active: any;
                      checked: any;
                    }) =>
                      `relative flex cursor-pointer rounded-lg px-3 py-2 shadow-sm shadow-black focus:outline-none w-full transition-all ${
                        checked
                          ? "bg-gray-700 bg-opacity-60 text-white shadow-md shadow-black"
                          : "bg-gray-900 bg-opacity-60"
                      }`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex w-full justify-between ">
                        <div className="w-full text-center">
                          <span className={`text-gray-300`}>{arr}</span>
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </>
        )}
      />
    </>
  );
};

export default ControlledInputArray;
