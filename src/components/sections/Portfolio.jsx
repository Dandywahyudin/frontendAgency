// src/components/sections/Portfolio.jsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AnimatedSection } from "../shared/AnimatedSection";
import { THEME } from "@/config/theme";
import img1 from "../../assets/company.jpg";
import img2 from "../../assets/mobileapp.jpg";
import img3 from "../../assets/saas.jpg";
import img4 from "../../assets/webapp.jpg";

const Portfolio = () => {
    const portfolioItems = [
        { img: img1, title: "Corporate Rebrand", cat: "Branding", year: "2025" },
        { img: img4, title: "Web App", cat: "Development", year: "2025" },
        { img: img2, title: "Mobile App UI", cat: "UI/UX", year: "2024" },
        { img: img3, title: "SaaS Dashboard", cat: "Development", year: "2024" },
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
                                    src={item.img} 
                                    alt={item.title} 
                                    className="w-full h-64 md:h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-xl"
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