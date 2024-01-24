"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function MotionDelay({
  id,
  className,
  children,
  index,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  index: number;
}) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={id}
        className={className}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          delay: index * 0.25,
          ease: "easeInOut",
          duration: 0.3,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
