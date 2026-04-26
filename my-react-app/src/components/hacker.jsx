import { useEffect, useState, useRef } from 'react';
import './Hacker.css';

function Hacker() {
  const [typing, setTyping] = useState(false);
  const canvasRef = useRef(null);

  // захватываем первый кадр гифки в canvas
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
    };
    img.src = '/scriptype.gif';
  }, []);

  useEffect(() => {
    let timeout;
    const handleKey = () => {
      setTyping(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setTyping(false), 500);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="hacker-scene">
      {/* idle — первый кадр через canvas */}
      <canvas
        ref={canvasRef}
        className="hacker-gif"
        style={{ display: typing ? 'none' : 'block' }}
      />
      {/* typing — живая гифка */}
      {typing && (
        <img
          src="/scriptype.gif"
          alt="hacker"
          className="hacker-gif"
        />
      )}
    </div>
  );
}

export default Hacker;