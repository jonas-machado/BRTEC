"use client";

import { FieldValues, UseFormRegister, Controller } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface input {
  name: string;
  control: any;
  array: any;
  defaultValue?: string;
  error?: any;
  className?: string;
}
const ControlledInput = ({
  name,
  control,
  array,
  defaultValue,
  error,
  className,
}: input) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            <RadioGroup
              {...field}
              onChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <div
                className={`flex w-full h-full items-center justify-between gap-2 ${className}`}
              >
                {array.map((arr: any) => (
                  <RadioGroup.Option
                    key={arr.name}
                    value={arr.name}
                    className={({
                      active,
                      checked,
                    }: {
                      active: any;
                      checked: any;
                    }) =>
                      `transition-all ${
                        error[name]
                          ? "shadow-[0px_0px_4px_0_rgb(147_51_234/1)]"
                          : checked
                          ? " text-white "
                          : "shadow-black shadow-[inset_0_0px_10px_-3px]"
                      } relative flex cursor-pointer rounded-lg p-2  focus:outline-none w-full transition-all ${
                        checked
                          ? "bg-gray-700 bg-opacity-60"
                          : "bg-gray-900 bg-opacity-60"
                      }`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex w-full justify-between ">
                        <div className="w-full text-center">
                          <span className={`text-gray-300 whitespace-nowrap`}>
                            {arr.name}
                          </span>
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

export default ControlledInput;
