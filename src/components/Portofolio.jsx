import React from 'react';
import '../style/Portfolio.css';

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio">
      <h2>Our Portfolio</h2>
      <div className="portfolio-grid">
        <div className="portfolio-item">
          <img src="https://picsum.photos/400/300?random=1" alt="Project 1" />
        </div>
        <div className="portfolio-item">
          <img src="https://picsum.photos/400/300?random=2" alt="Project 2" />
        </div>
        <div className="portfolio-item">
          <img src="https://picsum.photos/400/300?random=3" alt="Project 3" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;