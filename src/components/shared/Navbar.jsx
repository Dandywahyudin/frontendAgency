// src/components/shared/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import MobileNav from './MobileNav';
import { AnimatePresence } from 'framer-motion';
import { THEME } from '../../config/theme';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const navLinks = ["Home", "Services", "About", "Portfolio", "Pricing", "Contact"];
  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? `bg-[${THEME.colors.light}]/80 backdrop-blur-lg shadow-sm` : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 md:px-20 py-5 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className={`text-3xl font-bold tracking-tighter transition-colors ${isScrolled ? `text-[${THEME.colors.dark}]` : 'text-white'}`}>Digiency.</a>
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase()}`)} className={`font-medium hover:text-[${THEME.colors.primary}] transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>
                {link}
              </a>
            ))}
            <Button>Get Started</Button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden z-50 ${isMenuOpen ? 'text-black' : (isScrolled ? 'text-black' : 'text-white')}`}>
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
                <a key={link} href={`#${link.toLowerCase()}`} onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase()}`)} className="text-4xl font-bold text-black tracking-tighter">
                  {link}
                </a>
              ))}
              <Button size="lg">Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default Navbar;
