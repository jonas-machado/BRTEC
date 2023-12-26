"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import InlineEditor from "./inlineEditor";

export default function Monitoring() {
  const currentDate = new Date();
  return (
    <>
      <InlineEditor
        date={currentDate}
        bases={["ATELE"]}
        text="teste"
        isUp={false}
      />
    </>
  );
}
