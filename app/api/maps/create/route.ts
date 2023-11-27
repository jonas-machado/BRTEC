import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, link } = body;

  const user = await prisma.maps.create({
    data: {
      name: title,
      link,
    },
  });

  return NextResponse.json(user);
}
