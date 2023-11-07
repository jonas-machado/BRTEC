"use client";

import DisclosureBank from "@/components/DisclosureBank";
import { useState, useEffect } from "react";
import Search from "../inputs/search";
import Modal from "../modals/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabBody from "../tab/TabBody";
import TabHead from "../tab/TabHead";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

//constants
import { tabSolution } from "@/constants/tabSolutions";
import EditorOutput from "../EditorOutput";
import Editor from "../Editor";
import { sectorArray } from "@/constants/sectorArray";
import useEditorModal from "@/lib/zustand/useEditorModal";

const SolutionForm = ({ post, currentUser }: any) => {
  const isOpen = useEditorModal((state) => state.isOpen);
  const onOpen: () => void = useEditorModal((state) => state.onOpen);
  const onClose: () => void = useEditorModal((state) => state.onClose);
  const [query, setQuery] = useState("");
  const [openTab, setOpenTab] = useState("Adicionar");
  const [openSolution, setOpenSolution] = useState(currentUser.user.sector);

  const [postArray, setPostArray] = useState([]);
  const [edit, setEdit] = useState<any>();

  useEffect(() => {
    setPostArray(post);
  }, [post]);

  const filtered =
    query === ""
      ? postArray.filter((obj: any) => obj.sector.includes(openSolution))
      : postArray.filter(
          (sol: any) =>
            sol.title
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) &&
            sol.sector.includes(openSolution)
        );

  const notify = (text: any) =>
    toast.error(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const notifySuc = (text: string) => {
    toast.success(text, {
      theme: "dark",
      pauseOnFocusLoss: false,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  const router = useRouter();

  return (
    <div className="">
      <div className="relative mx-auto w-full max-w-5xl rounded-2xl bg-black bg-opacity-95 p-3 flex flex-col gap-2">
        <div className="flex p-2 w-full items-center justify-between">
          <h1 className="text-2xl whitespace-nowrap text-gray-300 ">
            Banco de soluções
          </h1>
          <div className="flex gap-4">
            <Search
              value={query}
              onChange={(e: any) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className="bg-gray-900 text-sm p-2 text-gray-300 hover:text-white border-2 border-gray-950 focus:outline-none font-bold rounded-lg text-center"
              onClick={() => {
                setEdit({});
                onOpen();
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
        <TabBody>
          {sectorArray.map((el) => (
            <TabHead
              key={el}
              state={openSolution}
              id={el}
              onClick={() => setOpenSolution(el)}
            >
              {el}
            </TabHead>
          ))}
        </TabBody>
        {filtered.map((post: any, index: number) => (
          <DisclosureBank key={post.id} title={post.title}>
            <EditorOutput content={post.content} index={index} />
            <div className="flex justify-end mx-8 mb-3 border-t-2 pt-6 gap-4">
              <button
                className="bg-gray-950 rounded-md p-2 px-4 text-lg"
                onClick={() => {
                  onOpen();
                  setEdit({
                    postId: post.id,
                    postContent: post.content,
                    postTitle: post.title,
                  });
                }}
              >
                Editar
              </button>
            </div>
          </DisclosureBank>
        ))}
        <div className="fixed bottom-10 right-12"></div>
      </div>
      <Modal
        isOpen={isOpen}
        cancel={() => {
          onClose();
        }}
      >
        <div className="">
          <Editor
            postId={edit?.postId}
            postContent={edit?.postContent}
            postTitle={edit?.postTitle}
          />
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default SolutionForm;
