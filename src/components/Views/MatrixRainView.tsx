import React, { useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';

interface MatrixRainViewProps {
  onExit: () => void;
}

export const MatrixRainView: React.FC<MatrixRainViewProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = 'AS400IBM01010101DATCORECYBFORGNEUGRIDQINTERQBATCH';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative flex-1 flex flex-col justify-between space-y-2 font-mono text-xs select-none">
      <div className="flex justify-between items-center border-b border-[var(--crt-border)] pb-1">
        <span className="font-bold text-[var(--crt-text-bright)] uppercase">
          NEURAL SUBSYSTEM DATA STREAM [MATRIX MODE]
        </span>
        <button
          onClick={() => {
            sound.playKeyClick();
            onExit();
          }}
          className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold uppercase"
        >
          [F3] EXIT MATRIX
        </button>
      </div>

      <div className="relative flex-1 border border-[var(--crt-border)] bg-black overflow-hidden min-h-[350px]">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 border border-[var(--crt-border)] text-[11px] text-[var(--crt-text-bright)]">
          PRESS [F3] OR CLICK ANYWHERE TO RETURN TO MAIN MENU
        </div>
      </div>
    </div>
  );
};
