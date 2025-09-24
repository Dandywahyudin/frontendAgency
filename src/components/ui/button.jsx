import React from "react";
import { THEME } from "../../config/theme";


const Button = ({ children, variant, size, className, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: `bg-[${THEME.colors.primary}] text-black hover:bg-[${THEME.colors.primaryHover}] transform hover:scale-105`,
    outline: `border-2 border-[${THEME.colors.light}] bg-transparent text-[${THEME.colors.light}] hover:bg-[${THEME.colors.light}] hover:text-black`,
  };
  const sizes = {
    default: "h-11 px-6",
    lg: "h-14 px-10 text-base",
  };
  return <button className={`${baseStyle} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>{children}</button>;
};

export { Button };