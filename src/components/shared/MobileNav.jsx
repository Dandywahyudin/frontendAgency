// src/components/shared/MobileNav.jsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const MobileNav = ({ links, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden absolute top-full left-0 w-full bg-brand-dark shadow-lg"
    >
      <div className="flex flex-col items-center space-y-4 p-6">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={onClose}
            className="text-white text-lg hover:text-brand-primary transition-colors duration-300"
          >
            {link.name}
          </a>
        ))}
        <Button className="mt-4 w-full">Get Started</Button>
      </div>
    </motion.div>
  );
};

export default MobileNav;