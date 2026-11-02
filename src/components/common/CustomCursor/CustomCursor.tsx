import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/**
 * CustomCursor
 *
 * Coherent, restrained custom cursor system inspired by LEQB (https://le-qb.com/)
 * and refined with Avecanni Studio contextual feedback principles.
 *
 * Characteristics:
 * - High-fidelity pointer tracking with smooth lerp (0.45) and zero perceptible lag.
 * - Refined circular dot (7px) with `mix-blend-mode: difference`, rendering pure white
 *   on dark surfaces and pure black on light surfaces.
 * - Restrained expansion to a 38px interactive ring on links, buttons, and actionable nodes.
 * - Contextual text labels ("EXPLORE", "VIEW", "DRAG") only on elements with `data-cursor` attributes.
 * - Quiet/hidden state on text inputs, textareas, and select elements so native I-beam cursor operates normally.
 * - Automatic disablement on touch devices, mobile viewports, or when prefers-reduced-motion is active.
 * - Strictly pointer-events: none; never blocks clicks, selection, or keyboard focus.
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Position state refs for 60fps RAF loop
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate on fine-pointer desktop devices without reduced motion
    const checkFinePointer = () => {
      const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1025px)').matches;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return hasFinePointer && !reduceMotion;
    };

    if (!checkFinePointer()) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        currentPos.current.x = e.clientX;
        currentPos.current.y = e.clientY;
        setIsVisible(true);
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for text inputs / form elements where native cursor must prevail
      const isInput = !!target.closest('input, textarea, select, [contenteditable="true"]');
      setIsInputHovered(isInput);

      // Check for explicit contextual cursor label (e.g. data-cursor="explore")
      const cursorAttrEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorAttrEl) {
        const attrVal = cursorAttrEl.getAttribute('data-cursor');
        if (attrVal === 'none' || attrVal === 'disabled') {
          setIsInputHovered(true);
          setCursorLabel(null);
          setIsHovered(false);
          return;
        } else if (attrVal && attrVal !== 'true') {
          setCursorLabel(attrVal.toUpperCase());
          setIsHovered(true);
          return;
        }
      }

      // Check for general interactive elements
      const isInteractive = !!target.closest(
        'a, button, [role="button"], [role="tab"], [role="switch"], [tabindex="0"], summary'
      );

      // Exclude body-map internal click targets from label clutter so precision remains intact
      const isBodyMapInternal = !!target.closest('.body-map-interactive-layer, .anatomical-interactive-wrapper');

      if (isInteractive && !isBodyMapInternal) {
        setIsHovered(true);
        setCursorLabel(null);
      } else {
        setIsHovered(false);
        setCursorLabel(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    // 60fps RAF loop with crisp 0.45 lerp factor
    const render = () => {
      const lerp = 0.45;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isSupported) {
    return null;
  }

  const cursorClasses = [
    'medvidhi-custom-cursor',
    isVisible ? 'is-visible' : '',
    isHovered ? 'is-active' : '',
    isInputHovered ? 'is-none-active' : '',
    cursorLabel ? 'is-labeled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside
      ref={cursorRef}
      className={cursorClasses}
      aria-hidden="true"
    >
      <div className="cursor-dot" />
      {cursorLabel && <span className="cursor-label-text">{cursorLabel}</span>}
    </aside>
  );
};

export default CustomCursor;
