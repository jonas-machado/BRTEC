import React from "react";
import { Controller } from "react-hook-form";

function ControlledCheckbox({
  array,
  direction,
  name,
  register,
}: {
  array: string[];
  direction: string;
  name: any;
  register: any;
}) {
  return (
    <>
      <div className={`flex w-full gap-2 flex-${direction}`}>
        {array?.map((arr: any) => (
          <div key={arr}>
            <input
              type="checkbox"
              id={arr}
              value={arr}
              className="hidden peer"
              {...register("options")}
            />
            <label
              htmlFor={arr}
              className="inline-flex items-center justify-between w-full p-2 text-gray-300 bg-gray-900 border-gray-800 rounded-lg cursor-pointer hover:text-gray-400 peer-checked:text-gray-300 peer-checked:bg-gray-600 hover:bg-gray-800 transition"
            >
              <div className="w-full text-lg font-semibold text-center">
                {arr}
              </div>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default ControlledCheckbox;
