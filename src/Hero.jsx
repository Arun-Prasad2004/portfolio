import { useEffect, useState } from "react";
import "./Hero.css";

export const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // slight delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`hero-section ${visible ? "fade-in-up" : ""}`}>
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay">
        <h1>Hi, I'm Arun</h1>
        <p>An AI + Web Developer blending logic with creativity.</p>
      </div>
    </div>
  );
};
