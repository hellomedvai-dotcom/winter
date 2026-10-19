import React from 'react';
import './DoctorBriefConvergenceVisual.css';

interface DoctorBriefConvergenceVisualProps {
  animationStep: number;
  highlightedFragmentId: string | null;
  isSynthesizing: boolean;
}

/**
 * DoctorBriefConvergenceVisual
 * 
 * Implements the repaired 30-second Doctor Brief visual:
 * - Real authentic supplied MEDVIDHI logo asset centered precisely inside the central node.
 * - Precision incoming vector connection lines from the 4 input fragments terminating at the circle boundary.
 * - Precision outgoing vector trajectories carrying synthesized context to corresponding Brief sections.
 * - When a fragment is selected:
 *   1. Highlights the selected incoming path with a clean white trace.
 *   2. Animates a traveling dot along the incoming line toward the central MEDVIDHI logo.
 *   3. Illuminates the central MEDVIDHI brand mark node.
 *   4. Highlights the corresponding outgoing trajectory with a traveling dot toward the Brief.
 * - Fully accessible with prefers-reduced-motion support and responsive adaptation.
 */
export const DoctorBriefConvergenceVisual: React.FC<DoctorBriefConvergenceVisualProps> = ({
  animationStep,
  highlightedFragmentId,
  isSynthesizing,
}) => {
  // Center of circle inside viewBox 0 0 160 480
  const cx = 80;
  const cy = 240;
  const radius = 34;

  // 4 input source Y coordinates matching the 4 left column fragments
  // Index 0: Body Map ('frag-body') -> Y = 80
  // Index 1: Voice ('frag-voice')    -> Y = 185
  // Index 2: Chat ('frag-chat')      -> Y = 295
  // Index 3: Report ('frag-lab')     -> Y = 400
  const incomingYPositions = [80, 185, 295, 400];

  // Arrival points precisely on the circle perimeter (cx=80, cy=240, r=34)
  const incomingEndpoints = [
    { px: 54.0, py: 218.0 }, // ~140 deg (Body Map)
    { px: 47.1, py: 231.2 }, // ~165 deg (Voice)
    { px: 47.1, py: 248.8 }, // ~195 deg (Chat)
    { px: 54.0, py: 262.0 }, // ~220 deg (Report)
  ];

  // Outgoing trajectory destinations at x = 160 corresponding to Brief sections:
  // - Voice  (Index 1): Section 01 Current Concern -> Y ≈ 110
  // - Chat   (Index 2): Section 02 Timeline        -> Y ≈ 190
  // - Report (Index 3): Section 06 Reports         -> Y ≈ 300
  // - Body   (Index 0): Section 08 Missing Context -> Y ≈ 380
  const outgoingRoutes = [
    {
      id: 'body-out',
      sourceIndex: 0,
      start: { px: 106.0, py: 262.0 },
      destY: 380,
      cpx1: 125,
      cpy1: 280,
      cpx2: 140,
      cpy2: 380,
    },
    {
      id: 'voice-out',
      sourceIndex: 1,
      start: { px: 106.0, py: 218.0 },
      destY: 110,
      cpx1: 125,
      cpy1: 200,
      cpx2: 140,
      cpy2: 110,
    },
    {
      id: 'chat-out',
      sourceIndex: 2,
      start: { px: 112.5, py: 231.0 },
      destY: 190,
      cpx1: 128,
      cpy1: 225,
      cpx2: 142,
      cpy2: 190,
    },
    {
      id: 'lab-out',
      sourceIndex: 3,
      start: { px: 112.5, py: 249.0 },
      destY: 300,
      cpx1: 128,
      cpy1: 255,
      cpx2: 142,
      cpy2: 300,
    },
  ];

  // Map fragment IDs to indices 0..3
  const fragmentIndexMap: Record<string, number> = {
    'frag-body': 0,
    'frag-voice': 1,
    'frag-chat': 2,
    'frag-lab': 3,
  };

  const activeLineIndex =
    highlightedFragmentId && fragmentIndexMap[highlightedFragmentId] !== undefined
      ? fragmentIndexMap[highlightedFragmentId]
      : null;

  return (
    <div className="doctor-brief-convergence-wrapper" aria-hidden="true">
      {/* Precision SVG Vector Routing Canvas */}
      <svg
        viewBox="0 0 160 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="convergence-vector-svg"
      >
        <defs>
          <linearGradient id="incomingLineGrad" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="outgoingLineGrad" x1="114" y1="240" x2="160" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* 1. INCOMING CONNECTION LINES (LEFT FRAGMENTS -> CENTRAL LOGO)   */}
        {/* ============================================================== */}
        <g className={`incoming-lines-group ${animationStep >= 2 ? 'is-visible' : ''}`}>
          {incomingYPositions.map((ySource, i) => {
            const endpoint = incomingEndpoints[i];
            const isHighlight = activeLineIndex === i;

            // Control points for smooth bezier curve to the exact circle boundary
            const cpx1 = 28;
            const cpy1 = ySource;
            const cpx2 = 42;
            const cpy2 = endpoint.py;
            const pathD = `M 0 ${ySource} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${endpoint.px} ${endpoint.py}`;

            return (
              <g key={`incoming-${i}`} className={`incoming-line-item ${isHighlight ? 'is-highlighted-line' : ''}`}>
                {/* Connection Path terminating at exact circle boundary */}
                <path
                  id={`incoming-path-${i}`}
                  d={pathD}
                  stroke={isHighlight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.32)'}
                  strokeWidth={isHighlight ? 2.5 : 1.25}
                  strokeDasharray={isHighlight ? 'none' : '3 3'}
                  className="incoming-trace-path"
                />

                {/* Animated Traveling Pulse Dot along the selected incoming line */}
                {isHighlight && (
                  <circle r="3.2" fill="#FFFFFF" className="traveling-pulse-dot">
                    <animateMotion
                      dur="1.2s"
                      repeatCount="indefinite"
                      path={pathD}
                    />
                  </circle>
                )}

                {/* Origin Pin at x = 0 */}
                <circle cx={0} cy={ySource} r={isHighlight ? 3 : 2} fill="#FFFFFF" />

                {/* Arrival Terminal Pip precisely on the outer circle boundary */}
                <circle
                  cx={endpoint.px}
                  cy={endpoint.py}
                  r={isHighlight ? 3.5 : 2.2}
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </g>

        {/* ============================================================== */}
        {/* 2. CENTRAL CIRCULAR NODE & AUTHENTIC MEDVIDHI LOGO ASSET        */}
        {/* ============================================================== */}
        <g
          className={`central-circle-node ${animationStep >= 3 ? 'is-revealed' : ''} ${
            isSynthesizing || activeLineIndex !== null ? 'is-synthesizing' : ''
          }`}
        >
          {/* Outer Boundary Calibration Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="#0A0A0A"
            stroke="#FFFFFF"
            strokeWidth={activeLineIndex !== null ? '2.5' : '1.8'}
            className="mv-circle-outer"
          />

          {/* Concentric Technical Inner Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={radius - 4}
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            strokeOpacity="0.4"
          />

          {/* Active Illumination Halo */}
          {activeLineIndex !== null && (
            <circle
              cx={cx}
              cy={cy}
              r={radius + 4}
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeDasharray="3 3"
              className="mv-halo-ring"
            />
          )}

          {/* Authentic Supplied MEDVIDHI Logo Asset locked inside the SVG center */}
          <image
            href="/assets/brand/medvidhi-mark-white-transparent.png"
            x={cx - 17}
            y={cy - 17}
            width="34"
            height="34"
            preserveAspectRatio="xMidYMid meet"
            className="svg-medvidhi-logo-image"
          />
        </g>

        {/* ============================================================== */}
        {/* 3. DISTINCT OUTGOING LINES (LOGO RIGHT EDGE -> DOCTOR BRIEF)   */}
        {/* ============================================================== */}
        <g className={`outgoing-lines-group ${animationStep >= 4 ? 'is-extended' : ''}`}>
          {outgoingRoutes.map((route) => {
            const isHighlight = activeLineIndex === route.sourceIndex;
            const pathD = `M ${route.start.px} ${route.start.py} C ${route.cpx1} ${route.cpy1}, ${route.cpx2} ${route.cpy2}, 160 ${route.destY}`;

            return (
              <g key={route.id} className={`outgoing-line-item ${isHighlight ? 'is-highlighted-out' : ''}`}>
                <path
                  id={`outgoing-path-${route.id}`}
                  d={pathD}
                  stroke={isHighlight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.32)'}
                  strokeWidth={isHighlight ? 2.5 : 1.25}
                  strokeDasharray={isHighlight ? 'none' : '3 3'}
                  className="outgoing-trace-path"
                />

                {/* Animated Traveling Pulse Dot along outgoing line */}
                {isHighlight && (
                  <circle r="3.2" fill="#FFFFFF" className="traveling-pulse-dot">
                    <animateMotion
                      dur="1.2s"
                      begin="0.6s"
                      repeatCount="indefinite"
                      path={pathD}
                    />
                  </circle>
                )}

                {/* Origin Pip at right boundary of circle */}
                <circle
                  cx={route.start.px}
                  cy={route.start.py}
                  r={isHighlight ? 3.2 : 2.2}
                  fill="#FFFFFF"
                />

                {/* Directional Chevron at exit entering the Doctor Brief */}
                <path
                  d={`M 154 ${route.destY - 4} L 159 ${route.destY} L 154 ${route.destY + 4}`}
                  stroke={isHighlight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)'}
                  strokeWidth={isHighlight ? 2 : 1.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {/* Central Direct Neutral Line */}
          <path
            d="M 114 240 L 160 240"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        </g>
      </svg>

      {/* Center Labels beneath the circular node */}
      <div className="synthesis-labels-block">
        <span className="synthesis-badge-label">MEDVIDHI CONTEXT SYNTHESIS</span>
        <span className="synthesis-sub-label">Scattered Inputs &rarr; 30-Sec Brief</span>
      </div>
    </div>
  );
};

export default DoctorBriefConvergenceVisual;
