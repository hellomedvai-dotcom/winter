import React from 'react';

export interface MonochromeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  active?: boolean;
}

/**
 * 1. Body Map Icon
 * Minimal human-body silhouette with clearly defined body regions
 * and an anatomic spatial coordinate crosshair.
 */
export const BodyMapGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 36,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mono-glass-icon icon-body-map ${className}`}
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="bodyGrad" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#A1A1AA" stopOpacity="0.75" />
      </linearGradient>
      <radialGradient id="bodyPinGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="100%" stopColor="#71717A" stopOpacity="0.8" />
      </radialGradient>
    </defs>

    {/* Head */}
    <circle cx="20" cy="8.5" r="3.5" stroke="url(#bodyGrad)" strokeWidth="1.8" fill="rgba(255, 255, 255, 0.08)" />

    {/* Torso & Defined Upper Body Regions */}
    <path
      d="M13.5 16C13.5 13.8 15.5 12.5 20 12.5C24.5 12.5 26.5 13.8 26.5 16V22.5C26.5 24 25.2 25 23.5 25.5L23.5 33M16.5 33L16.5 25.5C14.8 25 13.5 24 13.5 22.5V16Z"
      stroke="url(#bodyGrad)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(255, 255, 255, 0.04)"
    />

    {/* Arms */}
    <path
      d="M13.5 16L10 22M26.5 16L30 22"
      stroke="url(#bodyGrad)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Chest & Abdomen Segmentation Lines */}
    <line x1="17" y1="18" x2="23" y2="18" stroke="#D4D4D8" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
    <line x1="18" y1="21.5" x2="22" y2="21.5" stroke="#A1A1AA" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />

    {/* Spatial Coordinate Pin / Landmark Target */}
    <circle cx="20" cy="18" r="2.2" fill="url(#bodyPinGrad)" />
    <circle cx="20" cy="18" r="4.2" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1.5 1.5" strokeOpacity="0.6" className="body-pin-radar" />
  </svg>
);

/**
 * 2. Voice Icon
 * Refined microphone symbol with subtle animated sound-wave bars.
 */
export const VoiceGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 36,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mono-glass-icon icon-voice ${className}`}
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="voiceGrad" x1="20" y1="7" x2="20" y2="33" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#71717A" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* Microphone Capsule */}
    <rect
      x="16"
      y="7.5"
      width="8"
      height="14"
      rx="4"
      stroke="url(#voiceGrad)"
      strokeWidth="1.8"
      fill="rgba(255, 255, 255, 0.08)"
    />

    {/* Capsule Grille Slits */}
    <line x1="18.5" y1="11" x2="21.5" y2="11" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
    <line x1="18.5" y1="14" x2="21.5" y2="14" stroke="#D4D4D8" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />

    {/* Acoustic Cradle */}
    <path
      d="M11.5 16.5C11.5 21.2 15.3 25 20 25C24.7 25 28.5 21.2 28.5 16.5"
      stroke="url(#voiceGrad)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Base Stand */}
    <line x1="20" y1="25" x2="20" y2="31" stroke="url(#voiceGrad)" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="14" y1="31" x2="26" y2="31" stroke="url(#voiceGrad)" strokeWidth="1.8" strokeLinecap="round" />

    {/* Animated Waveform Bars (Monochrome Grayscale) */}
    <line x1="6.5" y1="17" x2="6.5" y2="21" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" className="wave-bar wave-1" />
    <line x1="9" y1="15" x2="9" y2="23" stroke="#D4D4D8" strokeWidth="1.6" strokeLinecap="round" className="wave-bar wave-2" />
    <line x1="31" y1="15" x2="31" y2="23" stroke="#D4D4D8" strokeWidth="1.6" strokeLinecap="round" className="wave-bar wave-3" />
    <line x1="33.5" y1="17" x2="33.5" y2="21" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" className="wave-bar wave-4" />
  </svg>
);

/**
 * 3. Chat Icon
 * Distinctive geometric speech bubble with depth highlights and dialogue tokens.
 */
export const ChatGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 36,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mono-glass-icon icon-chat ${className}`}
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="chatGrad" x1="10" y1="8" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#71717A" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* Secondary Depth Layer Bubble */}
    <path
      d="M28 14H29.5C31.4 14 33 15.6 33 17.5V23.5C33 25.4 31.4 27 29.5 27H28V30.5L24 27"
      stroke="#71717A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.7"
      fill="rgba(255, 255, 255, 0.03)"
    />

    {/* Primary Foreground Geometric Speech Bubble */}
    <path
      d="M9 9H25C26.9 9 28.5 10.6 28.5 12.5V21.5C28.5 23.4 26.9 25 25 25H16L10 29.5V25H9C7.1 25 5.5 23.4 5.5 21.5V12.5C5.5 10.6 7.1 9 9 9Z"
      stroke="url(#chatGrad)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(255, 255, 255, 0.07)"
    />

    {/* Interior Geometric Conversation Tokens */}
    <circle cx="12" cy="17" r="1.6" fill="#FFFFFF" />
    <circle cx="17" cy="17" r="1.6" fill="#D4D4D8" />
    <circle cx="22" cy="17" r="1.6" fill="#A1A1AA" />
  </svg>
);

/**
 * 4. 30-Second Doctor Brief Icon
 * Structured document/checklist icon with subtle scanning beam and verified checkmark.
 */
export const DoctorBriefGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 36,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mono-glass-icon icon-doctor-brief ${className}`}
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="docGrad" x1="10" y1="7" x2="30" y2="33" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#71717A" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="scanGrad" x1="0" y1="0" x2="20" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Document Body */}
    <rect
      x="9"
      y="7.5"
      width="22"
      height="26"
      rx="3"
      stroke="url(#docGrad)"
      strokeWidth="1.8"
      fill="rgba(255, 255, 255, 0.06)"
    />

    {/* Top Binder Clip */}
    <path
      d="M15 7.5V5.5C15 4.7 15.7 4 16.5 4H23.5C24.3 4 25 4.7 25 5.5V7.5"
      stroke="url(#docGrad)"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="rgba(255, 255, 255, 0.15)"
    />

    {/* Structured Checklist Rows */}
    <line x1="14" y1="14" x2="26" y2="14" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="14" y1="19" x2="23" y2="19" stroke="#D4D4D8" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="14" y1="24" x2="20" y2="24" stroke="#A1A1AA" strokeWidth="1.6" strokeLinecap="round" />

    {/* Verification Badge */}
    <path
      d="M22.5 24L24.5 26L28 22"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Scanning Line Reveal Beam */}
    <line x1="11" y1="16" x2="29" y2="16" stroke="url(#scanGrad)" strokeWidth="1.2" className="doc-scan-beam" />
  </svg>
);

/**
 * 5. Health Memory Icon
 * Distinctive monochrome connected-memory symbol:
 * Central node combined with balanced linked-node, circuit, and brain-like synaptic geometry.
 */
export const HealthMemoryGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 36,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mono-glass-icon icon-health-memory ${className}`}
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="memoryGrad" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#71717A" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* Concentric Calibration Circles */}
    <circle cx="20" cy="20" r="16.5" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.35" />
    <circle cx="20" cy="20" r="11" stroke="#D4D4D8" strokeWidth="0.9" strokeOpacity="0.3" />

    {/* Balanced Octagonal / Diamond Interconnect Matrix */}
    <polygon
      points="20,7 28,12 33,20 28,28 20,33 12,28 7,20 12,12"
      stroke="url(#memoryGrad)"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="rgba(255, 255, 255, 0.04)"
    />

    {/* Symmetrical Inner Circuit Traces */}
    <line x1="20" y1="7" x2="20" y2="33" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="1.5 1.5" strokeOpacity="0.4" />
    <line x1="7" y1="20" x2="33" y2="20" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="1.5 1.5" strokeOpacity="0.4" />
    <line x1="12" y1="12" x2="28" y2="28" stroke="#D4D4D8" strokeWidth="0.8" strokeOpacity="0.3" />
    <line x1="12" y1="28" x2="28" y2="12" stroke="#D4D4D8" strokeWidth="0.8" strokeOpacity="0.3" />

    {/* Satellite Linked Nodes */}
    <circle cx="20" cy="7" r="1.8" fill="#FFFFFF" />
    <circle cx="33" cy="20" r="1.8" fill="#FFFFFF" />
    <circle cx="20" cy="33" r="1.8" fill="#FFFFFF" />
    <circle cx="7" cy="20" r="1.8" fill="#FFFFFF" />
    <circle cx="12" cy="12" r="1.4" fill="#D4D4D8" />
    <circle cx="28" cy="12" r="1.4" fill="#D4D4D8" />
    <circle cx="28" cy="28" r="1.4" fill="#D4D4D8" />
    <circle cx="12" cy="28" r="1.4" fill="#D4D4D8" />

    {/* Stable Central Node Nucleus */}
    <circle cx="20" cy="20" r="4.2" fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="1.4" />
    <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" className="memory-core-pulse" />
  </svg>
);

/**
 * 6. Medical & Report Explainer Icon
 * Diagnostic document symbol paired with a clear question-mark / clarity inquiry symbol.
 */
export const ReportExplainerGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 36,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mono-glass-icon icon-report-explainer ${className}`}
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="explainerGrad" x1="8" y1="4" x2="30" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#71717A" stopOpacity="0.8" />
      </linearGradient>
      <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.04" />
      </radialGradient>
    </defs>

    {/* Diagnostic Report Document */}
    <path
      d="M9 6C9 4.9 9.9 4 11 4H21.5L29 11.5V32C29 33.1 28.1 34 27 34H11C9.9 34 9 33.1 9 32V6Z"
      stroke="url(#explainerGrad)"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="rgba(255, 255, 255, 0.05)"
    />
    {/* Fold Flap */}
    <path d="M21.5 4V11.5H29" stroke="url(#explainerGrad)" strokeWidth="1.6" strokeLinejoin="round" />

    {/* Background Lab Report Rows */}
    <line x1="13" y1="9.5" x2="18.5" y2="9.5" stroke="#A1A1AA" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="13" y1="13.5" x2="19.5" y2="13.5" stroke="#71717A" strokeWidth="1.4" strokeLinecap="round" />

    {/* Central Diagnostic Clarity Lens with Question Mark */}
    <circle
      cx="19.5"
      cy="23"
      r="7"
      stroke="#FFFFFF"
      strokeWidth="1.7"
      fill="url(#lensGlow)"
    />

    {/* Question Mark Glyph */}
    <path
      d="M17.5 21C17.5 19.8 18.4 18.9 19.6 18.9C20.8 18.9 21.7 19.7 21.7 20.8C21.7 22.1 20.2 22.7 19.6 23.6V24.3"
      stroke="#FFFFFF"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="19.6" cy="26.3" r="1.1" fill="#FFFFFF" />

    {/* Subtle Lens Focus Handle */}
    <line x1="24.5" y1="28" x2="28.5" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * 7. Right Doctor Icon (Distinguished Composition)
 * Balanced medical professional & stethoscope symbol with distinguished halo/crest.
 */
export const RightDoctorGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 36,
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mono-glass-icon icon-right-doctor distinguished-icon ${className}`}
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient id="doctorGrad" x1="10" y1="6" x2="30" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="100%" stopColor="#A1A1AA" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id="crestGrad" x1="20" y1="3" x2="20" y2="37" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* Distinguished Outer Circular Emblem Crest */}
    <circle cx="20" cy="20" r="17.5" stroke="url(#crestGrad)" strokeWidth="1" strokeDasharray="3 2" />

    {/* Physician Silhouette */}
    <circle
      cx="20"
      cy="10"
      r="4.2"
      stroke="url(#doctorGrad)"
      strokeWidth="1.9"
      fill="rgba(255, 255, 255, 0.12)"
    />

    {/* Physician Shoulders & Collar */}
    <path
      d="M10.5 28C10.5 22.8 14.5 19.5 20 19.5C25.5 19.5 29.5 22.8 29.5 28"
      stroke="url(#doctorGrad)"
      strokeWidth="1.9"
      strokeLinecap="round"
      fill="rgba(255, 255, 255, 0.05)"
    />

    {/* Integrated Clinical Stethoscope Motif */}
    <path
      d="M15.5 18V21.5C15.5 24 17.5 26 20 26C22.5 26 24.5 24 24.5 21.5V18"
      stroke="#FFFFFF"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Acoustic Chest Piece / Match Emblem */}
    <circle cx="20" cy="28.5" r="2.8" fill="#FFFFFF" />
    <circle cx="20" cy="28.5" r="4.6" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);
