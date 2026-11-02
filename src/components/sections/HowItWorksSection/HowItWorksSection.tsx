import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import { SwipeHint } from '@/components/common/SwipeHint/SwipeHint';
import { useReveal } from '@/lib/motion/useReveal';
import { useSwipeHint } from '@/lib/motion/useSwipeHint';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Mic,
  MapPin,
  FileText,
  Search,
  Layers,
  History,
  Compass,
  FileCheck2,
  RefreshCw,
} from 'lucide-react';
import { DirectionalFanSvg } from './DirectionalFanSvg';
import './HowItWorksSection.css';

// Seven stages in strict order with clinical-context descriptions
export interface FanStage {
  stepNumber: string;
  phase: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  hint: string;
}

export const FAN_STAGES: FanStage[] = [
  {
    stepNumber: '01',
    phase: 'Input',
    title: 'Input',
    description:
      'Bring health context into one place through Chat, Voice, Body Map, and uploaded reports or prescriptions.',
    icon: <MessageSquare size={16} />,
    hint: 'Multi-modal health description',
  },
  {
    stepNumber: '02',
    phase: 'Understand',
    title: 'Understand',
    description:
      'Interpret the information in context, including symptoms and relevant health history. Do not imply autonomous or definitive medical diagnosis.',
    icon: <Search size={16} />,
    hint: 'Contextual symptom clarification',
  },
  {
    stepNumber: '03',
    phase: 'Structure',
    title: 'Structure',
    description:
      'Organise information such as symptoms, reports, prescriptions and previous consultations into useful, structured health context.',
    icon: <Layers size={16} />,
    hint: 'Unified structured context',
  },
  {
    stepNumber: '04',
    phase: 'Remember',
    title: 'Remember',
    description:
      'Maintain an organised health history over time so that new information can build on earlier context.',
    icon: <History size={16} />,
    hint: 'Longitudinal health memory',
  },
  {
    stepNumber: '05',
    phase: 'Navigate',
    title: 'Navigate',
    description:
      'Help the patient identify a relevant care path or doctor/specialist based on the available context. Do not guarantee a diagnosis, outcome, or universally correct doctor.',
    icon: <Compass size={16} />,
    hint: 'Care pathway guidance',
  },
  {
    stepNumber: '06',
    phase: 'Prepare',
    title: 'Prepare',
    description:
      'Present a concise Doctor Brief so the clinician can quickly understand the patient’s reported history and concerns.',
    icon: <FileCheck2 size={16} />,
    hint: 'Structured 30-second summary',
  },
  {
    stepNumber: '07',
    phase: 'Update',
    title: 'Update',
    description:
      'Allow new symptoms, reports, medicines and relevant outcomes to feed back into the ongoing health context.',
    icon: <RefreshCw size={16} />,
    hint: 'Continuous care feedback loop',
  },
];

// Input Stage Multi-Modal Source Options
export interface InputSource {
  id: string;
  label: string;
  icon: React.ReactNode;
  detail: string;
}

const INPUT_SOURCES: InputSource[] = [
  {
    id: 'chat',
    label: 'Chat',
    icon: <MessageSquare size={14} />,
    detail: 'Describe symptoms naturally in your own words without medical jargon.',
  },
  {
    id: 'voice',
    label: 'Voice',
    icon: <Mic size={14} />,
    detail: 'Speak freely; acoustic nuances and spoken timelines are captured.',
  },
  {
    id: 'bodymap',
    label: 'Body Map',
    icon: <MapPin size={14} />,
    detail: 'Point directly to anatomical locations, depth, and radiation paths.',
  },
  {
    id: 'reports',
    label: 'Uploaded information',
    icon: <FileText size={14} />,
    detail: 'Include blood tests, scan summaries, or historical prescriptions.',
  },
];

// Fan Ray Geometry: Origins along the black semicircle perimeter (X ~ 300 to 330)
// and anchors for the 7 stage panels along the right arc
const STAGE_RAY_GEOMETRY = [
  { hubX: 235, hubY: 75, x: 440, y: 55 },    // Stage 0: Input (topmost)
  { hubX: 275, hubY: 155, x: 470, y: 150 },  // Stage 1: Understand
  { hubX: 300, hubY: 245, x: 490, y: 245 },  // Stage 2: Structure
  { hubX: 310, hubY: 340, x: 500, y: 340 },  // Stage 3: Remember (center)
  { hubX: 300, hubY: 435, x: 490, y: 435 },  // Stage 4: Navigate
  { hubX: 275, hubY: 525, x: 470, y: 530 },  // Stage 5: Prepare
  { hubX: 235, hubY: 605, x: 440, y: 625 },  // Stage 6: Update (bottommost)
];

/**
 * HowItWorksSection
 * 
 * "Directional Fan" Interface:
 * - Left Anchor: Substantial pure-black semicircle hub displaying "How it works" in refined serif.
 * - Directional Fan: Seven connected white stage panels radiating in a right-facing arc.
 * - Mathematical SVG connector rays emerging from the semicircle's curved perimeter.
 * - Interaction: Drag / swipe through all seven stages, click direct panels, keyboard navigation.
 * - Input stage active state: Refined interactive source chips with mini-visual preview.
 */
export const HowItWorksSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [activeSourceId, setActiveSourceId] = useState<string>('chat');
  const [isAutoplayPaused, setIsAutoplayPaused] = useState<boolean>(false);

  // Drag state
  const dragContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartXRef = useRef<number>(0);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  // Shared reveal system: boolean gate for the connector-ray draw-in
  const { ref: revealRef, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  // Autoplay: advance stages every 5.5 seconds when not paused
  useEffect(() => {
    if (isAutoplayPaused || !isVisible) return;

    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev < FAN_STAGES.length - 1 ? prev + 1 : 0));
    }, 5500);

    return () => clearInterval(interval);
  }, [isAutoplayPaused, isVisible]);

  // Pause autoplay on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsAutoplayPaused(true);
  }, []);

  // Mobile stage strip: swipe discoverability + keep the active step in view
  const stageStripSwipe = useSwipeHint<HTMLDivElement>();
  const mobileTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastCenteredStageRef = useRef<number>(activeStageIndex);

  useEffect(() => {
    if (lastCenteredStageRef.current === activeStageIndex) return;
    lastCenteredStageRef.current = activeStageIndex;
    const tab = mobileTabRefs.current[activeStageIndex];
    if (!tab) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    tab.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
  }, [activeStageIndex]);

  const attachContainerRef = useCallback((node: HTMLDivElement | null) => {
    dragContainerRef.current = node;
    revealRef.current = node;
  }, [revealRef]);

  // Direct stage navigation
  const goToStage = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(FAN_STAGES.length - 1, index));
    setActiveStageIndex(clamped);
    handleUserInteraction();
  }, [handleUserInteraction]);

  const nextStage = useCallback(() => {
    setActiveStageIndex((prev) => (prev < FAN_STAGES.length - 1 ? prev + 1 : 0));
    handleUserInteraction();
  }, [handleUserInteraction]);

  const prevStage = useCallback(() => {
    setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : FAN_STAGES.length - 1));
    handleUserInteraction();
  }, [handleUserInteraction]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextStage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevStage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToStage(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToStage(FAN_STAGES.length - 1);
      }
    },
    [nextStage, prevStage, goToStage]
  );

  // Pointer Drag & Swipe Listeners
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartXRef.current = e.clientX;
    setIsDragActive(true);
    handleUserInteraction();
  }, [handleUserInteraction]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaY = e.clientY - dragStartYRef.current;
      const deltaX = e.clientX - dragStartXRef.current;

      // Threshold: 36px drag triggers a stage transition
      const dragDistance = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
      if (Math.abs(dragDistance) > 36) {
        if (dragDistance > 0) {
          nextStage();
        } else {
          prevStage();
        }
        // Reset anchor after trigger
        dragStartYRef.current = e.clientY;
        dragStartXRef.current = e.clientX;
      }
    },
    [nextStage, prevStage]
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragActive(false);
  }, []);

  // Clean up pointer listeners if dragged outside
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isDraggingRef.current = false;
      setIsDragActive(false);
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => window.removeEventListener('pointerup', handleGlobalPointerUp);
  }, []);

  const currentStage = FAN_STAGES[activeStageIndex];
  const currentSource = INPUT_SOURCES.find((s) => s.id === activeSourceId) || INPUT_SOURCES[0];

  return (
    <section
      id="how-it-works"
      className="medvidhi-how-it-works"
      aria-label="How MEDVIDHI Works: Directional Fan Interface"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Container size="default" className="how-fan-container">
        {/* ================================================================== */}
        {/* DIRECTIONAL FAN STAGE INTERFACE                                    */}
        {/* ================================================================== */}
        <div
          ref={attachContainerRef}
          className={`fan-stage-composition ${isDragActive ? 'is-dragging' : ''} ${isVisible ? 'is-revealed' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          data-cursor="drag"
          role="region"
          aria-roledescription="Interactive 7-Stage Directional Fan"
          aria-label="Interactive health progression. Drag or click to change stage."
        >
          {/* ================================================================ */}
          {/* LEFT ANCHOR: Pure Black Semicircle Hub                          */}
          {/* ================================================================ */}
          <div className="fan-semicircle-hub">
            <div className="hub-content-inner">
              <Badge variant="neutral" size="sm" icon={<Sparkles size={12} />} className="hub-badge">
                THE 7-STAGE PROGRESSION
              </Badge>

              {/* Refined non-bold editorial serif heading */}
              <h2 className="hub-editorial-heading">
                How it<br />works
              </h2>

              <p className="hub-editorial-subtitle">
                From scattered details to a clearer next step.
              </p>

              {/* Active Stage Dial & Control Pill */}
              <div className="hub-stage-dial" aria-live="polite">
                <div className="dial-header">
                  <span className="dial-counter">
                    0{activeStageIndex + 1} <span className="dial-total">/ 07</span>
                  </span>
                  <span className="dial-phase-name">{currentStage.phase}</span>
                </div>

                {/* 7 Interactive Stage Scrubber Dots */}
                <div className="dial-scrubber" role="tablist" aria-label="Stages">
                  {FAN_STAGES.map((st, i) => (
                    <button
                      key={`scrubber-${st.stepNumber}`}
                      type="button"
                      role="tab"
                      aria-selected={i === activeStageIndex}
                      aria-label={`Stage ${st.stepNumber}: ${st.phase}`}
                      className={`dial-tick ${i === activeStageIndex ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToStage(i);
                      }}
                    />
                  ))}
                </div>

                {/* Accessible Next/Prev Buttons */}
                <div className="dial-nav-controls">
                  <button
                    type="button"
                    className="dial-nav-btn prev-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevStage();
                    }}
                    aria-label="Previous stage"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="dial-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoplayPaused((prev) => !prev);
                    }}
                    aria-label={isAutoplayPaused ? "Resume autoplay" : "Pause autoplay"}
                    title={isAutoplayPaused ? "Resume autoplay" : "Pause autoplay"}
                  >
                    {isAutoplayPaused ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    className="dial-nav-btn next-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextStage();
                    }}
                    aria-label="Next stage"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Semicircle Curved Right Edge Decorative Line */}
            <div className="hub-curved-rim" aria-hidden="true" />
          </div>

          {/* ================================================================ */}
          {/* DIRECTIONAL SVG CONNECTOR RAYS                                   */}
          {/* ================================================================ */}
          <DirectionalFanSvg
            className="fan-connector-svg-layer"
            activeStageIndex={activeStageIndex}
            stagePositions={STAGE_RAY_GEOMETRY}
            onSelectStage={goToStage}
          />

          {/* ================================================================ */}
          {/* SEVEN CONNECTED STAGE PANELS (Sweeping Radial Fan Arrangement)   */}
          {/* ================================================================ */}
          <div className="fan-panels-column">
            {FAN_STAGES.map((st, idx) => {
              const isActive = idx === activeStageIndex;

              return (
                <div
                  key={st.stepNumber}
                  className={`fan-stage-panel-item stage-pos-${idx} ${isActive ? 'is-active-focal' : 'is-compact-item'}`}
                  onClick={() => goToStage(idx)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`Stage ${st.stepNumber}: ${st.phase}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goToStage(idx);
                    }
                  }}
                >
                  {/* Compact Header Pill: Always Visible for All 7 Stages */}
                  <div className="panel-header-strip" data-reveal style={{ '--si': idx } as React.CSSProperties}>
                    <span className="panel-index-pill">{st.stepNumber}</span>
                    <span className="panel-title-text">{st.phase}</span>
                    <span className="panel-icon-wrap" aria-hidden="true">
                      {st.icon}
                    </span>
                  </div>

                  {/* Active Stage Body: Expands Smoothly as the Focal Point */}
                  {isActive && (
                    <div className="panel-expanded-body" onClick={(e) => e.stopPropagation()}>
                      <p className="panel-description-text">{st.description}</p>

                      {/* Stage 01 Input: Refined Interactive Source Chips Preview */}
                      {idx === 0 && (
                        <div className="input-sources-interactive-block">
                          <span className="sources-label-tag">Available Input Modes:</span>
                          <div className="sources-chips-row" role="tablist" aria-label="Input Sources">
                            {INPUT_SOURCES.map((source) => (
                              <button
                                key={source.id}
                                type="button"
                                role="tab"
                                aria-selected={activeSourceId === source.id}
                                className={`source-chip-btn ${activeSourceId === source.id ? 'is-active-source' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveSourceId(source.id);
                                }}
                              >
                                <span className="source-chip-icon">{source.icon}</span>
                                <span className="source-chip-text">{source.label}</span>
                              </button>
                            ))}
                          </div>

                          {/* Mini-visual Preview for the selected input source */}
                          <div className="source-preview-card" aria-live="polite">
                            <div className="source-preview-header">
                              <span className="preview-indicator-dot" />
                              <span className="preview-source-name">{currentSource.label}</span>
                            </div>
                            <p className="preview-source-detail">{currentSource.detail}</p>
                          </div>
                        </div>
                      )}

                      {/* Active Panel Footer Hint */}
                      <div className="panel-footer-meta">
                        <span className="panel-hint-pill">{st.hint}</span>
                        <span className="panel-step-jump">
                          {idx < FAN_STAGES.length - 1 ? (
                            <button
                              type="button"
                              className="panel-next-inline-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                nextStage();
                              }}
                            >
                              Next: {FAN_STAGES[idx + 1].phase} →
                            </button>
                          ) : (
                            <span className="panel-complete-tag">Continuous Story</span>
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* MOBILE VIEW COMPANION: Swipeable 7-Stage Header + Active Card      */}
        {/* ================================================================== */}
        <div className="fan-mobile-view-container">
          {/* Mobile Dark Header Hub Card */}
          <div className="mobile-hub-card" data-reveal="fade">
            <Badge variant="neutral" size="sm" icon={<Sparkles size={11} />} className="mobile-hub-badge">
              THE 7-STAGE PROGRESSION
            </Badge>
            <h2 className="mobile-hub-heading">How it works</h2>
            <p className="mobile-hub-sub">
              From scattered details to a clearer next step.
            </p>
          </div>

          {/* Mobile Horizontal Stage Selector Strip */}
          <div className="mobile-stages-strip-wrap">
            <div
              className="mobile-stages-selector-strip h-scroll-row"
              role="tablist"
              aria-label="Stages selector"
              ref={stageStripSwipe.rowRef}
              onScroll={stageStripSwipe.onRowScroll}
            >
              {FAN_STAGES.map((st, i) => (
                <span
                  key={`mobile-tab-${st.stepNumber}`}
                  className="mobile-stage-tab-reveal"
                  data-reveal
                  style={{ '--si': i } as React.CSSProperties}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === activeStageIndex}
                    className={`mobile-stage-tab ${i === activeStageIndex ? 'is-active-tab' : ''}`}
                    ref={(el) => {
                      mobileTabRefs.current[i] = el;
                    }}
                    onClick={() => {
                      goToStage(i);
                      stageStripSwipe.notify();
                    }}
                  >
                    <span className="mobile-tab-num">{st.stepNumber}</span>
                    <span className="mobile-tab-title">{st.phase}</span>
                  </button>
                </span>
              ))}
            </div>
            <div className="mobile-stages-hint-row">
              <SwipeHint active={stageStripSwipe.active} label="Swipe stages" />
            </div>
          </div>

          {/* Mobile Active Stage Card */}
          <div className="mobile-active-stage-card" aria-live="polite">
            <div className="mobile-card-top">
              <span className="mobile-card-index">{currentStage.stepNumber}</span>
              <h3 className="mobile-card-phase">{currentStage.phase}</h3>
              <span className="mobile-card-icon">{currentStage.icon}</span>
            </div>

            <p className="mobile-card-desc">{currentStage.description}</p>

            {/* Input stage source chips on mobile */}
            {activeStageIndex === 0 && (
              <div className="mobile-sources-wrap">
                <span className="mobile-sources-tag">Sources:</span>
                <div className="mobile-source-pills">
                  {INPUT_SOURCES.map((source) => (
                    <span key={`mob-src-${source.id}`} className="mobile-source-pill">
                      {source.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Card Bottom Navigation */}
            <div className="mobile-card-nav">
              <button
                type="button"
                className="mobile-nav-arrow"
                onClick={() => {
                  prevStage();
                  stageStripSwipe.notify();
                }}
                aria-label="Previous stage"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <span className="mobile-nav-count">
                0{activeStageIndex + 1} / 07
              </span>
              <button
                type="button"
                className="mobile-nav-arrow"
                onClick={() => {
                  nextStage();
                  stageStripSwipe.notify();
                }}
                aria-label="Next stage"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
