"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

export default function FadeIn({ children, delay }) {
  const ref = useRef(null);
  const isInview = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInview) {
      controls.start("visible");
    }
  }, [isInview]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{
        duration: 0.2,
        damping: 8,
        delay: delay,
        stiffness: 100,
      }}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
