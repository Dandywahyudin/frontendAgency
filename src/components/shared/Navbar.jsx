// src/components/shared/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate(); // ✅ gunakan react-router-dom

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // pindah ke halaman lain (misalnya home, register, dll.)
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path); // ✅ langsung pakai navigate
    setIsMenuOpen(false);
  };

  // scroll ke section dalam halaman home
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    navigate('/'); // pastikan dulu pindah ke home
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  const navLinks = ["Services", "About", "Portfolio", "Pricing", "Contact"];
  const textShadowStyle = "[text-shadow:0_1px_3px_rgba(0,0,0,0.4)]";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? `bg-dark/80 backdrop-blur-lg shadow-sm` : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-20 py-5 flex justify-between items-center">
          <a 
            href="/" 
            onClick={(e) => handleNavigation(e, '/')}
            className={`text-3xl font-bold tracking-tighter transition-colors text-black ${
              !isScrolled ? textShadowStyle : ''
            }`}
          >
            Digiency.
          </a>

          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase()}`)}
                className={`font-medium hover:text-primary transition-colors text-black ${
                  !isScrolled ? textShadowStyle : ''
                }`}
              >
                {link}
              </a>
            ))}
            {/* ✅ langsung ke halaman /register */}
            <Button onClick={(e) => handleNavigation(e, '/register')}>Get Started</Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden z-50 transition-colors ${
              isMenuOpen ? 'text-black' : `text-black ${!isScrolled ? textShadowStyle : ''}`
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-30 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-10">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase()}`)}
                  className="text-4xl font-bold text-black tracking-tighter"
                >
                  {link}
                </a>
              ))}
              {/* ✅ mobile menu juga pakai navigate */}
              <Button size="lg" onClick={(e) => handleNavigation(e, '/register')}>
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
