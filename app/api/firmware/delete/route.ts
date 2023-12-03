import { storage } from "@/lib/firebase";
import prisma from "@/lib/prismadb";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, link } = body;

  const storageRef = ref(storage, link);

  deleteObject(storageRef)
    .then(() => {
      console.log("Imagem deletada com sucesso");
    })
    .catch((error) => {
      console.log("Erro ao deletar imagem: ", error);
    });

  const deletedItem = await prisma.firmware.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(deletedItem);
}
