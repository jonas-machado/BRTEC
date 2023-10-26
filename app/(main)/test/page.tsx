import React from "react";
import Editor from "@/components/Editor";
import EditorOutput from "@/components/EditorOutput";
import { getPost } from "@/lib/actions/getPost";
import Providers from "@/components/Providers";

async function textarea() {
  const post = await getPost();
  return (
    <div className="flex flex-col mx-auto mt-10 gap-4 z-50 w-11/12">
      <Providers>
        <Editor />
      </Providers>
    </div>
  );
}

export default textarea;
