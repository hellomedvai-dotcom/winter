import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Container } from '../Container/Container';
import { SITE_CONTENT } from '@/config/siteContent';
import './ScrollWordmarkTransition.css';
import './Footer.css';

export interface FooterProps {
  onOpenJoin?: (mode?: 'waitlist' | 'verified_doctor' | 'doctor' | 'team') => void;
}

/**
 * Footer
 *
 * Implements the coordinated black-to-white section transition inspired by
 * ESR Bespoke (https://www.esrbespoke.au/).
 *
 * Coordinated Sequence:
 * 1. The preceding black section boundary moves upward as the user scrolls down.
 * 2. In coordination with that movement, the incoming white section becomes progressively visible.
 * 3. The large bold MEDVIDHI wordmark rolls in from 3D perspective into its resting lock.
 * 4. Once the white section settles in view, the wordmark reaches its final position
 *    and remains COMPLETELY STATIC.
 * 5. Reverse scrolling naturally rolls the wordmark back and lowers the dark boundary.
 * 6. Full accessibility, keyboard focus, reduced motion, and real MEDVIDHI content preserved.
 */
export const Footer: React.FC<FooterProps> = ({ onOpenJoin }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Roll-in rotational transition synchronized with scroll boundary
  const rotateX = useTransform(scrollYProgress, [0, 0.85, 1], [48, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.85, 1], ['42px', '0px', '0px']);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.2, 0.7, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.85, 1], [0.94, 1, 1]);
  const curtainY = useTransform(scrollYProgress, [0, 0.85], ['0%', '-100%']);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={containerRef}
      className="scroll-wordmark-transition-zone"
      aria-label="Footer and Section Transition"
    >
      {/* 1. Preceding Dark Section Curtain that moves upward as user scrolls */}
      <motion.div
        className="esr-preceding-dark-curtain"
        style={shouldReduceMotion ? { transform: 'none' } : { y: curtainY }}
        aria-hidden="true"
      >
        <div className="esr-curtain-indicator">
          <span className="esr-curtain-dot" />
          <span className="esr-curtain-quote">&ldquo;Your health story deserves more than a series of disconnected moments.&rdquo;</span>
        </div>
      </motion.div>

      {/* 2. Incoming White Stage (Crisp White Canvas with Bold Black Typography) */}
      <div className="esr-incoming-white-stage">
        <Container size="default">
          <div className="esr-footer-grid">
            {/* Left Column: Rolling MEDVIDHI Wordmark */}
            <div className="wordmark-perspective-stage">
              <div className="esr-white-stage-intro">
                <span className="esr-stage-eyebrow">HEALTH MEMORY &middot; RIGHT DOCTOR</span>
                <h3 className="esr-white-stage-headline">Your next step, clearer.</h3>
              </div>
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
              <div className="wordmark-bottom-action-row">
                <span className="wordmark-supporting-tag">
                  Precision Engineering for Intelligent Health
                </span>
                <button
                  type="button"
                  className="esr-white-stage-cta-btn"
                  onClick={() => onOpenJoin?.('waitlist')}
                  aria-label="Join the Waitlist"
                >
                  Join the Waitlist
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Information Hierarchy */}
            <div className="esr-footer-info-col">
              {/* Direct Communication */}
              <div className="esr-footer-info-block">
                <h4 className="esr-info-heading">Direct Communication</h4>
                <p className="esr-info-content">
                  <a
                    href={`mailto:${SITE_CONTENT.footer.contactEmail}`}
                    className="esr-info-link"
                  >
                    {SITE_CONTENT.footer.contactEmail}
                  </a>
                  <br />
                  Intelligent clinical context &amp; early access inquiries
                </p>
              </div>

              {/* Navigation Links */}
              <div className="esr-footer-info-block">
                <h4 className="esr-info-heading">Navigation</h4>
                <ul className="esr-nav-links-row">
                  <li className="esr-nav-link-item">
                    <a
                      href="#features"
                      onClick={(e) => handleLinkClick(e, '#features')}
                    >
                      Features
                    </a>
                  </li>
                  <li className="esr-nav-link-item">
                    <a
                      href="#how-it-works"
                      onClick={(e) => handleLinkClick(e, '#how-it-works')}
                    >
                      How It Works
                    </a>
                  </li>
                  <li className="esr-nav-link-item">
                    <a
                      href="#faq"
                      onClick={(e) => handleLinkClick(e, '#faq')}
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="esr-nav-link-item">
                    <a
                      href="#join"
                      onClick={(e) => handleLinkClick(e, '#join')}
                    >
                      Early Access
                    </a>
                  </li>
                </ul>
              </div>

              {/* Engage & Build Actions */}
              <div className="esr-footer-info-block">
                <h4 className="esr-info-heading">Engage &amp; Build</h4>
                <ul className="esr-nav-links-row">
                  <li className="esr-nav-link-item">
                    <button
                      type="button"
                      onClick={() => onOpenJoin?.('waitlist')}
                    >
                      Early Access Waitlist
                    </button>
                  </li>
                  <li className="esr-nav-link-item">
                    <button
                      type="button"
                      onClick={() => onOpenJoin?.('verified_doctor')}
                    >
                      Join as Verified Doctor
                    </button>
                  </li>
                  <li className="esr-nav-link-item">
                    <button
                      type="button"
                      onClick={() => onOpenJoin?.('doctor')}
                    >
                      Join as Doctor
                    </button>
                  </li>
                  <li className="esr-nav-link-item">
                    <button
                      type="button"
                      onClick={() => onOpenJoin?.('team')}
                    >
                      Join Our Team
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Bottom Legal & Attribution Bar */}
          <div className="esr-footer-bottom-bar">
            <div className="esr-bottom-links-group">
              <span className="esr-brand-handle">@MEDVIDHI</span>
              <a
                href="#join"
                onClick={(e) => handleLinkClick(e, '#join')}
                className="esr-privacy-link"
              >
                Privacy
              </a>
              <span className="esr-copyright-text">
                {SITE_CONTENT.footer.copyright}
              </span>
            </div>
            <p className="esr-clinical-reminder">
              Intended platform preview. Healthcare professionals remain responsible for clinical evaluation, diagnosis, and treatment.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
