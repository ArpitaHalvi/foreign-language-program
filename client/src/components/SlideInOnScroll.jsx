/* eslint-disable react/prop-types */
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export const SlideInOnScroll = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{
        y: springY,
        opacity: springOpacity,
      }}
    >
      {children}
    </motion.div>
  );
};
