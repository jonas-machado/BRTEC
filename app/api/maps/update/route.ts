import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, title, link } = body;

  const user = await prisma.maps.update({
    where: {
      id,
    },
    data: {
      name: title,
      link,
    },
  });

  return NextResponse.json(user);
}
