import React, { useEffect, useRef, useState, useCallback } from 'react';
import './VidhiAnimatedFace.css';

interface VidhiAnimatedFaceProps {
  className?: string;
  size?: number;
  interactive?: boolean;
  theme?: 'light' | 'dark';
}

export const VidhiAnimatedFace: React.FC<VidhiAnimatedFaceProps> = ({
  className = '',
  size = 130,
  interactive = true,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#F7F7F5' : '#18181B';

  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [isWinking, setIsWinking] = useState<boolean>(true); // Default to the iconic wink from reference
  const [isSmiling, setIsSmiling] = useState<boolean>(false);

  // Mouse & Touch tracking for natural eye following
  const targetPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  // Smooth lerp loop for pupil movement
  useEffect(() => {
    let active = true;

    const animateGaze = () => {
      if (!active) return;
      const target = targetPosRef.current;
      const current = currentPosRef.current;

      // Spring-like damping
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      setPupilPos({ x: current.x, y: current.y });
      rafIdRef.current = requestAnimationFrame(animateGaze);
    };

    rafIdRef.current = requestAnimationFrame(animateGaze);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Update target coordinates based on cursor/touch position
  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current || !interactive) return;

      const rect = containerRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const dx = clientX - faceCenterX;
      const dy = clientY - faceCenterY;
      const distance = Math.hypot(dx, dy);

      // Travel radius in SVG units
      const maxRadius = 3.8;

      if (distance > 0) {
        const factor = Math.min(1, distance / 300);
        const angle = Math.atan2(dy, dx);
        targetPosRef.current = {
          x: Math.cos(angle) * maxRadius * factor,
          y: Math.sin(angle) * maxRadius * factor,
        };
      }
    },
    [interactive]
  );

  useEffect(() => {
    if (!interactive) return;

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerLeave = () => {
      targetPosRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('touchend', onPointerLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('touchend', onPointerLeave);
    };
  }, [interactive, handlePointerMove]);

  // Periodic right-eye wink animation cycle:
  // Stays in iconic wink for ~3.5s, opens up smoothly to look around for ~2.5s, then winks with a friendly smile!
  useEffect(() => {
    let winkTimeout: ReturnType<typeof setTimeout>;

    const cycleWink = () => {
      // Toggle between winking and open eye
      winkTimeout = setTimeout(() => {
        setIsWinking((prev) => !prev);
        setIsSmiling(true);
        setTimeout(() => setIsSmiling(false), 800);
        cycleWink();
      }, isWinking ? 3800 : 2400);
    };

    cycleWink();

    return () => clearTimeout(winkTimeout);
  }, [isWinking]);

  // Natural irregular blinking for open eyes
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;

    const scheduleNextBlink = () => {
      const nextDelay = 3000 + Math.random() * 3500;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);

        setTimeout(() => {
          setIsBlinking(false);

          // 25% chance of friendly double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => setIsBlinking(false), 110);
            }, 130);
          }

          scheduleNextBlink();
        }, 120);
      }, nextDelay);
    };

    scheduleNextBlink();

    return () => clearTimeout(blinkTimeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`vidhi-animated-face-container theme-${theme} ${className}`}
      style={{ width: size, height: size }}
      aria-label="Animated Vidhi Assistant Character"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="vidhi-face-svg"
      >
        {/* ================================================================= */}
        {/* 1. Vidhi's Iconic "M" Hair Bangs (Reference Artwork Match)          */}
        {/* ================================================================= */}
        <g className="vidhi-hair-group">
          <path
            d="M 50 134 C 54 116, 68 76, 76 58 C 77 56, 80 57, 81 60 L 98 94 L 124 48 C 126 45, 130 46, 133 50 C 142 64, 156 88, 158 120"
            stroke={strokeColor}
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="vidhi-hair-path"
          />
        </g>

        {/* ================================================================= */}
        {/* 2. Left Eye: Upright Oval Capsule with Pupil Tracking & Blinking    */}
        {/* ================================================================= */}
        <g className="vidhi-eyes-group">
          <g
            className="vidhi-eye-unit left-eye"
            transform={`translate(87, 114) scale(1, ${isBlinking ? 0.08 : 1})`}
          >
            <rect
              x={-5 + pupilPos.x * 0.7}
              y={-8.5 + pupilPos.y * 0.7}
              width="10"
              height="17"
              rx="5"
              fill={strokeColor}
              className="vidhi-eye-pill"
            />
          </g>

          {/* =============================================================== */}
          {/* 3. Right Eye: Periodic Charismatic WINK (Viewer Right)          */}
          {/* =============================================================== */}
          <g className="vidhi-eye-unit right-eye" transform="translate(120, 114)">
            {isWinking ? (
              // The iconic upward-curved wink crescent
              <path
                d="M -8 2 Q 0 -6 8 2"
                stroke={strokeColor}
                strokeWidth="7.5"
                strokeLinecap="round"
                className="vidhi-wink-arc"
              />
            ) : (
              // Open eye state (blinks together with left eye)
              <g transform={`scale(1, ${isBlinking ? 0.08 : 1})`}>
                <rect
                  x={-5 + pupilPos.x * 0.7}
                  y={-8.5 + pupilPos.y * 0.7}
                  width="10"
                  height="17"
                  rx="5"
                  fill={strokeColor}
                  className="vidhi-eye-pill"
                />
              </g>
            )}
          </g>
        </g>

        {/* ================================================================= */}
        {/* 4. Warm, Friendly Asymmetrical Curved Smile                        */}
        {/* ================================================================= */}
        <g className="vidhi-mouth-group">
          <path
            d={
              isSmiling
                ? 'M 84 142 Q 104 156 135 123'
                : 'M 86 142 Q 104 152 133 126'
            }
            stroke={strokeColor}
            strokeWidth="8.5"
            strokeLinecap="round"
            className="vidhi-mouth-path"
          />
        </g>
      </svg>
    </div>
  );
};

export default VidhiAnimatedFace;
