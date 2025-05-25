import React, { useEffect, useRef, useState } from "react";
import "./WinnerBanner.css";
import Celebration from "/images/celebration.mp3"; // make sure this path is correct and file is accessible

const WinnerBanner = ({ winner, onFadeOut }) => {
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioRef = useRef(null); // for controlling audio playback

  useEffect(() => {
    if (!winner) return;

    setVisible(true);

    // Play celebration sound
    audioRef.current = new Audio(Celebration);
    audioRef.current.play();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];
    let particles = [];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Firework {
      constructor() {
        this.x = random(100, canvas.width - 100);
        this.y = canvas.height;
        this.targetY = random(100, canvas.height / 2);
        this.speed = random(5, 10);
        this.angle = -Math.PI / 2;
        this.trail = [];
        this.exploded = false;
      }

      update() {
        if (!this.exploded) {
          this.trail.push({ x: this.x, y: this.y });
          if (this.trail.length > 10) this.trail.shift();

          this.y += this.speed * Math.sin(this.angle);
          if (this.y <= this.targetY) {
            this.explode();
          }
        }
      }

      explode() {
        this.exploded = true;
        for (let i = 0; i < 50; i++) {
          particles.push(new Particle(this.x, this.y));
        }
      }

      draw() {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        this.trail.forEach((pos) => {
          ctx.lineTo(pos.x, pos.y);
        });
        ctx.stroke();

        if (!this.exploded) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
    }

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = random(1, 6);
        this.angle = random(0, Math.PI * 2);
        this.radius = random(1, 3);
        this.life = 100;
        this.decay = random(1, 3);
        this.color = `hsl(${random(0, 360)}, 100%, 60%)`;
      }

      update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.life -= this.decay;
        this.radius *= 0.96;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fireworks.length < 5) {
        fireworks.push(new Firework());
      }

      fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw();

        if (fw.exploded) {
          fireworks.splice(i, 1);
        }
      });

      particles.forEach((p, i) => {
        if (p.life <= 0 || p.radius <= 0) {
          particles.splice(i, 1);
        } else {
          p.update();
          p.draw();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    const timer = setTimeout(() => {
      setVisible(false);
      if (onFadeOut) onFadeOut();
      cancelAnimationFrame(animationRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [winner, onFadeOut]);

  if (!winner || !visible) return null;

  return (
    <>
      <div className="winner-banner-container">
        {/* <div className="winner-banner">
          🎉 {winner} Wins this round! 🎉
        </div> */}
      </div>
      <canvas
        ref={canvasRef}
        className="fireworks-canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default WinnerBanner;
