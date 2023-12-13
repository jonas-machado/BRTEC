import prisma from "@/lib/prismadb";

const getUsers = async () => {
  return await prisma.user.findMany({ include: { configured: true } });
};

export default getUsers;
