import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    id,
    text,
    isUp,
    dateDown,
    bases,
    tecnology,
  }: {
    id: string;
    text?: string;
    isUp?: boolean;
    dateDown?: Date;
    bases?: string[];
    tecnology: string;
  } = body;

  const updateData: any = {};

  // Include only defined fields in the updateData object:
  if (isUp !== undefined) {
    updateData.isUp = isUp;
  }
  if (dateDown !== undefined) {
    updateData.dateDown = dateDown;
  }
  if (bases !== undefined) {
    updateData.bases = bases;
  }
  if (text !== undefined) {
    updateData.text = text;
  }
  if (tecnology !== undefined) {
    updateData.tecnology = tecnology;
  }
  const monitoring = await prisma.monitoring
    .update({
      where: {
        id,
      },
      data: updateData,
    })
    .then((res) => {
      return res;
    })
    .catch((err: any) => console.log(err));

  return NextResponse.json(monitoring);
}
