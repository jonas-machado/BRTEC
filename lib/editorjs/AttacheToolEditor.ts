//@ts-ignore
import AttachesTool from "@editorjs/attaches";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export class MyAttacheTool extends AttachesTool {
  removed() {
    const data = this._data.file.url;
    console.log("Bloco antes de deletar: ", data);

    if (data.includes("firebasestorage.googleapis.com")) {
      const storageRef = ref(storage, data);

      deleteObject(storageRef)
        .then(() => {
          console.log("Arquivo deletada com sucesso");
        })
        .catch((error) => {
          console.log("Erro ao deletar arquivo: ", error);
        });
    }
  }
}
