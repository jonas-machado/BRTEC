"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { storage } from "@/lib/firebase";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import type EditorJS from "@editorjs/editorjs";

interface EditorOutput {
  content: any;
  index: number;
}

const EditorOutput = ({ content, index }: EditorOutput) => {
  console.log(content);
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
        readOnly: true,
        holder: `editor${index}`,
        onReady() {
          console.log("Editor.js is ready to work!");
          console.log(content.blocks);
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
        data: { blocks: content.blocks },
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
              withBackground: true,
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
      <div className="p-8 pb-0 bg-gray-950 bg-opacity-0 rounded-lg flex justify-center">
        <div className="prose prose-invert w-full">
          <div
            id={`editor${index}`}
            className="text-gray-300 bg-black bg-opacity-0 caret-gray-300"
          />
        </div>
      </div>
    </>
  );
};

export default EditorOutput;
