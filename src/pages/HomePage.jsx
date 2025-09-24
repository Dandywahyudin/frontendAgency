// src/pages/HomePage.jsx
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
// Import About dan Blog jika sudah dibuat

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <About /> */}
      <Services />
      <Portfolio />
      <Testimonials />
      {/* <Blog /> */}
      <Contact />
    </>
  );
};

export default HomePage;