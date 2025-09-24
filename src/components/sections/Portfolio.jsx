// src/components/sections/Portfolio.jsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AnimatedSection } from "../shared/AnimatedSection";
import { THEME } from "@/config/theme";

const Portfolio = () => {
    const portfolioItems = [
        { img: "https://images.unsplash.com/photo-1554941426-e9602e3db784?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Corporate Rebrand", cat: "Branding", year: "2025" },
        { img: "https://images.unsplash.com/photo-1560421683-6223b44b5242?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "E-commerce Platform", cat: "Development", year: "2025" },
        { img: "https://images.unsplash.com/photo-1558369178-6556d958564b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Mobile App UI", cat: "UI/UX", year: "2024" },
        { img: "https://images.unsplash.com/photo-1600861164333-26a8f75d3b3c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "SaaS Dashboard", cat: "Development", year: "2024" },
    ];
    return (
        <AnimatedSection id="portfolio" className={`bg-[${THEME.colors.light}]`}>
            <div className="container mx-auto px-6 md:px-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">Selected Works</h2>
                <div className="grid md:grid-cols-2 gap-10">
                    {portfolioItems.map((item) => (
                        <motion.div key={item.title} className="group cursor-pointer">
                            <div className="overflow-hidden">
                                <motion.img 
                                    src={item.img} alt={item.title} 
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                                <p className="text-neutral-500">{item.cat} / {item.year}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default Portfolio;