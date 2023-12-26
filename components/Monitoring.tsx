"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import InlineEditor from "./inlineEditor";
import { useState } from "react";

const basesObj = [
  {
    name: "VOU",
    class: "text-orange-600 bg-orange-600 bg-opacity-20",
  },
  {
    name: "ATELE",
    class: "text-green-600 bg-green-600 bg-opacity-20",
  },
  {
    name: "XTELE",
    class: "text-gray-400 bg-gray-600 bg-opacity-20",
  },
];

export default function Monitoring() {
  const currentDate = new Date();
  const [bases, setBases] = useState([]);
  const [isUp, setIsUp] = useState(false);
  return (
    <>
      <InlineEditor
        array={basesObj}
        date={currentDate}
        bases={bases}
        setBases={setBases}
        text="testando"
        isUp={isUp}
        changeStatus={() => setIsUp(!isUp)}
      />
    </>
  );
}
