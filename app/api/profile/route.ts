import bcrypt from "bcrypt";
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, name, email, password, image, backgroundImage } = body;
  console.log(body);

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      hashedPassword,
      image,
      backgroundImage,
    },
  });

  return NextResponse.json(user);
}
