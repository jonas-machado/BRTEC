import bcrypt from "bcrypt";
import prisma from "../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();

  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser?.user.id,
    },
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(updatedUser);
}
