import React from "react";
import { THEME } from "../../config/theme";

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: `
      bg-black text-white 
      hover:bg-white hover:text-black 
      border border-black
      shadow-md hover:shadow-lg 
      transform hover:-translate-y-0.5
    `,
    outline: `
      border border-black bg-transparent text-black 
      hover:bg-black hover:text-white 
      shadow-sm hover:shadow-md 
      transform hover:-translate-y-0.5
    `,
  };

  const sizes = {
    default: "h-11 px-6 text-sm",
    lg: "h-14 px-10 text-base",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
      {icon}
    </span>
    <input
      className="w-full h-12 pl-10 pr-3 bg-white border border-neutral-300 rounded-full text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
      {...props}
    />
  </div>
);

export { Button, Input };
