import Link from "next/link";
import React, { useState } from "react";

interface tabHead {
  children: React.ReactNode;
  onClick?: any;
  className?: any;
  state?: string;
  id: string;
  href: string;
}

const TabHeadLink = ({
  onClick,
  children,
  className,
  state,
  id,
  href,
}: tabHead) => {
  return (
    <>
      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <Link
          className={`transition-all cursor-pointer text-xs flex items-center justify-center font-bold rounded-md uppercase px-5 py-3 shadow-lg text-gray-200 hover:bg-gray-900 ${
            state == id
              ? "text-gray-300 rounded-md shadow-lg shadow-black bg-gray-800 bg-opacity-90"
              : "text-gray-200"
          } ${className}`}
          onClick={onClick}
          id={id}
          data-toggle="tab"
          role="tablist"
          href={href}
        >
          {children}
        </Link>
      </li>
    </>
  );
};

export default TabHeadLink;
