import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;
  console.log(id);

  const deletedItem = await prisma.monitoring
    .delete({
      where: {
        id,
      },
    })
    .catch((err) => {
      console.log(err.code);
      if (err.code == "P2025") {
        return { error: "Item já excluído" };
      }
    });

  console.log(deletedItem);

  return NextResponse.json(deletedItem);
}
