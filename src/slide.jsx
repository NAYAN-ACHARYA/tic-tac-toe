// BackgroundSlideshow.jsx
import React, { useEffect, useState } from "react";
import "./slide.css"; // Import your CSS file for styling
const images = [
  "/images/animal.png",
  "/images/food.png",
  "/images/scifi.png",
  "/images/sports.png",
  "/images/map.png",
];

export default function slide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-slideshow">
      {images.map((img, i) => (
        <div
          key={i}
          className={`bg-image ${i === currentIndex ? "visible" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
}
