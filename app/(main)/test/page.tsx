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
        <Editor />
        <div className="bg-gray-300 m">
          {post.map((el) => (
            <div key={el.id} className="">
              <EditorOutput content={el.content} title={el.title} />
            </div>
          ))}
        </div>
      </Providers>
    </div>
  );
}

export default textarea;
