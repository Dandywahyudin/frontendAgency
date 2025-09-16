import React from 'react';
import '../style/Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Creative Digital Agency</h1>
        <p>We build beautiful and effective websites.</p>
        <a href="#contact" className="cta-button">Get in Touch</a>
      </div>
    </section>
  );
};

export default Hero;