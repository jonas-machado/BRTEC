import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;

  const deletedItem = await prisma.firmware.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(deletedItem);
}
