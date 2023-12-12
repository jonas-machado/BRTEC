import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getCurrentUser();

  const body = await request.json();
  const {
    customVlan,
    onuType,
    serial,
    olt,
    pon,
    idLivre,
    idOnu,
    cliente,
    id,
    script,
  } = body;

  const onu = await prisma.configured.upsert({
    where: {
      serial,
    },
    update: {
      onuType,
      olt: { connect: { ip: olt } },
      pon,
      idLivre,
      idOnu,
      customVlan,
      cliente,
      script,
      user: {
        connect: {
          id: session?.user.id,
        },
      },
    },
    create: {
      serial,
      onuType,
      olt: { connect: { ip: olt } },
      pon,
      idLivre,
      idOnu,
      cliente,
      script,
      user: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  });
  return NextResponse.json({ msg: "Cadastrado com sucesso" });
}
