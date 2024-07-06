import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import image1 from './Image/image1.jpg';
import image2 from './Image/image2.jpg';

import logo from './Image/logo.png'; // Import the logo image

const Home = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [image1, image2];

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toDateString());

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(slideInterval);
  }, [images.length]);

  return (
    <div className="home-container">
      <header className="header">
        <img src={logo} alt="Title Logo" className="title-image" />
        <div className="date">{currentDate}</div>
        <div className="header-buttons">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            onClick={() => window.location.href = '/products'}
          >
            <img src={image} alt={`Watch ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="info-box">
        <div className="info-item">Delivery in 24 hours</div>
        <div className="info-item">No cost EMI above 7k</div>
        <div className="info-item">Get Rs. 500 off on prepaid order above 3k using Simple</div>
        <div className="info-item">10% off on 1st purchase Use- WELCOME10</div>
      </div>
    </div>
  );
};


export default Home;
