// src/components/shared/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Token invalid:", err);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    setIsMenuOpen(false);
  };

  const navLinks = ["Services", "About", "Portfolio", "Pricing", "Contact"];
  const textShadowStyle = "[text-shadow:0_1px_3px_rgba(0,0,0,0.4)]";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? `bg-dark/80 backdrop-blur-lg shadow-sm` : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-20 py-5 flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavigation(e, "/")}
            className={`text-3xl font-bold tracking-tighter transition-colors text-black ${
              !isScrolled ? textShadowStyle : ""
            }`}
          >
            Digiency.
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) =>
                  handleSmoothScroll(e, `#${link.toLowerCase()}`)
                }
                className={`font-medium hover:text-primary transition-colors text-black ${
                  !isScrolled ? textShadowStyle : ""
                }`}
              >
                {link}
              </a>
            ))}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-black">{user.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-red-600 px-4 py-2 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={(e) => handleNavigation(e, "/register")}>
                Get Started
              </Button>
            )}
          </div>

          {/* Toggle Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden z-50 transition-colors ${
              isMenuOpen
                ? "text-black"
                : `text-black ${!isScrolled ? textShadowStyle : ""}`
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-30 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-10">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) =>
                    handleSmoothScroll(e, `#${link.toLowerCase()}`)
                  }
                  className="text-4xl font-bold text-black tracking-tighter"
                >
                  {link}
                </a>
              ))}

              {user ? (
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-2xl font-bold text-black">
                    {user.name}
                  </span>
                  <Button size="lg" variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  size="lg"
                  onClick={(e) => handleNavigation(e, "/register")}
                >
                  Get Started
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
