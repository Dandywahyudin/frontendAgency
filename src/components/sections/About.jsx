import { motion } from "framer-motion";
import { AnimatedSection } from "../shared/AnimatedSection";
import { THEME } from "@/config/theme";

const About = () => (
    <AnimatedSection id="about" className={`bg-[${THEME.colors.dark}] text-[${THEME.colors.light}]`}>
        <div className="container mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Ideas into Reality.</h2>
                <div className="space-y-6 text-lg text-neutral-400">
                    <p>We are a passionate team of designers, developers, and strategists. We believe that great design is not just about aesthetics, but about creating meaningful connections and solving complex problems.</p>
                    <p>Our process is collaborative and transparent, ensuring that we are aligned with your vision every step of the way. We are not just your agency; we are your creative partner.</p>
                </div>
            </div>
            <div className="relative h-96 w-full">
                 <motion.div 
                    className="absolute w-full h-full bg-cover bg-center"
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                        clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
                    }}
                    initial={{ clipPath: 'polygon(25% 50%, 75% 50%, 75% 50%, 25% 50%)' }}
                    whileInView={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    viewport={{ once: true, amount: 0.5 }}
                />
            </div>
        </div>
    </AnimatedSection>
);

export default About;