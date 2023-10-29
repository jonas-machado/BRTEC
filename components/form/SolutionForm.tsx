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

const SolutionForm = ({ post }: any) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [openTab, setOpenTab] = useState("Adicionar");
  const [postArray, setPostArray] = useState([]);

  useEffect(() => {
    setPostArray(post);
  }, [post]);

  const filtered =
    query === ""
      ? postArray
      : postArray.filter((sol: any) =>
          sol.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
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
                setIsOpen(true);
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
        {filtered.map((post: any, index: number) => (
          <DisclosureBank key={post.id} title={post.title}>
            <EditorOutput content={post.content} index={index} />
          </DisclosureBank>
        ))}
        <div className="fixed bottom-10 right-12"></div>
      </div>
      <Modal
        isOpen={isOpen}
        cancel={() => {
          setIsOpen(false);
        }}
      >
        <div className="mb-4">
          <TabBody>
            {tabSolution.map((tab) => (
              <TabHead
                key={tab}
                state={openTab}
                id={tab}
                onClick={() => setOpenTab(tab)}
              >
                {tab}
              </TabHead>
            ))}
          </TabBody>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
          }}
          className="absolute top-3 right-2.5 cursor-pointer z-50 text-gray-400 bg-transparent  hover:text-gray-200 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        {openTab == "Adicionar" && (
          <div className="">
            <Editor />
          </div>
        )}
        {openTab == "Listagem" && (
          <div className="relative overflow-x-auto">
            <table className="w-full bg-gray-800 bg-opacity-80 text-sm text-left text-gray-300 dark:text-gray-400">
              <thead className="text-xs text-gray-300 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Título
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Texto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Excluir
                  </th>
                </tr>
              </thead>
              <tbody>
                {postArray.map((sol: any) => (
                  <tr
                    className="bg-gray-900 bg-opacity-60 border-b"
                    key={sol.id}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-300 dark:text-white"
                    >
                      {sol.title}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-pre-line text-gray-300 dark:text-white"
                    >
                      {sol.text}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-pre-line text-red-600"
                    >
                      <XMarkIcon className="cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default SolutionForm;
