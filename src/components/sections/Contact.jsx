import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { useState } from "react";
import { THEME } from "@/config/theme";

const AnimatedTextLink = ({ children, href }) => {
    const [isHovered, setIsHovered] = useState(false);
    const text = children.split("");

    return (
        <motion.a 
            href={href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tighter inline-block text-primary"
        >
            {text.map((char, index) => (
                <motion.span 
                    key={index} 
                    className="inline-block"
                    animate={{ y: isHovered ? [0, -10, 0] : 0, color: isHovered ? ['#4338ca', '#6366f1', '#4338ca'] : '#4338ca' }}
                    transition={{ duration: 0.5, delay: index * 0.03, repeat: isHovered ? Infinity : 0 }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.a>
    )
}

const Contact = () => (
  <AnimatedSection id="contact" className="bg-dark text-light">
    <div className="container mx-auto px-6 md:px-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Have a project?</h2>
        <AnimatedTextLink href="mailto:hello@digiency.com">
            Let's Talk.
        </AnimatedTextLink>
    </div>
  </AnimatedSection>
);
export default Contact;