import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { company, link } = body;

  const user = await prisma.neutralNetwork.create({
    data: {
      company,
      link,
    },
  });

  return NextResponse.json(user);
}
