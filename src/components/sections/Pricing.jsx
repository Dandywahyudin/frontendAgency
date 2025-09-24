import { motion } from "framer-motion";
import { AnimatedSection } from "../shared/AnimatedSection";
import { THEME } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
    const packages = [
        {
            name: "Starter",
            price: "$499",
            description: "For small businesses and startups.",
            features: [
                "Custom Landing Page",
                "Basic SEO Setup",
                "Contact Form Integration",
                "Mobile Responsive Design",
            ],
            popular: false,
        },
        {
            name: "Pro",
            price: "$1,299",
            description: "For growing businesses needing more features.",
            features: [
                "Up to 5 Pages Website",
                "Advanced SEO & Analytics",
                "CMS Integration (WordPress/Contentful)",
                "Social Media Integration",
                "Priority Support",
            ],
            popular: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For large-scale projects and custom solutions.",
            features: [
                "Unlimited Pages & Features",
                "E-commerce Functionality",
                "Dedicated Project Manager",
                "API Integrations",
                "Ongoing Maintenance & Support",
            ],
            popular: false,
        }
    ];

    return (
        <AnimatedSection id="pricing" className={`bg-[${THEME.colors.dark}] text-[${THEME.colors.light}]`}>
            <div className="container mx-auto px-6 md:px-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16">Flexible Pricing for Every Need</h2>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            className={`relative border p-8 h-full flex flex-col ${pkg.popular ? `border-[${THEME.colors.primary}]` : 'border-neutral-700'}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            {pkg.popular && (
                                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-[${THEME.colors.primary}] text-black px-4 py-1 text-sm font-bold tracking-wider`}>
                                    MOST POPULAR
                                </div>
                            )}
                            <h3 className="text-2xl font-semibold tracking-tight">{pkg.name}</h3>
                            <p className="text-neutral-400 mt-2 mb-6">{pkg.description}</p>
                            <p className="text-5xl font-bold my-4">{pkg.price}</p>
                            <ul className="space-y-4 my-8 flex-grow">
                                {pkg.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center">
                                        <Check className={`w-5 h-5 mr-3 text-[${THEME.colors.primary}]`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button variant={pkg.popular ? 'default' : 'outline'} className="w-full mt-auto">
                                Choose Plan
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
export default Pricing;