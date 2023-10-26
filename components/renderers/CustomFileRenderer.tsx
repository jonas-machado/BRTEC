"use client";

function CustomFileRenderer({ data }: any) {
  console.log(data);
  return (
    <div className="bg-gray-800 rounded-md p-4 m-4">
      <a href={data.file.url} className="text-gray-100 text-sm xml">
        {data.title}
      </a>
    </div>
  );
}

export default CustomFileRenderer;
