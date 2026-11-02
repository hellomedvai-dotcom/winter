import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { SITE_CONTENT } from '@/config/siteContent';
import './HeroSection.css';

interface HeadlineWord {
  text: string;
  isEmphasis: boolean;
}

const HEADLINE_STATE_1: HeadlineWord[] = [
  { text: 'Your', isEmphasis: false },
  { text: 'health', isEmphasis: false },
  { text: 'story,', isEmphasis: false },
  { text: 'connected.', isEmphasis: true },
];

const HEADLINE_STATE_2: HeadlineWord[] = [
  { text: 'Your', isEmphasis: false },
  { text: 'next', isEmphasis: false },
  { text: 'step,', isEmphasis: false },
  { text: 'clearer.', isEmphasis: true },
];

// Unified timing constants (450–550ms transition, 2.5–3s stable display)
const TRANSITION_DURATION = 500; // ms
const AUTO_DISPLAY_DURATION = 2800; // ms
const COOLDOWN_DURATION = 350; // ms after transition settles
const SCROLL_THRESHOLD = 40; // px accumulated scroll to trigger swap

export const HeroSection: React.FC = () => {
  const { hero } = SITE_CONTENT;
  const reduce = useReducedMotion() ?? false;

  // Single shared headline state: 0 = State 1, 1 = State 2
  const [activeIdx, setActiveIdx] = useState<0 | 1>(0);
  const [isSliding, setIsSliding] = useState(false);

  // References for unified transition controller
  const heroRef = useRef<HTMLElement | null>(null);
  const isSlidingRef = useRef(false);
  const cooldownRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollAccumulatorRef = useRef(0);
  const scrollDecayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Single shared advance controller
  const advanceHeadline = useCallback((_source: 'auto' | 'hover' | 'scroll') => {
    if (reduce) return;

    // Prevent simultaneous triggers, duplicate transitions and rapid cycling
    if (isSlidingRef.current || cooldownRef.current) return;

    // Clear any existing automatic timer when an advance occurs
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    isSlidingRef.current = true;
    setIsSliding(true);

    // Transition duration: 500ms
    settleTimerRef.current = setTimeout(() => {
      setActiveIdx((prev) => (prev === 0 ? 1 : 0));
      setIsSliding(false);
      isSlidingRef.current = false;

      // Cooldown buffer to prevent immediate duplicate triggers
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, COOLDOWN_DURATION);

      // Schedule next automatic switch (2800ms)
      autoTimerRef.current = setTimeout(() => {
        advanceHeadline('auto');
      }, AUTO_DISPLAY_DURATION);
    }, TRANSITION_DURATION);
  }, [reduce]);

  // 1. Automatic Switching lifecycle
  useEffect(() => {
    if (reduce) return;

    // Start initial timer
    autoTimerRef.current = setTimeout(() => {
      advanceHeadline('auto');
    }, AUTO_DISPLAY_DURATION);

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, [reduce, advanceHeadline]);

  // 2. Normal Page Scrolling detection (Passive, non-blocking)
  useEffect(() => {
    if (reduce) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollYRef.current);
      lastScrollYRef.current = currentY;

      // Only check while Hero is visible in the viewport
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const isHeroVisible = rect.bottom > 80 && rect.top < window.innerHeight - 80;

      if (!isHeroVisible) {
        scrollAccumulatorRef.current = 0;
        return;
      }

      // Accumulate meaningful scroll gestures
      scrollAccumulatorRef.current += delta;

      // Reset decay timer
      if (scrollDecayTimerRef.current) clearTimeout(scrollDecayTimerRef.current);
      scrollDecayTimerRef.current = setTimeout(() => {
        scrollAccumulatorRef.current = 0;
      }, 250);

      // Trigger advance if threshold reached and not in cooldown
      if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD) {
        scrollAccumulatorRef.current = 0;
        advanceHeadline('scroll');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollDecayTimerRef.current) clearTimeout(scrollDecayTimerRef.current);
    };
  }, [reduce, advanceHeadline]);

  // 3. Hover interaction handler (PointerEnter once per entry, ignore touch events)
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    advanceHeadline('hover');
  };

  const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const rise = (offset: number, delay: number) =>
    reduce
      ? ({ initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } } as const)
      : ({
          initial: { opacity: 0, y: offset },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: EASE_OUT },
        } as const);

  const flankRise = (offsetX: number, delay: number) =>
    reduce
      ? ({ initial: false, animate: { opacity: 1, x: 0 }, transition: { duration: 0 } } as const)
      : ({
          initial: { opacity: 0, x: offsetX },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.65, delay, ease: EASE_OUT },
        } as const);

  // Determine item animation classes
  const getItemClass = (itemIdx: 0 | 1) => {
    if (reduce) {
      return itemIdx === 0 ? 'hero-swap-item--current' : 'hero-swap-item--hidden';
    }

    if (!isSliding) {
      return itemIdx === activeIdx
        ? 'hero-swap-item--current'
        : 'hero-swap-item--staged-bottom';
    }

    // During sliding: active item exits upward, the other enters upward from bottom
    return itemIdx === activeIdx
      ? 'hero-swap-item--exiting-up'
      : 'hero-swap-item--entering-up';
  };

  const renderWords = (words: HeadlineWord[]) =>
    words.map((item, idx) => {
      const isLast = idx === words.length - 1;
      return (
        <span
          key={idx}
          className={`hero-word ${item.isEmphasis ? 'hero-word--emphasis' : 'hero-word--default'}`}
          style={{ marginRight: isLast ? 0 : '0.28em' }}
        >
          {item.text}
        </span>
      );
    });

  return (
    <section ref={heroRef} className="medvidhi-hero" aria-label="Hero Introduction">
      {/* Subtle Atmospheric Backdrop */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-atmosphere-radial" />
      </div>

      <Container size="default" className="hero-editorial-container">
        {/* 1. Top Eyebrow Badge (HEALTH MEMORY · RIGHT DOCTOR) */}
        <motion.div {...rise(10, 0)} className="hero-eyebrow-container">
          <span className="hero-eyebrow-label">
            HEALTH MEMORY &middot; RIGHT DOCTOR
          </span>
        </motion.div>

        {/* 2. The 3-Zone Editorial Triptych: Left MED · Center Interactive Swap Headline · Right VIDHI */}
        <div className="hero-triptych-stage">
          {/* ZONE 1: LEFT SIDE - MED */}
          <motion.div
            {...flankRise(-16, 0.06)}
            className="hero-flank hero-flank--left"
          >
            <div className="hero-flank-card">
              <div className="hero-flank-header">
                <span className="hero-flank-kicker">01 // CONTEXT</span>
                <span className="hero-flank-rule" />
                <span className="hero-flank-accent-dot" aria-hidden="true" />
              </div>

              <div className="hero-flank-wordmark" aria-label="MED">
                <span className="flank-char">M</span>
                <span className="flank-char">E</span>
                <span className="flank-char">D</span>
              </div>

              <div className="hero-flank-footer">
                <span className="hero-flank-caption">CARE CONTINUITY</span>
              </div>
            </div>
          </motion.div>

          {/* ZONE 2: CENTER - UNIFIED AUTOMATIC + HOVER + SCROLL SWAP HEADLINE */}
          <div className="hero-center-zone">
            <h1
              className="hero-headline hero-headline--swap-stage"
              aria-label={activeIdx === 0 ? 'Your health story, connected.' : 'Your next step, clearer.'}
              onPointerEnter={handlePointerEnter}
            >
              {/* Masked viewport with subtle 3D perspective to contain the vertical swipe */}
              <div className="hero-swap-viewport">
                <div className="hero-swap-container">
                  {/* Headline State 1: "Your health story, connected." */}
                  <div
                    className={`hero-swap-item ${getItemClass(0)}`}
                    aria-hidden={activeIdx !== 0}
                  >
                    {renderWords(HEADLINE_STATE_1)}
                  </div>

                  {/* Headline State 2: "Your next step, clearer." */}
                  {!reduce && (
                    <div
                      className={`hero-swap-item ${getItemClass(1)}`}
                      aria-hidden={activeIdx !== 1}
                    >
                      {renderWords(HEADLINE_STATE_2)}
                    </div>
                  )}
                </div>
              </div>
            </h1>
          </div>

          {/* ZONE 3: RIGHT SIDE - VIDHI */}
          <motion.div
            {...flankRise(16, 0.06)}
            className="hero-flank hero-flank--right"
          >
            <div className="hero-flank-card">
              <div className="hero-flank-header">
                <span className="hero-flank-accent-dot" aria-hidden="true" />
                <span className="hero-flank-rule" />
                <span className="hero-flank-kicker">02 // PATHWAY</span>
              </div>

              <div className="hero-flank-wordmark" aria-label="VIDHI">
                <span className="flank-char">V</span>
                <span className="flank-char">I</span>
                <span className="flank-char">D</span>
                <span className="flank-char">H</span>
                <span className="flank-char">I</span>
              </div>

              <div className="hero-flank-footer">
                <span className="hero-flank-caption">CLINICAL INTELLIGENCE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. Empathetic Supporting Statement (Preserved Exactly) */}
        <motion.p
          {...rise(12, 0.48)}
          className="hero-supporting-text"
        >
          {hero.supportingCopy}
        </motion.p>
      </Container>
    </section>
  );
};

export default HeroSection;
