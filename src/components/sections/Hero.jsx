import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import myVideo from "@/assets/gift.mp4";

const Hero = () => {
    const headline = "We Build Creative Digital Solutions";
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
    };
    const letterVariants = {
        hidden: { opacity: 0, y: '100%' },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] } }
    };
    return (
        <section id="home" className="relative h-screen bg-dark text-light flex items-center overflow-hidden">
             <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary via-transparent to-transparent animate-aurora-1"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary via-transparent to-transparent animate-aurora-2"></div>
             </div>
            <div className="container mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center z-10">
                <div className="text-center md:text-left">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-tighter"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {headline.split("").map((letter, index) => (
                            <span className="inline-block overflow-hidden" key={index}>
                                <motion.span variants={letterVariants} className="inline-block">
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h1>
                    <motion.p
                        className="text-lg text-muted mt-8 max-w-xl mx-auto md:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        We are a digital agency that believes in the power of bold ideas, meticulous execution, and limitless creativity.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.8 }}
                      className="mt-10"
                    >
                      <Button size="lg" variant="outline">Explore Our Work</Button>
                    </motion.div>
                </div>
                <div className="relative h-full w-full hidden md:flex justify-center items-center">
                     <motion.div
                        className="relative w-[500px] h-[700px]"
                        style={{
                          clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)",
                        }}
                        initial={{ clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)" }}
                        animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)" }}
                        transition={{
                          duration: 1.5,
                          ease: [0.6, 0.01, 0.05, 0.95],
                          delay: 1,
                        }}
                      >
                        <video
                          className="absolute top-0 left-0 w-full h-full object-center object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={myVideo} type="video/mp4" />
                        </video>
                      </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;