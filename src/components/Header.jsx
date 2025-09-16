import React from 'react';
import '../style/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Agency</div>
      <nav>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;