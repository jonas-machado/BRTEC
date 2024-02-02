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
  style?: any;
}) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={id}
        className={className}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        style={style}
      >
        {children}
      </motion.div>
    </>
  );
}
