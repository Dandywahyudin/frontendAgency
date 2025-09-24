import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedSection = ({ children, id, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section id={id} ref={ref} className={`py-24 md:py-32 ${className} relative overflow-hidden`}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
        transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
      >{children}</motion.div>
    </section>
  );
};

export { AnimatedSection };