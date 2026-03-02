import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CursorAndCoords() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const cursorX = useSpring(0, { damping: 20, stiffness: 200 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#00FF41] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-[#00FF41] rounded-full pointer-events-none z-[9999]"
        style={{ x: cursorX.get() + 14, y: cursorY.get() + 14 }}
      />

      {/* Screen Coordinates */}
      <div className="fixed top-4 left-4 font-mono text-[10px] text-[#00FF41] opacity-50 pointer-events-none z-50">
        X: {mousePos.x.toString().padStart(4, '0')}
      </div>
      <div className="fixed top-4 right-4 font-mono text-[10px] text-[#00FF41] opacity-50 pointer-events-none z-50">
        Y: {mousePos.y.toString().padStart(4, '0')}
      </div>
      <div className="fixed bottom-4 left-4 font-mono text-[10px] text-[#00FF41] opacity-50 pointer-events-none z-50">
        NEXORA_GDE // SYS_ACTIVE
      </div>
      <div className="fixed bottom-4 right-4 font-mono text-[10px] text-[#00FF41] opacity-50 pointer-events-none z-50">
        LOC: {window.location.pathname.toUpperCase()}
      </div>
    </>
  );
}
