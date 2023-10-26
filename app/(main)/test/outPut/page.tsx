import React from "react";
import Editor from "@/components/Editor";
import EditorOutput from "@/components/EditorOutput";
import { getPost } from "@/lib/actions/getPost";
import Providers from "@/components/Providers";

async function textarea() {
  const post = await getPost();
  return (
    <div className="flex flex-col mx-auto mt-4 gap-4 w-11/12 z-50">
      <Providers>
        <div className="bg-gray-300 m">
          <EditorOutput content={post[0].content} title={post[0].title} />
        </div>
      </Providers>
    </div>
  );
}

export default textarea;
