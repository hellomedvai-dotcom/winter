import React, { useState, useRef, useEffect } from 'react';
import { MedvidhiLogo } from '@/components/brand/MedvidhiLogo';
import { BRAND } from '@/config/brand';
import './FloatingCapsuleNav.css';

export interface FloatingCapsuleNavProps {
  className?: string;
  onOpenJoin?: (mode?: 'waitlist' | 'verified_doctor' | 'doctor' | 'team') => void;
}

export const FloatingCapsuleNav: React.FC<FloatingCapsuleNavProps> = ({
  className = '',
  onOpenJoin,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const leaveTimeoutRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Surface treatment shifts once the page moves, without a scroll handler per frame.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Derived expansion state
  const isExpanded = isHovered || isFocused || isMobileMenuOpen;

  // Clear debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        window.clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  // Handle pointer enter with cancellation of any pending leave timer
  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  // Handle pointer leave with soft debounce to prevent jitter
  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 160);
  };

  // Focus management: expand when keyboard focus enters, collapse when it leaves
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (navRef.current && navRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsFocused(false);
  };

  // Keyboard navigation: Escape key collapses the capsule and mobile menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
      setIsFocused(false);
      setIsHovered(false);
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl && navRef.current?.contains(activeEl)) {
        activeEl.blur();
      }
    }
  };

  // Smooth scroll handler for features section
  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(BRAND.navRoutes.features || '#features');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSectionClick = (selector: string) => (e: React.MouseEvent) => {
    const target = document.querySelector(selector);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="floating-nav-anchor">
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className={`floating-capsule-nav ${isExpanded ? 'is-expanded' : 'is-compact'} ${
          isMobileMenuOpen ? 'is-mobile-open' : ''
        } ${isScrolled ? 'is-scrolled' : ''} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {/* Compact & Header Row */}
        <div className="capsule-primary-row">
          <a
            href="/"
            className="capsule-brand-link"
            aria-label="MEDVIDHI Home"
            onClick={(e) => {
              if (window.location.pathname === '/' || window.location.pathname === '') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <MedvidhiLogo height={32} priority />
          </a>

          {/* Collapsed Status Indicator / Affordance */}
          <div className="capsule-compact-indicator" aria-hidden={isExpanded}>
            <span className="compact-pulse-dot" />
            <span className="compact-label">Menu</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="capsule-mobile-toggle"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className={`hamburger-bar top ${isMobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-bar bottom ${isMobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>

        {/* Expanded Navigation Links */}
        <div className="capsule-nav-content" aria-hidden={!isExpanded}>
          <div className="capsule-divider" aria-hidden="true" />

          <ul className="capsule-links-list">
            <li className="capsule-link-item">
              <button
                type="button"
                className="capsule-nav-btn"
                onClick={handleFeaturesClick}
              >
                Features
              </button>
            </li>
            <li className="capsule-link-item">
              <a
                href={BRAND.navRoutes.howItWorks}
                className="capsule-nav-link"
                onClick={handleSectionClick(BRAND.navRoutes.howItWorks)}
              >
                How It Works
              </a>
            </li>
          </ul>

          <div className="capsule-actions">
            <a
              href={BRAND.navRoutes.join}
              className="capsule-join-btn"
              onClick={(e) => {
                if (onOpenJoin) {
                  e.preventDefault();
                  onOpenJoin('waitlist');
                  setIsMobileMenuOpen(false);
                } else {
                  handleSectionClick(BRAND.navRoutes.join)(e);
                }
              }}
            >
              Join
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
