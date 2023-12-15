"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PageWrapper({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) {
  return (
    <>
      <AnimatePresence mode="wait">
        <div className={classname + " h-full w-full"}>{children}</div>
      </AnimatePresence>
    </>
  );
}
