import prisma from "@/lib/prismadb";

const getUsers = async () => {
  return await prisma.user.findMany();
};

export default getUsers;
