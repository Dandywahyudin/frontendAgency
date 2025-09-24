import { AnimatedSection } from "../shared/AnimatedSection";
import { THEME } from "@/config/theme";
import { motion } from "framer-motion";

const Services = () => {
    const servicesData = [
        { title: "01. Web Development", description: "Crafting blazing-fast, beautiful, and scalable websites that stand out in the digital landscape. From corporate sites to complex web applications." },
        { title: "02. Branding & Identity", description: "Building unforgettable brands from the ground up. We create visual identities that tell a story, resonate with audiences, and stand the test of time." },
        { title: "03. UI/UX & Product Design", description: "Designing intuitive and engaging digital products. Our user-centric approach ensures a seamless experience that users love and return to." },
        { title: "04. Digital Marketing", description: "Driving targeted traffic and measurable results. We use data-driven strategies across SEO, SEM, and social media to grow your online presence." },
    ];
    return (
        <AnimatedSection id="services" className={`bg-[${THEME.colors.light}]`}>
            <div className="container mx-auto px-6 md:px-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16">What We Do</h2>
                <div className="border-t border-neutral-300">
                    {servicesData.map((service, index) => (
                        <div key={index} className="group border-b border-neutral-300 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300 hover:bg-white">
                            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight w-full md:w-1/2 mb-4 md:mb-0">{service.title}</h3>
                            <p className="text-md md:text-lg text-neutral-500 w-full md:w-1/2 max-w-lg">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default Services;