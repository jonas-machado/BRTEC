"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface input {
  label: string;
  id: string;
  name?: string;
  onChange?: any;
  defaultValue?: string;
  register: UseFormRegister<FieldValues>;
  error?: any;
  required?: boolean;
}
const InputFormLabeled = ({
  label,
  id,
  name,
  onChange,
  register,
  defaultValue,
  error,
  required,
}: input) => {
  return (
    <div
      className={` flex rounded-md shadow-sm ${
        error[id] ? "shadow-[-2px_0px_15px] shadow-red-600" : ""
      }`}
    >
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-900 bg-gray-700 bg-opacity-70 px-3 text-sm text-gray-200">
        {label}
      </span>
      <input
        type="text"
        defaultValue={defaultValue}
        id={id}
        className="block caret-gray-200 outline-none w-full h-11 flex-1 rounded-none rounded-r-md bg-gray-900 bg-opacity-70 pl-3 text-gray-200 border-gray-900 sm:text-sm autofill:shadow-[inset_0_0_0px_1000px_rgb(17,24,39,0.7)] border-b-[1px] border-t-[1px]"
        spellCheck="false"
        {...register(id, { required })}
        placeholder=" "
      />
    </div>
  );
};

export default InputFormLabeled;
