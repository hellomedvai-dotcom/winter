import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import {
  Sparkles,
  MessageSquareText,
  FileUp,
  Layers,
  FileCheck2,
  Compass,
  Lock,
  RotateCcw,
  Play,
  Pause,
  Globe2,
} from 'lucide-react';
import { GlassPhoneFrame } from './GlassPhoneFrame';
import {
  Scene01MeetVidhi,
  Scene02ShareConcern,
  Scene03AddRecords,
  Scene04HealthMemory,
  Scene05DoctorBrief,
  Scene06RightDoctor,
  Scene07PatientHandover,
} from './PhoneScreens';
import { Language, SectionContent, TRANSLATIONS } from './translations';
import './MeetVidhiSection.css';

interface StageMeta {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  ScreenComponent: React.ComponentType<{ content: SectionContent }>;
}

// 7 Unified Healthcare Journey Stages (Labels always in English for the website)
const STAGE_CONFIGS: StageMeta[] = [
  {
    id: 'meet-vidhi',
    name: 'Meet Vidhi',
    icon: Sparkles,
    ScreenComponent: Scene01MeetVidhi,
  },
  {
    id: 'share-concern',
    name: 'Share a concern',
    icon: MessageSquareText,
    ScreenComponent: Scene02ShareConcern,
  },
  {
    id: 'add-records',
    name: 'Add health records',
    icon: FileUp,
    ScreenComponent: Scene03AddRecords,
  },
  {
    id: 'health-memory',
    name: 'Health Memory',
    icon: Layers,
    ScreenComponent: Scene04HealthMemory,
  },
  {
    id: 'doctor-brief',
    name: 'Doctor Brief',
    icon: FileCheck2,
    ScreenComponent: Scene05DoctorBrief,
  },
  {
    id: 'right-doctor',
    name: 'Right Doctor',
    icon: Compass,
    ScreenComponent: Scene06RightDoctor,
  },
  {
    id: 'patient-handover',
    name: 'Share with Control',
    icon: Lock,
    ScreenComponent: Scene07PatientHandover,
  },
];

export const MeetVidhiSection: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Current active localized content dictionary for internal phone mockups
  const content: SectionContent = TRANSLATIONS[selectedLang];
  // Fixed English dictionary for external website-level copy
  const englishContent: SectionContent = TRANSLATIONS.en;

  // Smoothly center the active pill in the horizontal carousel
  const centerPill = useCallback((index: number) => {
    const pill = pillRefs.current[index];
    const track = carouselTrackRef.current;
    if (!pill || !track) return;

    const trackWidth = track.offsetWidth;
    const pillLeft = pill.offsetLeft;
    const pillWidth = pill.offsetWidth;
    const scrollTarget = pillLeft - trackWidth / 2 + pillWidth / 2;

    track.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: 'smooth',
    });
  }, []);

  // Update active stage and center pill
  const handleSelectStage = useCallback(
    (index: number, manual: boolean = false) => {
      setActiveIndex(index);
      centerPill(index);
      if (manual) {
        setIsPlaying(false); // Pause autoplay on explicit manual user action
      }
    },
    [centerPill]
  );

  // Center initial pill on mount or when language changes
  useEffect(() => {
    centerPill(activeIndex);
  }, [activeIndex, centerPill]);

  // Section visibility detection via IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Autoplay progression timer (does NOT restart on language toggle)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setIsPlaying(false);
        return;
      }
    }

    if (!isPlaying || !isSectionVisible) return;

    const stageDuration = 6500;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % STAGE_CONFIGS.length;
        centerPill(next);
        return next;
      });
    }, stageDuration);

    return () => clearInterval(timer);
  }, [isPlaying, isSectionVisible, activeIndex, centerPill]);

  // Replay from beginning
  const handleReplay = () => {
    setActiveIndex(0);
    centerPill(0);
    setIsPlaying(true);
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentStageMeta = STAGE_CONFIGS[activeIndex];
  const CurrentScreenComponent = currentStageMeta.ScreenComponent;
  const currentStageEnglishText = englishContent.stages[activeIndex] || englishContent.stages[0];

  return (
    <section
      ref={sectionRef}
      id="meet-vidhi"
      className="medvidhi-meet-vidhi-section"
      aria-label="How MEDVIDHI Works: The Vidhi Experience"
    >
      <Container size="default" className="meet-vidhi-container">
        {/* ================================================================= */}
        {/* 1. HOW IT WORKS SECTION INTRODUCTION (ALWAYS ENGLISH COPY)         */}
        {/* ================================================================= */}
        <div className="meet-vidhi-header">
          <div className="meet-vidhi-eyebrow-row">
            <Badge variant="neutral" size="md" icon={<Sparkles size={13} />}>
              {englishContent.eyebrow}
            </Badge>
          </div>

          <h2 className="meet-vidhi-headline">
            {englishContent.headingPrefix}
            <span className="editorial-serif meet-vidhi-serif-accent">
              {englishContent.headingAccent}
            </span>
          </h2>

          <p className="meet-vidhi-description">{englishContent.description}</p>

          {/* =============================================================== */}
          {/* 1.5. WABI-INSPIRED CLEAR-GLASS SEGMENTED LANGUAGE SELECTOR      */}
          {/* =============================================================== */}
          <div className="meet-vidhi-lang-dock" aria-label="Select Mockup Language">
            <div className="wabi-glass-segmented-control" role="tablist">
              <span className="wabi-glass-icon-slot" aria-hidden="true">
                <Globe2 size={13} className="lang-globe-icon" />
              </span>

              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'en'}
                className={`wabi-lang-segment ${selectedLang === 'en' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('en')}
              >
                {selectedLang === 'en' && <span className="active-dot-indicator" />}
                <span>English</span>
              </button>

              <span className="wabi-segment-divider" aria-hidden="true" />

              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'mr'}
                className={`wabi-lang-segment ${selectedLang === 'mr' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('mr')}
              >
                {selectedLang === 'mr' && <span className="active-dot-indicator" />}
                <span>मराठी</span>
              </button>

              <span className="wabi-segment-divider" aria-hidden="true" />

              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'hi'}
                className={`wabi-lang-segment ${selectedLang === 'hi' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('hi')}
              >
                {selectedLang === 'hi' && <span className="active-dot-indicator" />}
                <span>हिन्दी</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. WABI-INSPIRED 7-STAGE CATEGORY SELECTOR (ALWAYS ENGLISH NAMES)  */}
        {/* ================================================================= */}
        <div className="meet-vidhi-carousel-wrapper">
          <div
            ref={carouselTrackRef}
            className="meet-vidhi-carousel-track"
            role="tablist"
            aria-label="Healthcare Journey Stages"
          >
            {STAGE_CONFIGS.map((stageConfig, idx) => {
              const Icon = stageConfig.icon;
              const isSelected = idx === activeIndex;
              const distance = Math.abs(idx - activeIndex);

              let opacityClass = 'pill-far';
              if (isSelected) {
                opacityClass = 'is-selected';
              } else if (distance === 1) {
                opacityClass = 'pill-adjacent';
              }

              return (
                <button
                  key={stageConfig.id}
                  ref={(el) => {
                    pillRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`wabi-category-pill ${opacityClass}`}
                  onClick={() => handleSelectStage(idx, true)}
                >
                  <span className="category-pill-icon">
                    <Icon size={14} />
                  </span>
                  <span className="category-pill-name">{stageConfig.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. SHOWCASE STAGE: SINGLE PERSISTENT GLASS PHONE (NO DUPES)       */}
        {/* ================================================================= */}
        <div className="meet-vidhi-showcase-stage-area single-device-stage">
          {/* Main Transparent Glass Smartphone Frame */}
          <div className="glass-phone-anchor-wrapper">
            <GlassPhoneFrame isFloating={isPlaying}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentStageMeta.id}-${selectedLang}`}
                  className="screen-transition-container"
                  initial={{ opacity: 0, scale: 0.98, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CurrentScreenComponent content={content} />
                </motion.div>
              </AnimatePresence>
            </GlassPhoneFrame>
          </div>

          {/* Wabi-Style Floating Circular Playback Controls */}
          <div className="meet-vidhi-controls-dock" aria-label="Demonstration Controls">
            <button
              type="button"
              className="wabi-circular-btn btn-replay"
              onClick={handleReplay}
              title="Replay from Scene 01"
              aria-label="Replay demonstration from beginning"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              className={`wabi-circular-btn btn-pause ${!isPlaying ? 'is-paused' : ''}`}
              onClick={handleTogglePlay}
              title={isPlaying ? 'Pause demonstration' : 'Resume demonstration'}
              aria-label={isPlaying ? 'Pause demonstration' : 'Resume demonstration'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>

        {/* Stage Description & Step Counter Footer (Always English) */}
        <div className="meet-vidhi-stage-caption-footer">
          <span className="caption-counter">
            0{activeIndex + 1} / 0{STAGE_CONFIGS.length}
          </span>
          <span className="caption-divider">•</span>
          <span className="caption-tagline">{currentStageEnglishText.tagline}</span>
        </div>
      </Container>
    </section>
  );
};

export default MeetVidhiSection;
