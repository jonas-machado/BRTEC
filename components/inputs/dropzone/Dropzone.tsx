"use client";

import {
  Controller,
  FieldValues,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import DropzoneInput from "./DropzoneInput";

interface input {
  id: string;
  name: string;
  onChange?: any;
  defaultValue?: string;
  error?: any;
  required?: boolean;
  multiple?: boolean;
  control: any;
  setValue: any;
}
const Dropzone = ({
  id,
  name,
  onChange,
  error,
  required,
  multiple,
  control,
  setValue,
}: input) => {
  const [fileSelected, setFileSelected] = useState<any>();

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles);
    setFileSelected(acceptedFiles[0]);
    setValue("dropZone", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
    });

  function prettySize(bytes: any, separator = "", postFix = "") {
    if (bytes) {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.min(
        parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10),
        sizes.length - 1
      );
      return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)}${separator}${
        sizes[i]
      }${postFix}`;
    }
    return "n/a";
  }
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <div className={` mt-1 relative rounded-md `}>
            <div className="flex items-center w-full">
              {!fileSelected ? (
                <label
                  {...getRootProps({ onChange: (e) => console.log(e) })}
                  htmlFor={id}
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-bray-800 border-gray-600 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    {isDragActive ? (
                      <p className="text-gray-300">Drop the files here ...</p>
                    ) : (
                      <p className="text-gray-300">
                        <span className="font-semibold">Drag 'n' drop</span>{" "}
                        some files here, or{" "}
                        <span className="font-semibold">
                          click to select files
                        </span>
                      </p>
                    )}
                  </div>
                  <input
                    id={id}
                    type="file"
                    className="hidden"
                    {...getInputProps({
                      onChange: (acceptedFiles) => console.log(acceptedFiles),
                    })}
                  />
                </label>
              ) : (
                <div className="flex gap-2 justify-between w-full">
                  <div className="flex gap-2">
                    <div
                      className={`bg-gray-800 p-2 rounded-md text-gray-300 flex items-center ${
                        error[id]
                          ? "shadow-[0px_0px_10px] shadow-purple-600"
                          : ""
                      }`}
                    >
                      {fileSelected.name.substr(
                        fileSelected.name.lastIndexOf(".") + 1
                      )}
                    </div>
                    <div>
                      <p className="text-gray-300 font-bold">
                        {fileSelected.name}
                      </p>
                      <p className="text-gray-300 text-[0.7em]">
                        {prettySize(fileSelected.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-red-900 px-1 rounded-md text-gray-300 flex items-center hover:bg-red-800"
                      onClick={() => setFileSelected(undefined)}
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      />
    </>
  );
};

export default Dropzone;
