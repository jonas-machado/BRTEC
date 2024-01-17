import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Admin {
  children: React.ReactNode;
}

export default async function AdminPage({ children }: Admin) {
  const user = await getCurrentUser();
  return (
    <>
      {user?.user.role == "ADMIN" ? (
        children
      ) : (
        <>
          <div className="bg-black bg-opacity-60 backdrop-blur-md m-4 w-full h-[95%] flex justify-center items-center rounded-md flex-col">
            <Image
              width={500}
              height={500}
              className=""
              alt="game over"
              src={`/images/gameOver.gif`}
            />
          </div>
        </>
      )}
    </>
  );
}
