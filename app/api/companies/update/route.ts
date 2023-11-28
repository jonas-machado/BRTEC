import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, company, link } = body;

  const user = await prisma.neutralNetwork.update({
    where: {
      id,
    },
    data: {
      company,
      link,
    },
  });

  return NextResponse.json(user);
}
