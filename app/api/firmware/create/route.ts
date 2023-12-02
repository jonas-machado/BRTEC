import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { company, model, link, version } = body;

  const user = await prisma.firmware.create({
    data: {
      company,
      model,
      link,
      version,
    },
  });

  return NextResponse.json(user);
}
