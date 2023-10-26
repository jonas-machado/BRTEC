"use client";

import CustomCodeRenderer from "@/components/renderers/CustomCodeRenderer";
import CustomImageRenderer from "@/components/renderers/CustomImageRenderer";
import dynamic from "next/dynamic";
import { FC } from "react";
import CustomFileRenderer from "./renderers/CustomFileRenderer";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "@/constants/editorTools";

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  attaches: CustomFileRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput = ({ content, title }: any) => {
  const Output = dynamic(() => import("editorjs-react-renderer"), {
    ssr: false,
  });

  return (
    <>
      <div className="prose prose-stone h-full">
        <h1 className=" font-bold text-6xl text-center m-4">{title}</h1>
        <Output style={style} renderers={renderers} data={content} />
      </div>
    </>
  );
};

export default EditorOutput;
