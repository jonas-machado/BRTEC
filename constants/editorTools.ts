import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Image from "@editorjs/image";
//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore

import AttachesTool from "@editorjs/attaches";
//@ts-ignore

import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
//@ts-ignore

import Hyperlink from "editorjs-hyperlink";

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  code: Code,
  image: Image,
  attaches: AttachesTool,
  header: Header,
  inlineCode: InlineCode,
  hyperlink: Hyperlink,
};
