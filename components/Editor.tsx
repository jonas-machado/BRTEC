"use client";

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

const Editor = () => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const { mutate: createPost } = useMutation({
    mutationFn: async ({ title, content }: FieldValues) => {
      const payload = { title, content };
      const { data } = await axios.post("/api/post/create", payload);
      return data;
    },
    onError: () => {
      return toastError("O post não foi publicado. Por favor tente novamente.");
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity
      //const newPathname = pathname.split("/").slice(0, -1).join("/");
      //router.push(newPathname);

      router.refresh();

      return toastSuc("Your post has been published.");
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    //@ts-ignore
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
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
        holder: "editor",
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
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toastError(value);
      }
    }
  }, [errors]);

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

  const onSubmit = async (value: FieldValues) => {
    const blocks = await ref.current?.save();

    const payload: FieldValues = {
      title: value.title,
      content: blocks,
    };

    createPost(payload);
  };

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register<any>("title");

  return (
    <div className="w-auto p-16 bg-zinc-50 rounded-lg border border-zinc-200 flex justify-center">
      <form
        id="subreddit-post-form"
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose w-full">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none text-black"
          />
          <div id="editor" className=" text-black" />

          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border px-1 text-xs uppercase text-gray-500">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
        <button type="submit">Enviar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Editor;
