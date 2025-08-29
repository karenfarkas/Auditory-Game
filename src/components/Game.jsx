import React, { useEffect, useRef, useState } from 'react';
import CountdownTimer from './CountdownTimer.jsx';

export default function Game({ round, onRoundComplete }) {
  const containerRef = useRef();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30-second timer

  const colors = ['red', 'green', 'yellow'];
  const numBalls = 15;
  const balls = useRef([]);
  const audioRed = useRef(null);

 

 
  // Ball size and speed
  const ballSize = 50;
  const speed = 0.5; // slower movement

  // Create balls
  useEffect(() => {
    balls.current = [];
    const container = containerRef.current;
    container.innerHTML = '';

    for (let i = 0; i < numBalls; i++) {
      const ball = document.createElement('div');
      ball.className = 'ball';
      ball.style.backgroundColor = colors[i % colors.length];
      ball.style.width = `${ballSize}px`;
      ball.style.height = `${ballSize}px`;
      ball.style.left = `${Math.random() * (550 - ballSize)}px`;
      ball.style.top = `${Math.random() * (350 - ballSize)}px`;

      // movement
      const dx = Math.random() > 0.5 ? speed : -speed;
      const dy = Math.random() > 0.5 ? speed : -speed;
      balls.current.push({ el: ball, dx, dy });

      // click handler
      ball.onclick = () => {
        const target = colors[round - 1]; // Example target color per round
        if (ball.style.backgroundColor === target) {
          setScore(s => s + 1);
        } else {
          setScore(s => (s > 0 ? s - 1 : 0));
        }
      };

      container.appendChild(ball);
    }
  }, [round]);

  // Move balls continuously
  useEffect(() => {
    const move = () => {
      const container = containerRef.current;
      balls.current.forEach(b => {
        let left = parseFloat(b.el.style.left);
        let top = parseFloat(b.el.style.top);

        left += b.dx;
        top += b.dy;

        if (left <= 0 || left >= 550 - ballSize) b.dx *= -1;
        if (top <= 0 || top >= 350 - ballSize) b.dy *= -1;

        b.el.style.left = `${left}px`;
        b.el.style.top = `${top}px`;
      });
      requestAnimationFrame(move);
    };
    move();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      onRoundComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onRoundComplete]);

  const progressPercent = (timeLeft / 30) * 100;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Score: {score}</h2>

      {/* Visual time bar */}
      <div style={{
        width: '550px',
        height: '20px',
        border: '2px solid #000',
        margin: '10px auto',
        backgroundColor: '#eee',
        position: 'relative'
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          backgroundColor: '#5B9AC8',
          transition: 'width 0.2s linear'
        }} />
      </div>

      <div ref={containerRef} className="gameContainer" style={{
        position: 'relative',
        width: '550px',
        height: '350px',
        border: '2px solid black',
        margin: '0 auto',
        overflow: 'hidden'
      }}></div>
    </div>
  );
}
