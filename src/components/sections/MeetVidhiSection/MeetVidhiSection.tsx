import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import { Sparkles, ChevronLeft, ChevronRight, Globe2 } from 'lucide-react';
import {
  MEET_VIDHI_DATA,
  Language,
} from '@/config/meetVidhiContent';
import { PhoneFrame } from './PhoneFrame';
import {
  PhoneScreen1,
  PhoneScreen2,
  PhoneScreen3,
  PhoneScreen4,
  PhoneScreen5,
  PhoneScreen6,
} from './PhoneScreens';
import './MeetVidhiSection.css';

export const MeetVidhiSection: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const content = MEET_VIDHI_DATA[selectedLang];

  const stagesList = [
    { id: 'stage1', key: 'stage1', Screen: PhoneScreen1 },
    { id: 'stage2', key: 'stage2', Screen: PhoneScreen2 },
    { id: 'stage3', key: 'stage3', Screen: PhoneScreen3 },
    { id: 'stage4', key: 'stage4', Screen: PhoneScreen4 },
    { id: 'stage5', key: 'stage5', Screen: PhoneScreen5 },
    { id: 'stage6', key: 'stage6', Screen: PhoneScreen6 },
  ];

  // Scroll to active phone smoothly in track
  const scrollToPhone = useCallback((index: number) => {
    setActiveIndex(index);
    if (!trackRef.current) return;
    const phoneElements = trackRef.current.querySelectorAll('.vidhi-phone-frame-wrapper');
    if (phoneElements[index]) {
      isScrollingRef.current = true;
      (phoneElements[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  }, []);

  // Listen to native track scroll on mobile / desktop touch to update active index
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const phoneElements = track.querySelectorAll('.vidhi-phone-frame-wrapper');
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;

      let closestIndex = activeIndex;
      let minDistance = Infinity;

      phoneElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.left + rect.width / 2;
        const dist = Math.abs(trackCenter - elCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = idx;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const activeStageKey = stagesList[activeIndex].key;
  const currentStageMeta = content.stages[activeStageKey];

  return (
    <section
      id="meet-vidhi"
      className="medvidhi-meet-vidhi-section"
      aria-label="Meet Vidhi Interactive Phone Showcase"
    >
      <Container size="default" className="meet-vidhi-container">
        {/* Section Header */}
        <div className="meet-vidhi-header" data-reveal>
          <div className="meet-vidhi-badge-row" data-reveal="fade" style={{ '--si': 0 } as React.CSSProperties}>
            <Badge variant="neutral" size="md" icon={<Sparkles size={13} />}>
              {content.eyebrow}
            </Badge>
          </div>

          <h2 className="meet-vidhi-headline" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
            {content.heading}{' '}
            <span className="editorial-serif meet-vidhi-serif-accent">
              {content.headingAccent}
            </span>
          </h2>

          <p className="meet-vidhi-description" data-reveal style={{ '--si': 2 } as React.CSSProperties}>
            {content.description}
          </p>

          {/* Three-Language Interactive Glass Capsule Bar */}
          <div className="meet-vidhi-lang-dock" data-reveal style={{ '--si': 3 } as React.CSSProperties}>
            <div className="lang-capsule-bar" role="tablist" aria-label="Select Assistant Language">
              <span className="lang-dock-label" aria-hidden="true">
                <Globe2 size={13} className="lang-globe-icon" />
              </span>
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'en'}
                className={`lang-pill-btn ${selectedLang === 'en' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('en')}
              >
                English
              </button>
              <span className="lang-pill-divider" aria-hidden="true" />
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'mr'}
                className={`lang-pill-btn ${selectedLang === 'mr' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('mr')}
              >
                मराठी
              </button>
              <span className="lang-pill-divider" aria-hidden="true" />
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'hi'}
                className={`lang-pill-btn ${selectedLang === 'hi' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('hi')}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Stage Meta Card (Stage Number, Title, Explanation) */}
        <div className="meet-vidhi-active-stage-card" data-reveal style={{ '--si': 4 } as React.CSSProperties}>
          <div className="stage-card-inner">
            <div className="stage-card-meta-head">
              <span className="stage-card-index">
                STAGE {currentStageMeta.stageNumber} / 06
              </span>
              <span className="stage-card-tag">{currentStageMeta.stageTag}</span>
            </div>
            <h3 className="stage-card-title">{currentStageMeta.title}</h3>
            <p className="stage-card-desc">{currentStageMeta.shortDesc}</p>
          </div>

          {/* Horizontal Track Step Arrows */}
          <div className="stage-nav-arrow-dock">
            <button
              type="button"
              className="track-arrow-btn"
              onClick={() => scrollToPhone(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous phone screen"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="track-step-dots">
              {stagesList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`track-step-dot ${idx === activeIndex ? 'is-active' : ''}`}
                  onClick={() => scrollToPhone(idx)}
                  aria-label={`Go to stage ${idx + 1}`}
                />
              ))}
            </span>
            <button
              type="button"
              className="track-arrow-btn"
              onClick={() => scrollToPhone(Math.min(stagesList.length - 1, activeIndex + 1))}
              disabled={activeIndex === stagesList.length - 1}
              aria-label="Next phone screen"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 6-Phone Horizontal Interactive Track (Wabi-Inspired) */}
        <div className="meet-vidhi-showcase-stage" data-reveal style={{ '--si': 5 } as React.CSSProperties}>
          <div ref={trackRef} className="meet-vidhi-phone-track" tabIndex={0} role="region" aria-label="Smartphone gallery">
            {stagesList.map((item, index) => {
              const ScreenComponent = item.Screen;
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  className="phone-track-slot"
                  onClick={() => scrollToPhone(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Focus Phone Stage ${index + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollToPhone(index);
                    }
                  }}
                >
                  <PhoneFrame isActive={isActive}>
                    <ScreenComponent content={content} />
                  </PhoneFrame>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MeetVidhiSection;

