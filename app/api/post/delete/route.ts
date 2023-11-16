import { getCurrentUser } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";
import { storage } from "@/lib/firebase";
import { ref, deleteObject } from "firebase/storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { postId } = body;

    const session = await getCurrentUser();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { content }: any = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    for (let i = 0; i < content.blocks.length; i++) {
      if (
        content.blocks[i].type == "image" ||
        content.blocks[i].type == "attaches"
      ) {
        const url = content.blocks[i].data.file.url;
        const storageRef = ref(storage, url);

        deleteObject(storageRef)
          .then(() => {
            console.log("Arquivo deletada com sucesso");
          })
          .catch((error) => {
            console.log("Erro ao deletar arquivo: ", error);
          });
      }
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log(error);
    return new Response("Could not post to subreddit.", { status: 500 });
  }
}
