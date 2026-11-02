import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import './ScrollWordmarkTransition.css';

/**
 * ScrollWordmarkTransition
 *
 * Implements one smooth, scroll-synchronised rolling wordmark transition
 * inspired by ESR Bespoke (https://www.esrbespoke.au/).
 *
 * Mechanism:
 * - Anchored at the boundary between the dark transition zone and the footer.
 * - As the user scrolls into view, the wordmark rolls smoothly into perspective
 *   (rotateX from 55deg to 0deg, translateY into resting 0, opacity 0.25 to 1.0).
 * - When the transition completes, the wordmark reaches its final resting lock
 *   and remains COMPLETELY STATIC.
 * - Scrolling upwards reverses the transition naturally and smoothly.
 * - Respects prefers-reduced-motion with an instant static layout.
 * - Pure monochrome styling (black background, crisp white wordmark).
 */
export const ScrollWordmarkTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Roll-in rotational transition synchronized with scroll boundary
  const rotateX = useTransform(scrollYProgress, [0, 0.9, 1], [55, 6, 0]);
  const y = useTransform(scrollYProgress, [0, 0.9, 1], ['55px', '6px', '0px']);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.9, 1], [0.15, 0.6, 0.95, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.9, 1], [0.93, 0.99, 1]);

  return (
    <div
      ref={containerRef}
      className="scroll-wordmark-transition-zone"
      aria-hidden="true"
    >
      <Container size="default" className="scroll-wordmark-container">
        <div className="wordmark-perspective-stage">
          <motion.div
            className="wordmark-rolling-track"
            style={
              shouldReduceMotion
                ? { opacity: 1, transform: 'none' }
                : {
                    rotateX,
                    y,
                    opacity,
                    scale,
                  }
            }
          >
            <span className="scroll-wordmark-display">
              MEDVIDHI
            </span>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ScrollWordmarkTransition;
