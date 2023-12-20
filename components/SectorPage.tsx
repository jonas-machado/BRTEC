import { getCurrentUser } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

interface Sector {
  sector: string;
  children: React.ReactNode;
}

export default async function SectorPage({ sector, children }: Sector) {
  const user = await getCurrentUser();
  console.log(user?.user.sector);
  return (
    <>
      {user?.user.sector == sector ? (
        children
      ) : (
        <>
          <div className="bg-black bg-opacity-60 backdrop-blur-md m-4 w-full h-[95%] flex justify-center items-center rounded-md flex-col">
            <Image
              width={500}
              height={500}
              className=""
              alt="game over"
              src={`/images/gameover.gif`}
            />
          </div>
        </>
      )}
    </>
  );
}
