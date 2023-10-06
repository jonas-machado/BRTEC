"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface input {
  label: string;
  placeholder?: string;
  id: string;
  name?: string;
  onChange?: any;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  register: UseFormRegister<FieldValues>;
  error?: any;
}
const Input = ({
  label,
  id,
  name,
  onChange,
  register,
  required,
  placeholder,
  value,
  defaultValue,
  error,
}: input) => {
  console.log(error);
  return (
    <div
      className={`transition flex rounded-md shadow-sm ${
        error[id] ? "shadow-[0px_0px_3px] shadow-purple-600" : ""
      }
    `}
    >
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-900 bg-gray-700 bg-opacity-70 px-3 text-sm text-gray-200">
        {label}
      </span>
      <input
        type="text"
        id={id}
        className={` block caret-gray-200 outline-none w-full h-11 flex-1 rounded-none rounded-r-md bg-gray-900 bg-opacity-70 pl-3 text-gray-200 border-gray-900 sm:text-sm autofill:shadow-[inset_0_0_0px_1000px_rgb(17,24,39,0.7)] border-b-[1px] border-t-[1px]`}
        placeholder={placeholder}
        spellCheck="false"
        defaultValue={defaultValue}
        value={value}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;
