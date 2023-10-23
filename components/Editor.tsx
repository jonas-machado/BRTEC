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

const Editor = ({ currentUserId }: { currentUserId: string | undefined }) => {
  console.log(currentUserId);
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
    mutationFn: async ({ title, content, authorId }: FieldValues) => {
      const payload = { title, content, authorId };
      const { data } = await axios.post("/api/post/create", payload);
      return data;
    },
    onError: () => {
      return toastError("Your post was not published. Please try again.");
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
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          console.log("Editor.js is ready to work!");
          ref.current = editor;
        },
        placeholder: "Digite aqui para escrever sua postagem...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
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
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
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

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 1000);
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
      authorId: currentUserId,
    };

    createPost(payload);
  };

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register<any>("title");

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form
        id="subreddit-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px] w-11/12" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border px-1 text-xs uppercase">Tab</kbd>{" "}
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
