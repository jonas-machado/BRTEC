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
import { useRouter } from "next/navigation";

import type EditorJS from "@editorjs/editorjs";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { sectorArray } from "@/constants/sectorArray";
import ControlledCheckbox from "./inputs/controlledCheckbox";
import useEditorModal from "@/lib/zustand/useEditorModal";
import { MyImageTool } from "@/lib/editorjs/ImagesToolEditor";
import { MyAttacheTool } from "@/lib/editorjs/AttacheToolEditor";

interface postProps {
  postId?: any;
  postContent?: any;
  postTitle?: string;
}

const Editor = ({ postId, postContent, postTitle }: postProps) => {
  const isOpen = useEditorModal((state) => state.isOpen);
  const onOpen: () => void = useEditorModal((state) => state.onOpen);
  const onClose: () => void = useEditorModal((state) => state.onClose);
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
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
    mutationFn: async ({ title, content, sector }: FieldValues) => {
      const payload = { title, content, sector };
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
      onClose();
      return toastSuc("Seu post foi publicado.");
    },
  });

  const { mutate: updatePost } = useMutation({
    mutationFn: async ({ title, content, sector }: FieldValues) => {
      const payload = { title, content, sector, postId };
      const { data } = await axios.post("/api/post/update", payload);
      return data;
    },
    onError: () => {
      return toastError("O post não foi Editado. Por favor tente novamente.");
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity
      //const newPathname = pathname.split("/").slice(0, -1).join("/");
      //router.push(newPathname);

      router.refresh();
      onClose();

      return toastSuc("Seu post foi editado.");
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async (postId: number) => {
      const payload = { postId };
      const { data } = await axios.post("/api/post/delete", payload);
      return data;
    },
    onError: () => {
      return toastError("O post não foi deletado. Por favor tente novamente.");
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity
      //const newPathname = pathname.split("/").slice(0, -1).join("/");
      //router.push(newPathname);

      router.refresh();
      onClose();

      return toastSuc("Post deletado com sucesso.");
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
    //@ts-ignore
    const Marker = (await import("@editorjs/marker")).default;
    //@ts-ignore
    const Underline = (await import("@editorjs/underline")).default;
    //@ts-ignore
    const Hyperlink = (await import("editorjs-hyperlink")).default;
    //@ts-ignore
    const Paragraph = (await import("@editorjs/paragraph")).default;

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
        data: { blocks: postContent?.blocks },
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
            class: MyImageTool as any,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const imageRef = refStorage(
                    storage,
                    `posts/images/${v4() + file.name}`
                  );

                  const upload = await uploadBytes(imageRef, file).then(() => {
                    console.log("image uploaded");
                  });
                  const url = await getDownloadURL(imageRef);
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
            class: MyAttacheTool as any,
            config: {
              uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                async uploadByFile(file: File) {
                  const fileRef = refStorage(
                    storage,
                    `posts/files/${v4() + file.name}`
                  );

                  await uploadBytes(fileRef, file).then(() => {
                    console.log("file uploaded");
                  });
                  const url = await getDownloadURL(fileRef);

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
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            config: {
              preserveBlank: true,
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
      editor.isReady.catch((reason) => {
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
      sector: value.sector,
    };
    if (postId) {
      return updatePost(payload);
    }
    createPost(payload);
  };

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register<any>("title");

  return (
    <div className="p-16 pb-0 pt-0 bg-gray-950 bg-opacity-0 rounded-lg flex justify-center max-w-[50rem] w-[50rem]">
      <form
        id="subreddit-post-form"
        className="w-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="py-10">
          <ControlledCheckbox
            register={register}
            name="sector"
            array={sectorArray}
            direction="row"
          />
        </div>
        <div className="prose prose-invert w-full">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            defaultValue={postTitle}
            className="w-full caret-gray-300 text-gray-300 resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div
            id="editor"
            className=" text-gray-300 bg-black bg-opacity-0 caret-gray-300"
          />

          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md font-bold px-1 text-sm bg-gray-900 uppercase text-gray-500">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
        <div className="flex justify-end mt-6 mb-4 gap-4">
          {postId && (
            <button
              className="text-white bg-gray-800 rounded-md px-4 p-2"
              type="button"
              onClick={() => deletePost(postId)}
            >
              Excluir
            </button>
          )}
          <button
            className="text-white bg-purple-600 px-4 p-2 rounded-md"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
