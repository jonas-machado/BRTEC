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
        <div className={classname}>{children}</div>
      </AnimatePresence>
    </>
  );
}
