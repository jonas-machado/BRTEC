"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  console.log(data);
  return (
    <div className="relative w-full min-h-[15rem] h-auto my-4">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}

export default CustomImageRenderer;
