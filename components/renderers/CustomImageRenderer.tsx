"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  console.log(data);
  return (
    <div className="w-full min-h-[15rem] h-auto">
      <Image
        alt="image"
        className="object-contain"
        width={400}
        height={400}
        src={src}
      />
    </div>
  );
}

export default CustomImageRenderer;
