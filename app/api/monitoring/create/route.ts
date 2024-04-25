import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const {
    text,
    isUp,
    dateDown,
    bases,
    tecnology,
  }: {
    text: string;
    isUp: boolean;
    dateDown: Date;
    bases: string[];
    tecnology: string;
  } = body;

  // Include only defined fields in the updateData object:

  const monitoring = await prisma.monitoring.create({
    data: {
      text,
      isUp,
      dateDown,
      bases,
      tecnology,
    },
  });
  console.log(monitoring);
  return NextResponse.json(monitoring);
}
