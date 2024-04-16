"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, FieldValues, UseFormRegister } from "react-hook-form";

interface input {
  label: string;
  placeholder?: string;
  id: string;
  name?: any;
  required?: boolean;
  control?: any;
  error?: any;
  index?: any;
  daysAfter?: number;
}
export default function DatePickerUseForm({
  label,
  id,
  name,
  control,
  error,
  index,
  daysAfter = 0,
}: input) {
  return (
    <div
      className={`flex transition-all rounded-md ${
        error[id] || error.inputs?.[index]?.[name]
          ? "shadow-[0px_0px_4px_0_rgb(147_51_234/1)]"
          : ""
      }
    `}
    >
      <span className="inline-flex whitespace-nowrap py-2 items-center rounded-md border border-gray-900 bg-gray-700 bg-opacity-70 px-3 text-sm text-gray-200">
        {label}
      </span>
      <div className="flex justify-center w-full">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                className=" !p-2"
                value={dayjs().add(daysAfter!, "day")}
                format="DD/MM/YY"
                views={["month", "day"]}
              />
            </LocalizationProvider>
          )}
        />
      </div>
    </div>
  );
}
