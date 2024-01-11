"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function MotionComponent({
  id,
  className,
  children,
  style,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  style: any;
}) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={id}
        className={className}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        style={style}
      >
        {children}
      </motion.div>
    </>
  );
}
