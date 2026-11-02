import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { SITE_CONTENT, ProblemStage } from '@/config/siteContent';
import {
  ArrowRight,
  ArrowDown,
  Layers,
  History,
  Compass,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import './ProblemsSection.css';

export const ProblemsSection: React.FC = () => {
  const { problems } = SITE_CONTENT;
  const [activeProblemIndex, setActiveProblemIndex] = useState<number>(0);

  const stages: ProblemStage[] = problems.stages;
  const activeStage = stages[activeProblemIndex] || stages[0];

  const handleNextProblem = () => {
    setActiveProblemIndex((prev) => (prev < stages.length - 1 ? prev + 1 : 0));
  };

  const handlePrevProblem = () => {
    setActiveProblemIndex((prev) => (prev > 0 ? prev - 1 : stages.length - 1));
  };

  return (
    <section id="problems" className="medvidhi-problems" aria-label="Problems We Solve">
      <Container size="default" className="problems-container">
        {/* Asymmetric Editorial Section Header */}
        <div className="problems-asymmetric-header" data-reveal>
          {/* Upper Left: Small Section Label */}
          <div className="problems-header-left">
            <span className="problems-section-label" data-reveal="fade" style={{ '--si': 0 } as React.CSSProperties}>
              02 &nbsp;&middot;&nbsp; {problems.eyebrow}
            </span>
            <p className="problems-section-quote" data-reveal="fade" style={{ '--si': 1 } as React.CSSProperties}>
              &ldquo;Your history shouldn’t disappear between visits.&rdquo;
            </p>
          </div>

          {/* Upper Right: Section Heading and Supporting Intro */}
          <div className="problems-header-right">
            <h2 className="problems-headline" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
              {problems.headlinePrefix}{' '}
              <span className="editorial-serif problems-serif-accent">
                {problems.headlineEditorial}
              </span>
              {problems.headlineMid}{' '}
              <span className="problems-headline-focus">
                {problems.headlineEmphasis}
              </span>
              {problems.headlineSuffix}
            </h2>

            <p className="problems-intro-text" data-reveal style={{ '--si': 2 } as React.CSSProperties}>{problems.intro}</p>
          </div>
        </div>

        {/* ================================================================== */}
        {/* OVERLAPPING BLACK-AND-WHITE FORMS COMPOSITION                      */}
        {/* ================================================================== */}
        <div
          className="overlapping-circles-arena"
          role="region"
          aria-label="Core Healthcare Problem vs Connected Context Solution"
          data-reveal
          data-cursor="explore"
          style={{ '--si': 0 } as React.CSSProperties}
        >
          {/* ---------------------------------------------------------------- */}
          {/* CIRCLE 1: THE LARGE BLACK CIRCLE (The Core Problem)              */}
          {/* ---------------------------------------------------------------- */}
          <div className="circle-node circle-problem-black" tabIndex={0} aria-label="The Core Healthcare Problem">
            <div className="circle-inner-content" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
              {/* Header inside Black Circle */}
              <div className="circle-header-block">
                <span className="circle-eyebrow-pill eyebrow-dark">
                  <AlertCircle size={12} aria-hidden="true" />
                  CURRENT REALITY • SILOED CARE
                </span>
                <h3 className="circle-title title-white">The Cost of Fragmentation</h3>
                <p className="circle-lead lead-gray">
                  Health signals live in separate silos, leaving patients and doctors to bridge the gaps alone.
                </p>
              </div>

              {/* Progressive Narrative Problem Focus Card with Restrained Reveal */}
              <div className="problem-focus-card">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="problem-card-inner"
                  >
                    <div className="problem-card-top">
                      <span className="problem-step-indicator">
                        STAGE {activeStage.step} OF 0{stages.length}
                      </span>
                      <span className="problem-stage-name">{activeStage.stageTitle}</span>
                    </div>

                    <h4 className="problem-meaningful-phrase">
                      {activeStage.coreDifficulty}
                    </h4>

                    <p className="problem-detail-text">
                      {activeStage.detail}
                    </p>

                    <div className="problem-impact-pill">
                      <span className="impact-dot" />
                      <span className="impact-text">{activeStage.patientImpact}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 5-Step Progressive Narrative Stepper */}
              <div className="problem-nav-footer">
                <div className="problem-tabs-row" role="tablist" aria-label="Select problem stage">
                  {stages.map((st, idx) => (
                    <button
                      key={st.step}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeProblemIndex}
                      className={`problem-tab-dot ${idx === activeProblemIndex ? 'is-active' : ''}`}
                      onClick={() => setActiveProblemIndex(idx)}
                      aria-label={`View problem ${st.step}: ${st.stageTitle}`}
                    >
                      <span>{st.step}</span>
                    </button>
                  ))}
                </div>

                <div className="problem-nav-arrows">
                  <button
                    type="button"
                    className="problem-arrow-btn"
                    onClick={handlePrevProblem}
                    aria-label="Previous problem"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    className="problem-arrow-btn"
                    onClick={handleNextProblem}
                    aria-label="Next problem"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Overlap Visual Transition Bridge (at the intersection) */}
          <div className="circles-overlap-bridge" aria-hidden="true" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
            <span className="bridge-pill" data-reveal="scale" style={{ '--si': 0 } as React.CSSProperties}>
              <span>THE SHIFT</span>
              <ArrowRight size={13} className="bridge-arrow" />
            </span>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* CIRCLE 2: THE LARGE WHITE CIRCLE (The Solution Transition)       */}
          {/* ---------------------------------------------------------------- */}
          <div
            className="circle-node circle-solution-white"
            tabIndex={0}
            aria-label="The Transition Toward a Solution"
          >
            <div className="circle-inner-content" data-reveal style={{ '--si': 3 } as React.CSSProperties}>
              {/* Header inside White Circle */}
              <div className="circle-header-block">
                <span className="circle-eyebrow-pill eyebrow-light">
                  <Sparkles size={12} aria-hidden="true" />
                  INTENDED APPROACH • CONNECTED CONTEXT
                </span>
                <h3 className="circle-title title-black">Continuous Context as the Bridge</h3>
                <p className="circle-lead lead-dark">
                  MEDVIDHI connects isolated health signals over time so patients and doctors can share an organised, clearer context.
                </p>
              </div>

              {/* 4 Key Solution Pillars */}
              <div className="solution-pillars-grid">
                <div className="solution-pillar-item">
                  <div className="pillar-icon-box" aria-hidden="true">
                    <Layers size={14} />
                  </div>
                  <div className="pillar-text-group">
                    <h4 className="pillar-title">Connected Intake</h4>
                    <p className="pillar-desc">
                      Chat, voice, body map &amp; uploaded reports structured into one intake.
                    </p>
                  </div>
                </div>

                <div className="solution-pillar-item">
                  <div className="pillar-icon-box" aria-hidden="true">
                    <History size={14} />
                  </div>
                  <div className="pillar-text-group">
                    <h4 className="pillar-title">Health Memory</h4>
                    <p className="pillar-desc">
                      Longitudinal continuity keeps your timeline connected across appointments.
                    </p>
                  </div>
                </div>

                <div className="solution-pillar-item">
                  <div className="pillar-icon-box" aria-hidden="true">
                    <Compass size={14} />
                  </div>
                  <div className="pillar-text-group">
                    <h4 className="pillar-title">Care Navigation</h4>
                    <p className="pillar-desc">
                      Guided direction toward relevant clinical specialties without guesswork.
                    </p>
                  </div>
                </div>

                <div className="solution-pillar-item">
                  <div className="pillar-icon-box" aria-hidden="true">
                    <FileText size={14} />
                  </div>
                  <div className="pillar-text-group">
                    <h4 className="pillar-title">30-Second Doctor Brief</h4>
                    <p className="pillar-desc">
                      Structured synthesis ready before every consultation, saving critical minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Natural Transition Link to Next Section (#how-it-works) */}
              <div className="solution-cta-row">
                <a
                  href="#how-it-works"
                  className="solution-transition-btn"
                  aria-label="Explore How MEDVIDHI Works in the next section"
                >
                  <span>Explore the 7-Stage Journey</span>
                  <ArrowDown size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Summary Resolution Card */}
        <div className="narrative-summary-card" data-reveal="fade" style={{ '--si': 0 } as React.CSSProperties}>
          <div className="summary-indicator">
            <span className="summary-dot" />
            <span className="summary-label">The Core Realization</span>
          </div>
          <p className="summary-statement">
            Patients shouldn&rsquo;t carry the exhausting burden of manually bridging medical silos.{' '}
            <span className="editorial-serif">Continuous, connected context</span> is what transforms
            fragmented symptoms into timely, precise clinical care.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ProblemsSection;

