import { Twitter, Linkedin, Github } from 'lucide-react';
import { THEME } from '@/config/theme';

const Footer = () => (
  <footer className="bg-light text-black">
    <div className="container mx-auto px-6 md:px-20 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="font-semibold tracking-tighter text-lg">Digiency. &copy; {new Date().getFullYear()}</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-neutral-500 hover:text-black transition-colors"><Twitter /></a>
          <a href="#" className="text-neutral-500 hover:text-black transition-colors"><Linkedin /></a>
          <a href="#" className="text-neutral-500 hover:text-black transition-colors"><Github /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;