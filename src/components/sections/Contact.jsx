import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const Contact = () => (
  <AnimatedSection id="contact" className="bg-dark text-light">
    <div className="container mx-auto px-6 md:px-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Have a project?</h2>
        <motion.a 
            href="mailto:hello@digiency.com"
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tighter inline-block text-primary"
            whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            Let's Talk.
        </motion.a>
    </div>
  </AnimatedSection>
);

export default Contact;