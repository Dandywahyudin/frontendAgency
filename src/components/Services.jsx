import React from 'react';
import '../style/Services.css';

const Services = () => {
  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="service-cards">
        <div className="card">
          <h3>Web Development</h3>
          <p>We build responsive and optimized websites using the latest technologies.</p>
        </div>
        <div className="card">
          <h3>UI/UX Design</h3>
          <p>We design intuitive and user-friendly interfaces for your web applications.</p>
        </div>
        <div className="card">
          <h3>Branding</h3>
          <p>We help you create a strong brand identity that resonates with your audience.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;