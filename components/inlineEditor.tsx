"use client";
//@ts-ignore
import EasyEdit, { Types } from "react-easy-edit";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TagPicker } from "rsuite";

export default function InlineEditor() {
  const save = (value: any) => {
    alert(value);
  };
  const cancel = () => {
    alert("Cancelled");
  };

  const data = ["VOU", "ATELE", "XTELE"].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <>
      <div className="flex justify-center m-4">
        <EasyEdit
          type={Types.TEXT}
          onSave={save}
          onCancel={cancel}
          saveButtonLabel={<CheckIcon className="w-4 h-4" />}
          cancelButtonLabel={<XMarkIcon className="w-4 h-4" />}
          attributes={{ name: "awesome-input", id: 1 }}
        />
      </div>
      <div className="w-full h-full">
        <TagPicker data={data} style={{ width: 300 }} />
      </div>
    </>
  );
}
