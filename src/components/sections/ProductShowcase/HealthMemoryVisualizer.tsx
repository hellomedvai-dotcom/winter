import React, { useState } from 'react';
import {
  MessageSquare,
  Mic,
  Crosshair,
  FileText,
  Pill,
  Stethoscope,
  History,
  Activity,
  RotateCcw,
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Link2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import {
  HEALTH_MEMORY_SOURCES,
  HEALTH_MEMORY_TIMELINE,
  TimelineEvent,
  HealthMemorySource,
} from '@/config/showcaseContent';
import './HealthMemoryVisualizer.css';

/**
 * Custom Balanced Geometric Network Icon
 * Designed specifically for the MEDVIDHI Health Memory central core.
 * Features an octagonal node matrix, concentric calibration rings,
 * 8 radial axes, and a pure monochrome nucleus.
 */
const HealthMemoryCentralNetworkSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 72,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`central-network-svg ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="coreNetGrad" x1="16" y1="12" x2="64" y2="68" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#A1A1AA" />
        <stop offset="100%" stopColor="#3F3F46" />
      </linearGradient>
      <radialGradient id="nucleusRad" cx="40" cy="40" r="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="70%" stopColor="#71717A" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Concentric Calibration Rings */}
    <circle cx="40" cy="40" r="37" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.35" />
    <circle cx="40" cy="40" r="28" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.25" />
    <circle cx="40" cy="40" r="18" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.4" />

    {/* 8 Radial Directional Axes */}
    <line x1="40" y1="3" x2="40" y2="77" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />
    <line x1="3" y1="40" x2="77" y2="40" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />
    <line x1="14" y1="14" x2="66" y2="66" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />
    <line x1="14" y1="66" x2="66" y2="14" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />

    {/* Octagonal Interconnected Matrix */}
    <polygon
      points="40,12 60,20 68,40 60,60 40,68 20,60 12,40 20,20"
      stroke="url(#coreNetGrad)"
      strokeWidth="1.6"
      fill="rgba(255, 255, 255, 0.04)"
      strokeLinejoin="round"
    />

    {/* Inner Secondary Diamond Grid */}
    <polygon
      points="40,22 58,40 40,58 22,40"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeOpacity="0.6"
      fill="none"
    />

    {/* 8 Radial Node Vertices */}
    <circle cx="40" cy="12" r="2.8" fill="#FFFFFF" />
    <circle cx="60" cy="20" r="2.8" fill="#D4D4D8" />
    <circle cx="68" cy="40" r="2.8" fill="#FFFFFF" />
    <circle cx="60" cy="60" r="2.8" fill="#D4D4D8" />
    <circle cx="40" cy="68" r="2.8" fill="#FFFFFF" />
    <circle cx="20" cy="60" r="2.8" fill="#D4D4D8" />
    <circle cx="12" cy="40" r="2.8" fill="#FFFFFF" />
    <circle cx="20" cy="20" r="2.8" fill="#D4D4D8" />

    {/* Center Core Nucleus Glow and Pulse */}
    <circle cx="40" cy="40" r="14" fill="url(#nucleusRad)" />
    <circle cx="40" cy="40" r="6" fill="#FFFFFF" className="core-nucleus-dot" />
  </svg>
);

/**
 * Subtle Monochrome DNA Double-Helix Background
 * Aesthetic background depth element at low opacity (purely decorative).
 * Does not imply genetic testing or DNA-based medical analysis.
 */
const MonochromeDnaHelixBackground: React.FC = () => (
  <svg
    className="memory-dna-background-svg"
    viewBox="0 0 1200 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="dnaFadeGrad" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.07" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.07" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Strand A: Sine Wave */}
    <path
      d="M0 240 Q 150 140, 300 240 T 600 240 T 900 240 T 1200 240"
      stroke="url(#dnaFadeGrad)"
      strokeWidth="1.2"
      fill="none"
    />

    {/* Strand B: Inverted Sine Wave */}
    <path
      d="M0 240 Q 150 340, 300 240 T 600 240 T 900 240 T 1200 240"
      stroke="url(#dnaFadeGrad)"
      strokeWidth="1.2"
      fill="none"
    />

    {/* Periodic Base Pair Rungs */}
    {[
      { x: 75, y1: 190, y2: 290 },
      { x: 150, y1: 142, y2: 338 },
      { x: 225, y1: 190, y2: 290 },
      { x: 375, y1: 290, y2: 190 },
      { x: 450, y1: 338, y2: 142 },
      { x: 525, y1: 290, y2: 190 },
      { x: 675, y1: 190, y2: 290 },
      { x: 750, y1: 142, y2: 338 },
      { x: 825, y1: 190, y2: 290 },
      { x: 975, y1: 290, y2: 190 },
      { x: 1050, y1: 338, y2: 142 },
      { x: 1125, y1: 290, y2: 190 },
    ].map((rung, i) => (
      <g key={i}>
        <line
          x1={rung.x}
          y1={rung.y1}
          x2={rung.x}
          y2={rung.y2}
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.05"
          strokeDasharray="2 3"
        />
        <circle cx={rung.x} cy={rung.y1} r="2" fill="#FFFFFF" fillOpacity="0.06" />
        <circle cx={rung.x} cy={rung.y2} r="2" fill="#FFFFFF" fillOpacity="0.06" />
      </g>
    ))}
  </svg>
);

export const HealthMemoryVisualizer: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('ev-1');
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [animationCycle, setAnimationCycle] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const selectedEvent: TimelineEvent =
    HEALTH_MEMORY_TIMELINE.find((e) => e.id === selectedEventId) || HEALTH_MEMORY_TIMELINE[0];

  // Crucial requirement: cards should highlight ONLY during real pointer hover or keyboard focus,
  // returning to neutral resting state when neither applies (no permanent active states).
  const highlightedSourceIds = activeSourceId ? [activeSourceId] : [];

  // Reset/replay sequence
  const handleReplaySequence = () => {
    setIsAnimating(false);
    setSelectedEventId('ev-1');
    setActiveSourceId(null);
    setAnimationCycle((prev) => prev + 1);
    setTimeout(() => {
      setIsAnimating(true);
    }, 50);
  };

  // Split the 8 sources into Left 4 and Right 4 for the balanced desktop constellation
  const leftSources = HEALTH_MEMORY_SOURCES.slice(0, 4);
  const rightSources = HEALTH_MEMORY_SOURCES.slice(4, 8);

  // Render standard Lucide icon based on name
  const renderSourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare size={16} />;
      case 'Mic':
        return <Mic size={16} />;
      case 'Crosshair':
        return <Crosshair size={16} />;
      case 'FileText':
        return <FileText size={16} />;
      case 'Pill':
        return <Pill size={16} />;
      case 'Stethoscope':
        return <Stethoscope size={16} />;
      case 'History':
        return <History size={16} />;
      case 'Activity':
      default:
        return <Activity size={16} />;
    }
  };

  // Find linked previous events for the selected event
  const connectedParentEvents = HEALTH_MEMORY_TIMELINE.filter((ev) =>
    selectedEvent.connectedEventIds?.includes(ev.id)
  );

  return (
    <section
      id="feature-health-memory"
      className="showcase-feature-section theme-dark health-memory-showcase-section"
      aria-label="MEDVIDHI Health Memory Longitudinal Continuity Engine"
    >
      <div className="feature-section-inner">
        {/* Section Header */}
        <div className="dark-feature-header">
          <div className="dark-badge-row">
            <span className="dark-mono-pill">
              <Layers size={13} className="pill-icon" />
              Longitudinal Context Engine
            </span>
            <span className="dark-anchor-tag">#feature-health-memory</span>
            <span className="dark-illustrative-tag">Illustrative Sample Concept</span>
          </div>

          <h3 className="dark-feature-headline">
            Your health changes.{' '}
            <span className="editorial-serif">Its context stays connected.</span>
          </h3>

          <p className="dark-feature-lead">
            Health is a continuous journey, not isolated clinical snapshots. MEDVIDHI connects
            disparate information streams over time so your medical narrative never has to restart from zero.
          </p>

          {/* Sequence Action Bar */}
          <div className="memory-controls-bar">
            <button
              type="button"
              className="memory-replay-btn"
              onClick={handleReplaySequence}
              aria-label="Replay health memory ingestion sequence"
            >
              <RotateCcw size={13} />
              <span>Replay Sequence</span>
            </button>
            <div className="memory-status-indicator">
              <span className="status-live-pulse" />
              <span className="status-label">Continuous Longitudinal Core • 8 Channels Active</span>
            </div>
          </div>
        </div>

        {/* Central Visualization Studio Card */}
        <div
          className={`health-memory-studio-card ${isAnimating ? 'is-live-flow' : ''}`}
          key={`cycle-${animationCycle}`}
        >
          {/* Subtle Decorative Background DNA Helix */}
          <MonochromeDnaHelixBackground />

          {/* Top Canvas: Converging Sources toward Health Memory Core */}
          <div className="memory-core-canvas">
            <div className="canvas-header">
              <span className="canvas-eyebrow">Multi-Modal Convergence Network</span>
              <h4 className="canvas-title">Information Sources Converging into Health Memory</h4>
              <p className="canvas-desc">
                Disparate patient fragments stream inward along fine curved paths to form an indexed, 
                coherent longitudinal memory core.
              </p>
            </div>

            {/* Desktop Wide Constellation Grid */}
            <div className="core-constellation-container">
              {/* Desktop SVG Connecting Trajectory Paths Overlay */}
              <svg
                className="constellation-curves-svg"
                viewBox="0 0 1000 440"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  {/* Fine Grayscale Gradients for Paths */}
                  <linearGradient id="leftPathGrad" x1="240" y1="220" x2="500" y2="220" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#71717A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="rightPathGrad" x1="760" y1="220" x2="500" y2="220" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#71717A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Left 4 Connecting Paths to Center (500, 220) */}
                {/* Node 0: Chat (Y: 55) */}
                <path
                  id="path-src-chat"
                  d="M 240 55 C 360 55, 410 220, 480 220"
                  stroke={highlightedSourceIds.includes('src-chat') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={highlightedSourceIds.includes('src-chat') ? '2.2' : '1.2'}
                  className={`curve-path ${highlightedSourceIds.includes('src-chat') ? 'path-active' : ''}`}
                />
                {/* Node 1: Voice (Y: 155) */}
                <path
                  id="path-src-voice"
                  d="M 240 155 C 340 155, 400 220, 480 220"
                  stroke={highlightedSourceIds.includes('src-voice') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={highlightedSourceIds.includes('src-voice') ? '2.2' : '1.2'}
                  className={`curve-path ${highlightedSourceIds.includes('src-voice') ? 'path-active' : ''}`}
                />
                {/* Node 2: Body Map (Y: 265) */}
                <path
                  id="path-src-body-map"
                  d="M 240 265 C 340 265, 400 220, 480 220"
                  stroke={highlightedSourceIds.includes('src-body-map') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={highlightedSourceIds.includes('src-body-map') ? '2.2' : '1.2'}
                  className={`curve-path ${highlightedSourceIds.includes('src-body-map') ? 'path-active' : ''}`}
                />
                {/* Node 3: Earlier History (Y: 365) */}
                <path
                  id="path-src-history"
                  d="M 240 365 C 360 365, 410 220, 480 220"
                  stroke={highlightedSourceIds.includes('src-history') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={highlightedSourceIds.includes('src-history') ? '2.2' : '1.2'}
                  className={`curve-path ${highlightedSourceIds.includes('src-history') ? 'path-active' : ''}`}
                />

                {/* Right 4 Connecting Paths to Center (500, 220) */}
                {/* Node 4: Reports & Documents (Y: 55) */}
                <path
                  id="path-src-reports"
                  d="M 760 55 C 640 55, 590 220, 520 220"
                  stroke={highlightedSourceIds.includes('src-reports') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={highlightedSourceIds.includes('src-reports') ? '2.2' : '1.2'}
                  className={`curve-path ${highlightedSourceIds.includes('src-reports') ? 'path-active' : ''}`}
                />
                {/* Node 5: Medicines & Prescriptions (Y: 155) */}
                <path
                  id="path-src-medicines"
                  d="M 760 155 C 660 155, 600 220, 520 220"
                  stroke={highlightedSourceIds.includes('src-medicines') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={highlightedSourceIds.includes('src-medicines') ? '2.2' : '1.2'}
                  className={`curve-path ${highlightedSourceIds.includes('src-medicines') ? 'path-active' : ''}`}
                />
                {/* Node 6: Doctor Consultations (Y: 265) */}
                <path
                  id="path-src-consultations"
                  d="M 760 265 C 660 265, 600 220, 520 220"
                  stroke={highlightedSourceIds.includes('src-consultations') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={highlightedSourceIds.includes('src-consultations') ? '2.2' : '1.2'}
                  className={`curve-path ${highlightedSourceIds.includes('src-consultations') ? 'path-active' : ''}`}
                />
                {/* Node 7: Post-Consult Changes (Y: 365) */}
                <path
                  id="path-src-post-consult"
                  d="M 760 365 C 640 365, 590 220, 520 220"
                  stroke={highlightedSourceIds.includes('src-post-consult') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.16)'}
                  strokeWidth={highlightedSourceIds.includes('src-post-consult') ? '2.2' : '1.2'}
                  className={`curve-path ${highlightedSourceIds.includes('src-post-consult') ? 'path-active' : ''}`}
                />

                {/* Traveling Monochrome Particles/Markers towards center */}
                <circle r="3" fill="#FFFFFF" className="traveling-marker">
                  <animateMotion path="M 240 55 C 360 55, 410 220, 480 220" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#D4D4D8" className="traveling-marker">
                  <animateMotion path="M 240 155 C 340 155, 400 220, 480 220" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#FFFFFF" className="traveling-marker">
                  <animateMotion path="M 240 265 C 340 265, 400 220, 480 220" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#D4D4D8" className="traveling-marker">
                  <animateMotion path="M 240 365 C 360 365, 410 220, 480 220" dur="3.0s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#FFFFFF" className="traveling-marker">
                  <animateMotion path="M 760 55 C 640 55, 590 220, 520 220" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#D4D4D8" className="traveling-marker">
                  <animateMotion path="M 760 155 C 660 155, 600 220, 520 220" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#FFFFFF" className="traveling-marker">
                  <animateMotion path="M 760 265 C 660 265, 600 220, 520 220" dur="2.9s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#D4D4D8" className="traveling-marker">
                  <animateMotion path="M 760 365 C 640 365, 590 220, 520 220" dur="2.8s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Left Column: 4 Source Nodes */}
              <div className="sources-wing sources-wing-left">
                {leftSources.map((source: HealthMemorySource, idx: number) => {
                  const isCardActive = activeSourceId === source.id;
                  return (
                    <div
                      key={source.id}
                      className={`source-node-card node-stagger-${idx} ${
                        isCardActive ? 'is-active-source' : ''
                      }`}
                      onMouseEnter={() => setActiveSourceId(source.id)}
                      onMouseLeave={() => setActiveSourceId(null)}
                      onFocus={() => setActiveSourceId(source.id)}
                      onBlur={() => setActiveSourceId(null)}
                      onClick={() =>
                        setActiveSourceId(source.id === activeSourceId ? null : source.id)
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`${source.name}: ${source.description}`}
                    >
                      <div className="source-icon-box">{renderSourceIcon(source.iconName)}</div>
                      <div className="source-text-block">
                        <span className="source-name">{source.name}</span>
                        <span className="source-category">{source.category}</span>
                      </div>
                      <div className="source-stream-pill">
                        <span className="stream-dot" />
                        <span className="stream-data">{source.incomingData}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Hub: Central Monochrome Health Memory Symbol */}
              <div className="central-memory-hub">
                <div className="central-hub-pedestal">
                  {/* Subtle outer geometric orbit pulse */}
                  <div className="hub-orbit-pulse orbit-3" />
                  <div className="hub-orbit-pulse orbit-2" />
                  <div className="hub-orbit-pulse orbit-1" />

                  {/* The Custom Connected Network Icon */}
                  <div className="hub-symbol-container">
                    <HealthMemoryCentralNetworkSymbol size={76} />
                  </div>

                  {/* Required Label: MEDVIDHI HEALTH MEMORY */}
                  <div className="hub-typography-block">
                    <span className="hub-eyebrow-brand">MEDVIDHI</span>
                    <h5 className="hub-main-title">HEALTH MEMORY</h5>
                    <span className="hub-continuity-badge">Continuous Longitudinal Core</span>
                  </div>
                </div>

                {/* Vertical Transmission Spine toward Timeline */}
                <div className="central-transmission-spine">
                  <div className="spine-down-line" />
                  <div className="spine-pulse-node" />
                  <span className="spine-stream-label">SYNTHESIZING LONGITUDINAL TIMELINE</span>
                </div>
              </div>

              {/* Right Column: 4 Source Nodes */}
              <div className="sources-wing sources-wing-right">
                {rightSources.map((source: HealthMemorySource, idx: number) => {
                  const isCardActive = activeSourceId === source.id;
                  return (
                    <div
                      key={source.id}
                      className={`source-node-card node-stagger-${idx + 4} ${
                        isCardActive ? 'is-active-source' : ''
                      }`}
                      onMouseEnter={() => setActiveSourceId(source.id)}
                      onMouseLeave={() => setActiveSourceId(null)}
                      onFocus={() => setActiveSourceId(source.id)}
                      onBlur={() => setActiveSourceId(null)}
                      onClick={() =>
                        setActiveSourceId(source.id === activeSourceId ? null : source.id)
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`${source.name}: ${source.description}`}
                    >
                      <div className="source-icon-box">{renderSourceIcon(source.iconName)}</div>
                      <div className="source-text-block">
                        <span className="source-name">{source.name}</span>
                        <span className="source-category">{source.category}</span>
                      </div>
                      <div className="source-stream-pill">
                        <span className="stream-dot" />
                        <span className="stream-data">{source.incomingData}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Lower Canvas: Longitudinal Connected Timeline */}
          <div className="memory-timeline-section">
            <div className="timeline-header-bar">
              <div className="timeline-title-row">
                <Clock size={16} />
                <span className="timeline-headline">Longitudinal Continuity Sequence</span>
              </div>
              <span className="timeline-badge-notice">
                Select any event to inspect how context connects across time
              </span>
            </div>

            {/* Horizontal Timeline Track */}
            <div
              className="timeline-horizontal-track"
              role="tablist"
              aria-label="Chronological health events"
            >
              <div className="track-connecting-line" aria-hidden="true" />

              {HEALTH_MEMORY_TIMELINE.map((event: TimelineEvent, idx: number) => {
                const isSelected = event.id === selectedEventId;
                const isConnectedParent = selectedEvent.connectedEventIds?.includes(event.id);

                return (
                  <div key={event.id} className="timeline-node-column">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      className={`timeline-node-card ${isSelected ? 'is-selected' : ''} ${
                        isConnectedParent ? 'is-connected-parent' : ''
                      }`}
                      onClick={() => {
                        setSelectedEventId(event.id);
                        setActiveSourceId(null);
                      }}
                    >
                      {/* Top Step Number Ring */}
                      <div className="timeline-dot-wrapper">
                        <span className="node-number">{event.stepNumber}</span>
                        <div className="node-ring" />
                      </div>

                      {/* Stage Name & Date */}
                      <span className="node-stage-label">{event.stageName}</span>
                      <span className="node-date-tag">{event.dateStr}</span>

                      {/* Event Title */}
                      <p className="node-card-title">{event.title}</p>

                      {/* Event Relationship Indicator */}
                      <div className="node-relationship-tag">
                        {event.connectedEventIds.length > 0 ? (
                          <>
                            <Link2 size={11} />
                            <span>{event.relationshipLabel}</span>
                          </>
                        ) : (
                          <span>Initial Baseline</span>
                        )}
                      </div>
                    </button>

                    {/* Sequential Connector Arrow between steps */}
                    {idx < HEALTH_MEMORY_TIMELINE.length - 1 && (
                      <div className="timeline-step-arrow" aria-hidden="true">
                        <ArrowRight size={13} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Event Context Inspector Panel (Inline, no generic modal) */}
            <div className="timeline-event-inspector">
              <div className="inspector-top-row">
                <div className="inspector-title-group">
                  <div className="inspector-meta-crumbs">
                    <span className="inspector-stage-tag">Step {selectedEvent.stepNumber}</span>
                    <span className="crumb-sep">•</span>
                    <span className="inspector-stage-name">{selectedEvent.stageName}</span>
                    <span className="crumb-sep">•</span>
                    <span className="inspector-date-str">{selectedEvent.dateStr}</span>
                  </div>
                  <h4 className="inspector-title">{selectedEvent.title}</h4>
                </div>
                <span className="inspector-badge">{selectedEvent.badge}</span>
              </div>

              {/* Longitudinal Continuity Link Chain */}
              <div className="inspector-continuity-chain">
                <div className="chain-label-group">
                  <Link2 size={13} />
                  <span className="chain-label">Longitudinal Continuity Link:</span>
                </div>
                <div className="chain-pill-stream">
                  {connectedParentEvents.length > 0 ? (
                    connectedParentEvents.map((parentEv) => (
                      <button
                        key={parentEv.id}
                        type="button"
                        className="chain-link-pill"
                        onClick={() => setSelectedEventId(parentEv.id)}
                        title={`Click to view linked prior event: ${parentEv.title}`}
                      >
                        <span>Linked to Step {parentEv.stepNumber}: {parentEv.stageName}</span>
                        <ArrowRight size={11} />
                      </button>
                    ))
                  ) : (
                    <span className="chain-root-pill">
                      Anchor Origin Event (No previous events required)
                    </span>
                  )}
                  <span className="chain-current-badge">
                    Active Step {selectedEvent.stepNumber}
                  </span>
                </div>
              </div>

              {/* Two-Column Context Body */}
              <div className="inspector-body-grid">
                <div className="inspector-detail-box">
                  <span className="detail-label">What Happened</span>
                  <p className="detail-text">{selectedEvent.detailedContext.whatHappened}</p>
                </div>

                <div className="inspector-detail-box">
                  <span className="detail-label">Clinical Significance & Continuity Impact</span>
                  <p className="detail-text">{selectedEvent.detailedContext.clinicalSignificance}</p>
                </div>
              </div>

              {/* Inspector Footer with Ingestion Sources & Action */}
              <div className="inspector-footer-bar">
                <div className="connected-sources-group">
                  <span className="sources-label">Connected Ingestion Channels:</span>
                  <div className="sources-tags-row">
                    {selectedEvent.detailedContext.connectedSources.map((sourceName, idx) => (
                      <span key={idx} className="connected-src-pill">
                        <CheckCircle2 size={11} />
                        {sourceName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inspector-action-state">
                  <Sparkles size={14} />
                  <span className="action-text">{selectedEvent.detailedContext.linkedAction}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="health-memory-footer">
            <ShieldAlert size={14} className="notice-icon" />
            <span className="notice-text">
              <strong>Illustrative Sample Simulation:</strong> Demonstrates connected longitudinal memory 
              architecture. Not connected to live EHR systems or storing real patient medical records.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthMemoryVisualizer;
