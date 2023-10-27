"use client";

import CustomCodeRenderer from "@/components/renderers/CustomCodeRenderer";
import CustomImageRenderer from "@/components/renderers/CustomImageRenderer";
import CustomFileRenderer from "./renderers/CustomFileRenderer";
import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { storage } from "@/lib/firebase";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { usePathname, useRouter } from "next/navigation";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import type EditorJS from "@editorjs/editorjs";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { OutputData } from "@editorjs/editorjs";

interface EditorOutput {
  content: any;
  title: string;
  index: number;
}

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

const EditorOutput = ({ content, title, index }: EditorOutput) => {
  console.log(content);
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const toastError = (msg: any) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const toastSuc = (msg: any) => {
    return toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    //@ts-ignore
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    //@ts-ignore
    const Marker = (await import("@editorjs/marker")).default;
    //@ts-ignore
    const AttachesTool = (await import("@editorjs/attaches")).default;
    //@ts-ignore
    const Underline = (await import("@editorjs/underline")).default;
    //@ts-ignore
    const Hyperlink = (await import("editorjs-hyperlink")).default;
    if (!ref.current) {
      const editor = new EditorJS({
        holder: `editor${index}`,
        onReady() {
          console.log("Editor.js is ready to work!");
          ref.current = editor;
        },
        placeholder: "Digite aqui para escrever sua postagem...",
        inlineToolbar: [
          "bold",
          "italic",
          "hyperlink",
          "inlineCode",
          "marker",
          "underline",
        ],
        data: { blocks: [] },
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4],
              defaultLevel: 3,
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  console.log(file);
                  const imageRef = refStorage(
                    storage,
                    `images/${file.name + v4()}`
                  );
                  console.log(imageRef);

                  const upload = await uploadBytes(imageRef, file).then(() => {
                    console.log("image uploaded");
                  });
                  const url = await getDownloadURL(imageRef);
                  console.log(url);
                  return {
                    success: 1,
                    file: {
                      url: url,
                    },
                  };
                },
              },
            },
          },
          attaches: {
            class: AttachesTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  console.log(file);
                  const fileRef = refStorage(
                    storage,
                    `files/${file.name + v4()}`
                  );
                  console.log(fileRef);

                  const upload = await uploadBytes(fileRef, file).then(() => {
                    console.log("image uploaded");
                  });
                  const url = await getDownloadURL(fileRef);
                  console.log(url);
                  return {
                    success: 1,
                    file: {
                      url: url,
                      title: file.name,
                      size: file.size,
                      extension: file.name.split(".").pop(),
                    },
                  };
                },
              },
            },
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 2,
              withHeadings: true,
            },
          },
          hyperlink: {
            class: Hyperlink,
            config: {
              shortcut: "CMD+L",
              target: "_blank",
              rel: "nofollow",
              availableTargets: ["_blank", "_self"],
              availableRels: ["author", "noreferrer"],
              validate: false,
            },
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          embed: Embed,
          marker: Marker,
          underline: Underline,
        },
      });
      editor.isReady
        .then(() => {
          console.log("Editor.js is ready to work!");
          /** Do anything you need after editor initialization */
        })
        .catch((reason) => {
          console.log(`Editor.js initialization failed because of ${reason}`);
        });
      ref.current = editor;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };
    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="prose prose-stone h-full m-4">
        <h1 className=" font-bold text-6xl">{title}</h1>
        <div
          id={`editor${index}`}
          className="min-h-[500px] w-11/12 text-black"
        />
      </div>
    </>
  );
};

export default EditorOutput;
