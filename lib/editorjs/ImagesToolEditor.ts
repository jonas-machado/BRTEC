import ImageTool from "@editorjs/image";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export class MyImageTool extends ImageTool {
  removed() {
    const data = this._data.file.url;
    console.log("Bloco antes de deletar: ", data);

    if (data.includes("firebasestorage.googleapis.com")) {
      const storageRef = ref(storage, data);

      deleteObject(storageRef)
        .then(() => {
          console.log("Imagem deletada com sucesso");
        })
        .catch((error) => {
          console.log("Erro ao deletar imagem: ", error);
        });
    }
  }
}
