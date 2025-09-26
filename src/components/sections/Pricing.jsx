import { motion } from "framer-motion";
import { AnimatedSection } from "../shared/AnimatedSection";
import { THEME } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { getPackages, backendUrl } from "@/services/api";

const Pricing = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await getPackages();
        const pkgs = res?.data?.packages ?? res?.data?.data?.packages ?? [];
        setPackages(pkgs);
      } catch (err) {
        console.error("Gagal memuat packages:", err);
      }
    };
    loadPackages();
  }, []);

  return (
    <AnimatedSection id="pricing" className={`bg-[${THEME.colors.dark}] text-[${THEME.colors.light}]`}>
      <div className="container mx-auto px-6 md:px-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16">
          Flexible Pricing for Every Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {packages.slice(0, 3).map((pkg, index) => (
            <motion.div
              key={pkg.id ?? index}
              className={`relative border p-8 h-full flex flex-col ${
                pkg.popular ? `border-[${THEME.colors.primary}]` : "border-neutral-700"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {pkg.popular && (
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-[${THEME.colors.primary}] text-black px-4 py-1 text-sm font-bold tracking-wider`}
                >
                  MOST POPULAR
                </div>
              )}

              {/* Gambar package */}
              {pkg.image && (
                <img
                  src={`${backendUrl}${pkg.image}`}
                  alt={pkg.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}

              <h3 className="text-2xl font-semibold tracking-tight">{pkg.name}</h3>
              <p className="text-neutral-400 mt-2 mb-6">{pkg.description}</p>
              <p className="text-5xl font-bold my-4">Rp {Number(pkg.price ?? "Custom").toLocaleString("id-ID")}</p>

              <ul className="space-y-4 my-8 flex-grow">
                {Array.isArray(pkg.features) &&
                  pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 text-[${THEME.colors.primary}]`} />
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>

              <Button variant={pkg.popular ? "default" : "outline"} className="w-full mt-auto">
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
