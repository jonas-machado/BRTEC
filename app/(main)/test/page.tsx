import React from "react";
import Editor from "@/components/Editor";
import EditorOutput from "@/components/EditorOutput";
import { getPost } from "@/lib/actions/getPost";
import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";

async function textarea() {
  const post = await getPost();
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <div className="flex flex-col mx-auto mt-4 gap-4 w-11/12 z-50">
      <Editor currentUserId={currentUser?.user.id} />
      <div className="bg-gray-300 m">
        {post.map((el) => (
          <div key={el.id} className="">
            <EditorOutput content={el.content} title={el.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default textarea;
