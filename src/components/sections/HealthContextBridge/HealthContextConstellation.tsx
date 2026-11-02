import React, { useState } from 'react';
import { Activity, Clock, Pill, FileText, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import './HealthContextConstellation.css';

export interface ConstellationNode {
  id: string;
  name: string;
  eyebrow: string;
  icon: React.ReactNode;
  summary: string;
  description: string;
  keyDetails: string[];
  contextContribution: string;
  // SVG Coordinates (viewBox 0 0 540 330)
  cx: number;
  cy: number;
}

export const CONSTELLATION_NODES: ConstellationNode[] = [
  {
    id: 'symptoms',
    name: 'Symptoms',
    eyebrow: 'PATIENT ACCOUNT',
    icon: <Activity size={17} />,
    summary: 'What the person has noticed, in their own words.',
    description:
      'Everyday descriptions of discomfort, pain intensity, sensation, and specific triggers without needing medical jargon or formal diagnostic terms.',
    keyDetails: [
      'Reported sensations (sharp, dull, throbbing, intermittent)',
      'Aggravating factors (movement, stairs, posture, exertion)',
      'Specific body areas affected and localized spread',
    ],
    contextContribution: 'Grounds clinical inquiry directly in the patient’s observed day-to-day experience.',
    cx: 110,
    cy: 70,
  },
  {
    id: 'timeline',
    name: 'Timeline',
    eyebrow: 'CHRONOLOGY',
    icon: <Clock size={17} />,
    summary: 'When the concern started, what changed and which details remain unknown.',
    description:
      'A chronological progression tracking initial onset, frequency of episodes, periods of relief, and gaps where details have yet to be verified.',
    keyDetails: [
      'Approximate date or sudden vs. gradual start',
      'Progression over days, weeks, or months',
      'Uncertain details flagged for clinician clarification',
    ],
    contextContribution: 'Provides velocity and duration context essential for prioritizing clinical evaluation.',
    cx: 105,
    cy: 260,
  },
  {
    id: 'medicines',
    name: 'Medicines',
    eyebrow: 'TREATMENTS TRIED',
    icon: <Pill size={17} />,
    summary: 'Medicines the person reports taking or having tried, where provided.',
    description:
      'Self-reported medications, prior prescriptions, over-the-counter remedies, and any noticed improvements or adverse reactions.',
    keyDetails: [
      'Reported medications and approximate dosages',
      'Duration taken and observed symptom response',
      'Reported sensitivities or discontinuation reasons',
    ],
    contextContribution: 'Prevents redundant trial cycles and flags known sensitivities before consultations.',
    cx: 430,
    cy: 260,
  },
  {
    id: 'reports',
    name: 'Reports & Previous Care',
    eyebrow: 'HISTORICAL FINDINGS',
    icon: <FileText size={17} />,
    summary: 'Available reports and details of earlier consultations.',
    description:
      'Uploaded lab values, imaging conclusions, prior clinic summaries, and previous diagnoses that contextualize the current concern.',
    keyDetails: [
      'Key lab metrics, blood panels, and imaging conclusions',
      'Previous doctor visits and specialist recommendations',
      'Prior baseline measurements for direct longitudinal comparison',
    ],
    contextContribution: 'Bridges past evaluations with current presentation without forcing patients to restart.',
    cx: 430,
    cy: 70,
  },
  {
    id: 'memory',
    name: 'Health Memory',
    eyebrow: 'UNIFIED ARCHITECTURE',
    icon: <Sparkles size={19} />,
    summary: 'An organised view of the available context, not a diagnosis.',
    description:
      'The core connective layer that organizes reported symptoms, timelines, medicines, and previous care into a continuous, evolving health context.',
    keyDetails: [
      'Connected multi-channel synthesis across chat, voice & reports',
      'Pre-consultation Doctor Brief preparation for concise review',
      'Supportive navigation toward relevant medical expertise',
    ],
    contextContribution: 'Synthesizes scattered fragments into a clear, time-saving clinical briefing.',
    cx: 270,
    cy: 165,
  },
];

export const HealthContextConstellation: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('memory');

  const selectedNode =
    CONSTELLATION_NODES.find((n) => n.id === selectedNodeId) || CONSTELLATION_NODES[4];

  const centerCx = 270;
  const centerCy = 165;

  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#how-it-works');
    if (target) {
      const navOffset = 76;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="health-context-constellation"
      role="region"
      aria-label="Interactive Health Context Constellation: Select nodes to explore connected health context"
    >
      {/* Outer Card Frame Inspired by Reference */}
      <div className="constellation-outer-card">
        {/* ============================================================== */}
        {/* LEFT PANEL: DEEP CHARCOAL INTERACTIVE GRAPH                    */}
        {/* ============================================================== */}
        <div className="constellation-charcoal-panel">
          {/* Header strip */}
          <div className="charcoal-panel-header">
            <div className="header-status-indicator">
              <span className="cyan-pulsing-dot" />
              <span className="header-eyebrow-text">HEALTH CONTEXT GRAPH</span>
            </div>
            <span className="interactive-badge-pill">Click any node to explore</span>
          </div>

          {/* Canvas area */}
          <div className="charcoal-canvas-stage">
            <svg
              className="constellation-svg-lines"
              viewBox="0 0 540 330"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="cyanTealActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="cyanPassiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0.25)" />
                </linearGradient>
                <radialGradient id="centerCyanGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0.28)" />
                  <stop offset="70%" stopColor="rgba(20, 184, 166, 0.08)" />
                  <stop offset="100%" stopColor="rgba(12, 14, 20, 0)" />
                </radialGradient>
              </defs>

              {/* Ambient Orbit Curves */}
              <ellipse
                cx={centerCx}
                cy={centerCy}
                rx="195"
                ry="115"
                className="ambient-orbit-ring"
              />
              <circle
                cx={centerCx}
                cy={centerCy}
                r="65"
                fill="url(#centerCyanGlow)"
                className="center-glow-backdrop"
              />

              {/* Curved Connecting Streams to Center */}
              {CONSTELLATION_NODES.filter((n) => n.id !== 'memory').map((node) => {
                const isSelected = selectedNodeId === node.id || selectedNodeId === 'memory';
                const midX = (node.cx + centerCx) / 2;
                const midY = (node.cy + centerCy) / 2 + (node.cy < centerCy ? -16 : 16);

                return (
                  <g key={`path-group-${node.id}`}>
                    <path
                      d={`M ${node.cx} ${node.cy} Q ${midX} ${midY}, ${centerCx} ${centerCy}`}
                      className={`constellation-path ${isSelected ? 'is-active-stream' : ''}`}
                      stroke={isSelected ? 'url(#cyanTealActiveGrad)' : 'url(#cyanPassiveGrad)'}
                      strokeWidth={isSelected ? 2.4 : 1.25}
                      fill="none"
                    />
                    {isSelected && (
                      <circle
                        cx={midX}
                        cy={midY}
                        r="3.5"
                        fill="#06b6d4"
                        className="pulse-path-bead"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* 5 Selectable Node Buttons */}
            {CONSTELLATION_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isCenter = node.id === 'memory';
              const leftPercent = (node.cx / 540) * 100;
              const topPercent = (node.cy / 330) * 100;

              return (
                <button
                  key={node.id}
                  type="button"
                  className={`constellation-node-pill ${isCenter ? 'is-center-hub' : 'is-outer-node'} ${
                    isSelected ? 'is-selected' : ''
                  }`}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  onClick={() => setSelectedNodeId(node.id)}
                  aria-pressed={isSelected}
                  aria-label={`${node.name}: ${node.summary}`}
                  data-cursor="pointer"
                >
                  <span className="node-icon-circle" aria-hidden="true">
                    {node.icon}
                  </span>
                  <span className="node-label-group">
                    <span className="node-eyebrow-text">{node.eyebrow}</span>
                    <span className="node-name-text">{node.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Lower contextual callout inside charcoal panel (reference inspiration) */}
          <div className="charcoal-panel-bottom-card">
            <div className="bottom-card-indicator">
              <span className="bottom-card-dot" />
              <span className="bottom-card-status">Active Signal</span>
            </div>
            <h4 className="bottom-card-heading">{selectedNode.name}</h4>
            <p className="bottom-card-summary">{selectedNode.summary}</p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT PANEL: POLISHED WHITE EXPLANATORY PANEL                  */}
        {/* ============================================================== */}
        <div className="constellation-white-panel" aria-live="polite">
          {/* Top category metadata row */}
          <div className="white-panel-top-row">
            <span className="panel-category-badge">{selectedNode.eyebrow}</span>
            <div className="panel-active-status">
              <span className="status-dot-active" />
              <span>ACTIVE CONTEXT FACTOR</span>
            </div>
          </div>

          {/* Main heading and summary */}
          <div className="white-panel-header">
            <h3 className="panel-node-title">{selectedNode.name}</h3>
            <p className="panel-node-summary">{selectedNode.summary}</p>
          </div>

          {/* Quick-select filter tags row (direct reference inspiration) */}
          <div className="factor-pills-row" role="tablist" aria-label="Health context factors">
            {CONSTELLATION_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={`tag-${node.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`factor-tag-pill ${isSelected ? 'is-active-tag' : ''}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  data-cursor="pointer"
                >
                  {node.name}
                </button>
              );
            })}
          </div>

          {/* Detailed explanation */}
          <div className="white-panel-body">
            <p className="panel-node-description">{selectedNode.description}</p>

            <div className="panel-checklist-card">
              <h4 className="checklist-heading">Contextual Elements Included:</h4>
              <ul className="checklist-items">
                {selectedNode.keyDetails.map((detail, idx) => (
                  <li key={idx} className="checklist-item">
                    <CheckCircle2 size={16} className="checklist-check-icon" aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinical Value Callout */}
            <div className="clinical-value-callout">
              <span className="callout-eyebrow">CLINICAL ORIENTATION VALUE</span>
              <p className="callout-paragraph">{selectedNode.contextContribution}</p>
            </div>
          </div>

          {/* Bottom Action Button (matching reference's pill button) */}
          <div className="white-panel-footer">
            <a
              href="#how-it-works"
              onClick={handleScrollToHowItWorks}
              className="explore-journey-pill-btn"
              data-cursor="explore"
            >
              <span className="btn-glow-dot" />
              <span>Explore How It Works</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthContextConstellation;
