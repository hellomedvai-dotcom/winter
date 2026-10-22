import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { HandSubregionDefinition, AnatomicalSide, RecordedRegionIssue } from '@/types/bodymap';
import { HAND_SUBREGIONS } from '@/config/bodyRegions';

interface ActiveConditionDraft {
  primaryIssue: string;
  swellingExtent?: string;
  skinColor?: string;
  warmth?: boolean;
}

interface InlineHandMagnifierProps {
  side: AnatomicalSide;
  selectedSubregion: HandSubregionDefinition | null;
  recordedIssues: RecordedRegionIssue[];
  activeCondition?: ActiveConditionDraft;
  onSelectSubregion: (sub: HandSubregionDefinition) => void;
  onClose: () => void;
  onToggleSide?: (side: AnatomicalSide) => void;
}

export const InlineHandMagnifier: React.FC<InlineHandMagnifierProps> = ({
  side,
  selectedSubregion,
  recordedIssues,
  activeCondition,
  onSelectSubregion,
  onClose,
  onToggleSide,
}) => {
  const [hoveredSubregion, setHoveredSubregion] = useState<HandSubregionDefinition | null>(null);

  // Close on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const activeTarget = selectedSubregion || HAND_SUBREGIONS.find((s) => s.id === 'index_tip') || HAND_SUBREGIONS[3];

  const matchingIssue = recordedIssues.find(
    (issue) =>
      issue.subregionId === activeTarget.id ||
      (issue.regionId.includes('hand') && issue.side === side)
  );

  return (
    <>
      {/* Click-outside backdrop to dismiss magnifier immediately */}
      <div
        className="magnifier-backdrop-dismiss"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`inline-hand-magnifier-glass ${side === 'left' ? 'is-left-docked' : 'is-right-docked'}`}
        role="dialog"
        aria-label="Micro-digital hand magnifier"
      >
      {/* Magnifier Header */}
      <div className="magnifier-glass-header">
        <div className="magnifier-badge-row">
          <span className="magnifier-icon-wrap">
            <Search size={12} className="text-sky-400" />
          </span>
          <span className="magnifier-title">
            {side === 'right' ? 'Right Hand' : 'Left Hand'} · Micro-Digital Detail
          </span>
        </div>
        <div className="magnifier-header-actions">
          {onToggleSide && (
            <button
              type="button"
              className="magnifier-side-btn"
              onClick={() => onToggleSide(side === 'right' ? 'left' : 'right')}
              title={`Switch to ${side === 'right' ? 'Left' : 'Right'} hand`}
            >
              {side === 'right' ? 'Left' : 'Right'}
            </button>
          )}
          <button
            type="button"
            className="magnifier-close-btn"
            onClick={onClose}
            aria-label="Close hand magnifier"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Main Glass Stage */}
      <div className="magnifier-visual-stage">
        {/* Realistic Hand Skin Backdrop */}
        <div className="magnifier-img-wrap">
          <img
            src="/models/hand-realistic.png"
            alt="Hand skin texture showing fingers and joints"
            className={`magnifier-skin-img ${side === 'left' ? 'is-flipped' : ''}`}
          />
          <div className="magnifier-vignette" />
        </div>

        {/* Dynamic Symptom Highlight / Lens Spot */}
        {(matchingIssue || activeCondition) && (
          <div
            className={`magnifier-spot-glow ${
              matchingIssue?.primaryIssue === 'color_change' ||
              activeCondition?.primaryIssue === 'color_change' ||
              matchingIssue?.skinAppearance?.observedColor === 'red' ||
              activeCondition?.skinColor === 'red' ||
              activeCondition?.warmth ||
              matchingIssue?.visualOverlay?.type === 'red_overlay'
                ? 'is-red'
                : matchingIssue?.primaryIssue === 'swelling' || activeCondition?.primaryIssue === 'swelling'
                ? 'is-swelling'
                : 'is-amber'
            }`}
            style={{
              left: `${(activeTarget.coordinates.x / 300) * 100}%`,
              top: `${(activeTarget.coordinates.y / 500) * 100}%`,
            }}
          />
        )}

        {/* High Precision Interactive SVG */}
        <svg
          viewBox="0 0 300 500"
          className={`magnifier-svg ${side === 'left' ? 'is-mirrored' : ''}`}
          aria-label="Finger and joint selection grid"
        >
          <defs>
            <radialGradient id="magnifierRedHotspot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF2A4B" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FF0033" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#990022" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="magnifierLensGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#5FD7FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00A2E8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Phalangeal lines */}
          <path
            d="M 175,430 L 180,360 L 146,305 L 140,260 L 135,220"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
          />
          <path
            d="M 180,360 L 184,298 L 182,245 L 180,200"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
          />
          <path
            d="M 180,360 L 214,305 L 218,265 L 220,225"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
          />
          <path
            d="M 180,360 L 240,340 L 248,310 L 255,275"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
          />
          <path
            d="M 175,430 L 108,350 L 92,325 L 80,300"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
          />

          {/* Interactive Subregions */}
          {HAND_SUBREGIONS.map((sub) => {
            const isTargetActive = activeTarget.id === sub.id;
            const isHovered = hoveredSubregion?.id === sub.id;
            const isFingertip = sub.part === 'tip';

            return (
              <g
                key={sub.id}
                className={`magnifier-node ${isTargetActive ? 'is-selected' : ''}`}
                transform={`translate(${sub.coordinates.x}, ${sub.coordinates.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSubregion(sub);
                  onClose();
                }}
                onMouseEnter={() => setHoveredSubregion(sub)}
                onMouseLeave={() => setHoveredSubregion(null)}
                tabIndex={0}
                role="button"
                aria-label={`Select ${sub.name}`}
              >
                {/* Hit circle */}
                <circle cx="0" cy="0" r={isFingertip ? 16 : 13} fill="transparent" />

                {/* Fingertip Glass Lens Disc (Reference #3 style) */}
                {isTargetActive && (
                  <g className="magnifier-glass-contact-lens">
                    <circle cx="0" cy="0" r="18" fill="url(#magnifierLensGlow)" opacity="0.6" />
                    <circle
                      cx="0"
                      cy="0"
                      r="16"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="10"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                    />
                    <path
                      d="M -9,-9 A 14 14 0 0 1 8,-11"
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* Node center pin */}
                <circle
                  cx="0"
                  cy="0"
                  r={isTargetActive ? 5 : isHovered ? 4.5 : 3.5}
                  fill={isTargetActive ? '#FFFFFF' : isHovered ? '#5FD7FF' : 'rgba(255, 255, 255, 0.6)'}
                  stroke="#080A0D"
                  strokeWidth="1.2"
                />

                {/* Indicator text */}
                {isTargetActive && (
                  <g transform={`translate(${sub.coordinates.x > 150 ? 24 : -24}, -12)`}>
                    <rect
                      x={sub.coordinates.x > 150 ? 0 : -90}
                      y="-12"
                      width="90"
                      height="18"
                      rx="9"
                      fill="rgba(8, 12, 18, 0.85)"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="0.8"
                    />
                    <text
                      x={sub.coordinates.x > 150 ? 45 : -45}
                      y="1"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="8"
                      fontFamily="var(--font-family-mono, monospace)"
                      fontWeight="bold"
                    >
                      {sub.name.replace(' Fingertip', ' Tip')}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Magnifier Subtitle Footer */}
      <div className="magnifier-footer-bar">
        <span className="magnifier-active-name">{activeTarget.name}</span>
        <span className="magnifier-hint">Touch any digit to target lens</span>
      </div>
    </div>
  </>
  );
};
export default InlineHandMagnifier;
