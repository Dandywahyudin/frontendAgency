// src/App.jsx
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import HomePage from "./pages/HomePage";
import { THEME } from "@/config/theme";
import { FONT_FAMILY } from "@/config/theme";
import ScrollProgressBar from "./components/shared/ScrollProgressBar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

function App() {
  return (
    <div className="bg-dark" style={{ fontFamily: FONT_FAMILY }}>
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
export default App;