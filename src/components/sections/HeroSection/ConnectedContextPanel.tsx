import React from 'react';
import { PulseIcon } from '@/components/icons/CustomIcons';
import { SITE_CONTENT } from '@/config/siteContent';
import './HeroSection.css';

export interface ConnectedContextPanelProps {
  className?: string;
}

/**
 * ConnectedContextPanel
 * Reusable standalone component for the full synthesis diagram surface.
 * Preserved for modular use across product deep-dives or documentation.
 */
export const ConnectedContextPanel: React.FC<ConnectedContextPanelProps> = ({ className = '' }) => {
  const { hero } = SITE_CONTENT;

  return (
    <div
      className={`hero-product-surface ${className}`}
      aria-label="Abstract representation of scattered health fragments becoming connected patient context"
    >
      <div className="surface-backdrop-glow" aria-hidden="true" />

      {/* Surface Top Bar */}
      <div className="surface-topbar">
        <div className="surface-window-controls">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
        </div>
        <div className="surface-status-pill">
          <span className="status-indicator-dot" />
          <span className="status-label">{hero.previewBadge}</span>
        </div>
        <span className="surface-timestamp">Real-time Synthesis</span>
      </div>

      {/* Central Synthesis Diagram Canvas */}
      <div className="surface-diagram-canvas">
        {/* SVG Connecting Flow Lines */}
        <svg
          className="diagram-connection-lines"
          viewBox="0 0 800 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="monoFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d="M 170 85 C 260 85, 320 160, 400 190"
            stroke="url(#monoFlowGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animated-dash-line"
          />
          <path
            d="M 630 85 C 540 85, 480 160, 400 190"
            stroke="url(#monoFlowGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animated-dash-line line-delay-1"
          />
          <path
            d="M 170 300 C 260 300, 320 220, 400 190"
            stroke="url(#monoFlowGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animated-dash-line line-delay-2"
          />
          <path
            d="M 630 300 C 540 300, 480 220, 400 190"
            stroke="url(#monoFlowGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animated-dash-line line-delay-3"
          />
        </svg>

        {/* Fragment Card 1: Symptoms Timeline */}
        <div className="diagram-fragment fragment-top-left">
          <div className="fragment-header">
            <span className="fragment-pulse-icon" />
            <span className="fragment-source">Symptom Record</span>
          </div>
          <p className="fragment-title">Intermittent Chest Discomfort</p>
          <span className="fragment-meta">Onset: 12 days ago • Exertion triggered</span>
        </div>

        {/* Fragment Card 2: Diagnostic Lab */}
        <div className="diagram-fragment fragment-top-right">
          <div className="fragment-header">
            <span className="fragment-pulse-icon" />
            <span className="fragment-source">External Lab Portal</span>
          </div>
          <p className="fragment-title">Lipid Panel &amp; Spirometry</p>
          <span className="fragment-meta">Unshared PDF • Hospital Archive B</span>
        </div>

        {/* Central Synthesis Signal Core */}
        <div className="diagram-center-signal">
          <div className="signal-aura" />
          <div className="signal-core">
            <div className="signal-icon-mark">
              <PulseIcon size={24} color="#000000" />
            </div>
            <div className="signal-details">
              <span className="signal-title">Unified Health Context</span>
              <span className="signal-status">Active Context Convergence</span>
            </div>
          </div>
        </div>

        {/* Fragment Card 3: Prior Consultation */}
        <div className="diagram-fragment fragment-bottom-left">
          <div className="fragment-header">
            <span className="fragment-pulse-icon" />
            <span className="fragment-source">Previous Consult</span>
          </div>
          <p className="fragment-title">General Practice Visit #2</p>
          <span className="fragment-meta">Notes unlinked to cardiologist consult</span>
        </div>

        {/* Fragment Card 4: Prescription & Reactions */}
        <div className="diagram-fragment fragment-bottom-right">
          <div className="fragment-header">
            <span className="fragment-pulse-icon" />
            <span className="fragment-source">Pharmacy History</span>
          </div>
          <p className="fragment-title">ACE Inhibitor Sensitivity</p>
          <span className="fragment-meta">Omitted in current consultation verbal intake</span>
        </div>
      </div>

      {/* Surface Bottom Summary Bar */}
      <div className="surface-footer">
        <div className="surface-footer-left">
          <span className="footer-status-dot" />
          <span className="footer-note-text">
            {hero.previewStatus}
          </span>
        </div>
        <div className="surface-footer-right">
          <span className="footer-security-tag">Connected Context Pipeline</span>
        </div>
      </div>
    </div>
  );
};
