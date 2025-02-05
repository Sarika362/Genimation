import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import "./carousel.css";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const [startPosition, setStartPosition] = useState(0); // Starting point of drag
  const carouselRef = useRef(null); // Reference to the carousel container

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    },5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Handlers for swipe gestures (touch-based swiping)
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  // Navigate to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Navigate to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition(e.clientX); // Record the starting mouse position
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    const difference = startPosition - currentPosition;

    // If the drag distance is significant, navigate slides
    if (difference > 50) {
      handleNext();
      setIsDragging(false);
    } else if (difference < -50) {
      handlePrev();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // End dragging
  };

  const handleNavigation = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="carousel-container"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Handle dragging outside the container
      {...swipeHandlers}
    >
      <div
        className="carousel"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <video
              className="carousel-video"
              autoPlay
              muted
              loop
            >
              <source src={slide.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="carousel-text">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleNavigation(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
