import React from 'react';

export interface MonochromeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  active?: boolean;
}

/**
 * 1. Body Map Icon
 * Visual Source of Truth: Anatomic human silhouette, circular radar reticle,
 * four corner target brackets, horizontal reticle ticks, and pinpoint anatomical nodes.
 * Strictly monochrome: Dark monochrome when inactive, white monochrome when active.
 */
export const BodyMapGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 24,
  className = '',
  active = false,
  ...props
}) => {
  const primaryStroke = active ? '#000000' : '#09090B';
  const secondaryStroke = active ? 'rgba(0, 0, 0, 0.75)' : 'rgba(9, 9, 11, 0.65)';
  const subtleStroke = active ? 'rgba(0, 0, 0, 0.28)' : 'rgba(9, 9, 11, 0.2)';
  const nodeFill = active ? '#000000' : '#09090B';
  const bodyFill = active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(9, 9, 11, 0.06)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`medvidhi-feature-svg icon-body-map ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Circular Radar Reticle Ring */}
      <circle
        cx="24"
        cy="24"
        r="16.5"
        stroke={subtleStroke}
        strokeWidth="1.1"
      />

      {/* 4 Corner L-Brackets */}
      <path
        d="M10 14H13 M10 14V17"
        stroke={secondaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M38 14H35 M38 14V17"
        stroke={secondaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M10 34H13 M10 34V31"
        stroke={secondaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M38 34H35 M38 34V31"
        stroke={secondaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Horizontal Reticle Crosshair Ticks */}
      <line
        x1="6.5"
        y1="24"
        x2="10.5"
        y2="24"
        stroke={secondaryStroke}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="37.5"
        y1="24"
        x2="41.5"
        y2="24"
        stroke={secondaryStroke}
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Human Head Contour */}
      <circle
        cx="24"
        cy="10.8"
        r="3"
        stroke={primaryStroke}
        strokeWidth="1.6"
        fill={bodyFill}
      />

      {/* Anatomic Human Body Silhouette */}
      <path
        d="M22.5 13.8C20.6 14.3 19 15.7 18.2 17.6L16.4 25.8C16.1 26.8 17 27.5 17.8 27.1L19.2 22C19.7 23.8 20.2 25.5 19.8 27.8L19.4 37.2C19.3 38.3 20.2 39 21.2 39C21.8 39 22.3 38.2 22.6 37L23.4 29.8H24.6L25.4 37C25.7 38.2 26.2 39 26.8 39C27.8 39 28.7 38.3 28.6 37.2L28.2 27.8C27.8 25.5 28.3 23.8 28.8 22L30.2 27.1C31 27.5 31.9 26.8 31.6 25.8L29.8 17.6C29 15.7 27.4 14.3 25.5 13.8Z"
        stroke={primaryStroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={bodyFill}
      />

      {/* Anatomical Pinpoint Nodes */}
      <circle cx="24" cy="10.8" r="1.2" fill={nodeFill} />
      <circle cx="24" cy="18" r="1.3" fill={nodeFill} />
      <circle cx="24" cy="24.8" r="1.2" fill={nodeFill} />
      <circle cx="21.6" cy="32.8" r="1.1" fill={nodeFill} />
      <circle cx="26.4" cy="35" r="1.1" fill={nodeFill} />
    </svg>
  );
};

/**
 * 2. Voice Icon
 * Visual Source of Truth: Central microphone capsule, U-cradle, vertical stem,
 * horizontal base, and dual acoustic waveform arcs.
 * Strictly monochrome: Dark monochrome when inactive, white monochrome when active.
 */
export const VoiceGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 24,
  className = '',
  active = false,
  ...props
}) => {
  const primaryStroke = active ? '#000000' : '#09090B';
  const secondaryStroke = active ? 'rgba(0, 0, 0, 0.8)' : 'rgba(9, 9, 11, 0.7)';
  const tertiaryStroke = active ? 'rgba(0, 0, 0, 0.5)' : 'rgba(9, 9, 11, 0.4)';
  const bodyFill = active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(9, 9, 11, 0.06)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`medvidhi-feature-svg icon-voice ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Microphone Capsule */}
      <rect
        x="19.5"
        y="9.5"
        width="9"
        height="16"
        rx="4.5"
        stroke={primaryStroke}
        strokeWidth="1.8"
        fill={bodyFill}
      />

      {/* Capsule Grille Slit & Highlight */}
      <line
        x1="22"
        y1="13"
        x2="26"
        y2="13"
        stroke={secondaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="16"
        x2="26"
        y2="16"
        stroke={tertiaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* U-Shaped Acoustic Cradle */}
      <path
        d="M15 20C15 25.5 19 29.5 24 29.5C29 29.5 33 25.5 33 20"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Central Stem & Base */}
      <line
        x1="24"
        y1="29.5"
        x2="24"
        y2="36"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="36"
        x2="30"
        y2="36"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Flanking Acoustic Arcs */}
      <path
        d="M11 17C9.3 19.2 9.3 22.8 11 25"
        stroke={secondaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 14C4.6 17.5 4.6 24.5 7 28"
        stroke={tertiaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M37 17C38.7 19.2 38.7 22.8 37 25"
        stroke={secondaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M41 14C43.4 17.5 43.4 24.5 41 28"
        stroke={tertiaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * 3. Chat Icon
 * Visual Source of Truth: Speech bubble with bottom-left pointer tail,
 * and three dialogue dots.
 * Strictly monochrome: Dark monochrome when inactive, white monochrome when active.
 */
export const ChatGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 24,
  className = '',
  active = false,
  ...props
}) => {
  const primaryStroke = active ? '#000000' : '#09090B';
  const secondaryStroke = active ? 'rgba(0, 0, 0, 0.45)' : 'rgba(9, 9, 11, 0.3)';
  const dotFill = active ? '#000000' : '#09090B';
  const bodyFill = active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(9, 9, 11, 0.05)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`medvidhi-feature-svg icon-chat ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Speech Bubble with Smooth Pointer Tail */}
      <path
        d="M17.5 13H30.5C34.6 13 38 16.4 38 20.5C38 24.6 34.6 28 30.5 28H19.5L14 33.5V27.5C12.2 25.8 11 23.3 11 20.5C11 16.4 14.4 13 17.5 13Z"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={bodyFill}
      />

      {/* Subtle Inner Glass Highlight */}
      <path
        d="M18 14.8H30C33.5 14.8 36.2 17.4 36.2 20.5"
        stroke={secondaryStroke}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Three Dialogue Dots */}
      <circle cx="19.2" cy="20.5" r="1.8" fill={dotFill} />
      <circle cx="24.5" cy="20.5" r="1.8" fill={dotFill} />
      <circle cx="29.8" cy="20.5" r="1.8" fill={dotFill} />
    </svg>
  );
};

/**
 * 4. 30-Second Doctor Brief Icon
 * Visual Source of Truth: Document with folded top-right corner, summary lines,
 * verified badge with checkmark, and clock with hands.
 * Strictly monochrome: Dark monochrome when inactive, white monochrome when active.
 */
export const DoctorBriefGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 24,
  className = '',
  active = false,
  ...props
}) => {
  const primaryStroke = active ? '#000000' : '#09090B';
  const secondaryStroke = active ? 'rgba(0, 0, 0, 0.75)' : 'rgba(9, 9, 11, 0.6)';
  const badgeBg = '#FFFFFF';
  const badgeStroke = active ? '#000000' : '#09090B';
  const badgeCheck = active ? '#000000' : '#09090B';
  const bodyFill = active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(9, 9, 11, 0.05)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`medvidhi-feature-svg icon-doctor-brief ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Diagnostic Brief Document */}
      <path
        d="M14 10C14 8.9 14.9 8 16 8H28L34 14V25C34 25.5 33.7 26.2 33.2 26.5L33.2 32C33.2 33.1 32.3 34 31.2 34H16C14.9 34 14 33.1 14 32V10Z"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={bodyFill}
      />

      {/* Fold Flap */}
      <path
        d="M28 8V14H34"
        stroke={primaryStroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Upper Summary Lines */}
      <line
        x1="18.5"
        y1="16.5"
        x2="25"
        y2="16.5"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="18.5"
        y1="21.5"
        x2="23"
        y2="21.5"
        stroke={secondaryStroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Verified Circular Badge (Bottom Left) */}
      <circle
        cx="20"
        cy="29.5"
        r="4.2"
        stroke={badgeStroke}
        strokeWidth="1.4"
        fill={badgeBg}
      />
      {/* Badge Checkmark */}
      <path
        d="M18.2 29.5L19.5 30.8L22.2 28"
        stroke={badgeCheck}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Overlapping 30-Second Clock (Bottom Right) */}
      <circle
        cx="33.8"
        cy="29.5"
        r="6.2"
        stroke={badgeStroke}
        strokeWidth="1.6"
        fill={badgeBg}
      />
      {/* Clock Hands */}
      <line
        x1="33.8"
        y1="29.5"
        x2="33.8"
        y2="25.8"
        stroke={badgeCheck}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="33.8"
        y1="29.5"
        x2="37.2"
        y2="29.5"
        stroke={badgeCheck}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="33.8" cy="29.5" r="1.1" fill={badgeCheck} />
    </svg>
  );
};

/**
 * 5. Health Memory Icon
 * Visual Source of Truth: Orbital model with three interlocking elliptical orbits,
 * central nucleus, and nodes along orbits.
 * Strictly monochrome: Dark monochrome when inactive, white monochrome when active.
 */
export const HealthMemoryGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 24,
  className = '',
  active = false,
  ...props
}) => {
  const primaryStroke = active ? '#000000' : '#09090B';
  const nodeFill = active ? '#000000' : '#09090B';
  const nodeStroke = active ? 'rgba(0, 0, 0, 0.7)' : 'rgba(9, 9, 11, 0.6)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`medvidhi-feature-svg icon-health-memory ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Three Intersecting Elliptical Orbits */}
      <ellipse
        cx="24"
        cy="24"
        rx="16.5"
        ry="6.5"
        stroke={primaryStroke}
        strokeWidth="1.3"
        fill="none"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="16.5"
        ry="6.5"
        transform="rotate(60 24 24)"
        stroke={primaryStroke}
        strokeWidth="1.3"
        fill="none"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="16.5"
        ry="6.5"
        transform="rotate(-60 24 24)"
        stroke={primaryStroke}
        strokeWidth="1.3"
        fill="none"
      />

      {/* Central Nucleus */}
      <circle cx="24" cy="24" r="3.2" fill={nodeFill} />
      <circle cx="24" cy="24" r="5" stroke={primaryStroke} strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

      {/* 6 Orbital Nodes */}
      <circle cx="24" cy="9.7" r="1.6" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.5" />
      <circle cx="24" cy="38.3" r="1.6" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.5" />
      <circle cx="9.8" cy="20" r="1.6" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.5" />
      <circle cx="38.2" cy="20" r="1.6" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.5" />
      <circle cx="11.5" cy="30" r="1.6" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.5" />
      <circle cx="36.5" cy="30" r="1.6" fill={nodeFill} stroke={nodeStroke} strokeWidth="0.5" />
    </svg>
  );
};

/**
 * 6. Medical & Report Explainer Icon
 * Visual Source of Truth: Medical report document sheet with ECG waveform,
 * diagnostic text lines, and magnifying glass.
 * Strictly monochrome: Dark monochrome when inactive, white monochrome when active.
 */
export const ReportExplainerGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 24,
  className = '',
  active = false,
  ...props
}) => {
  const primaryStroke = active ? '#000000' : '#09090B';
  const secondaryStroke = active ? 'rgba(0, 0, 0, 0.75)' : 'rgba(9, 9, 11, 0.6)';
  const tertiaryStroke = active ? 'rgba(0, 0, 0, 0.5)' : 'rgba(9, 9, 11, 0.4)';
  const lensBg = '#FFFFFF';
  const bodyFill = active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(9, 9, 11, 0.05)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`medvidhi-feature-svg icon-report-explainer ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Medical Report Document Outline */}
      <path
        d="M14 9C14 7.9 14.9 7 16 7H27L34 14V34C34 35.1 33.1 36 32 36H16C14.9 36 14 35.1 14 34V9Z"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={bodyFill}
      />

      {/* Corner Fold */}
      <path
        d="M27 7V14H34"
        stroke={primaryStroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* ECG Heartbeat Waveform Line */}
      <path
        d="M17.5 18H20.5L22 14.5L23.5 21.5L25 16.5L26 18H29.5"
        stroke={primaryStroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Structured Lab Lines Below ECG */}
      <line
        x1="18"
        y1="23.5"
        x2="25"
        y2="23.5"
        stroke={primaryStroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="27"
        x2="24"
        y2="27"
        stroke={secondaryStroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="30.5"
        x2="22"
        y2="30.5"
        stroke={tertiaryStroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Diagnostic Magnifying Glass Rim (Bottom Right) */}
      <circle
        cx="31"
        cy="29.5"
        r="5.8"
        stroke={primaryStroke}
        strokeWidth="1.6"
        fill={lensBg}
      />
      {/* Lens Inner Ring */}
      <circle
        cx="31"
        cy="29.5"
        r="4.2"
        stroke={secondaryStroke}
        strokeWidth="1.3"
        fill="none"
      />
      {/* Magnifier Diagonal Handle */}
      <line
        x1="35.2"
        y1="33.7"
        x2="39.5"
        y2="38"
        stroke={primaryStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * 7. Right Doctor Icon
 * Visual Source of Truth: Target crosshair circle with four reticle ticks,
 * physician silhouette with coat/collar and stethoscope.
 * Strictly monochrome: Dark monochrome when inactive, white monochrome when active.
 */
export const RightDoctorGlassIcon: React.FC<MonochromeIconProps> = ({
  size = 24,
  className = '',
  active = false,
  ...props
}) => {
  const primaryStroke = active ? '#000000' : '#09090B';
  const secondaryStroke = active ? 'rgba(0, 0, 0, 0.8)' : 'rgba(9, 9, 11, 0.7)';
  const bodyFill = active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(9, 9, 11, 0.05)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`medvidhi-feature-svg icon-right-doctor ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Circular Target Ring */}
      <circle
        cx="24"
        cy="24"
        r="15"
        stroke={primaryStroke}
        strokeWidth="1.4"
        strokeOpacity={active ? 0.8 : 0.65}
        fill="none"
      />

      {/* 4 Reticle Ticks (North, South, East, West) */}
      <line
        x1="24"
        y1="5.5"
        x2="24"
        y2="10"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="38"
        x2="24"
        y2="42.5"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="5.5"
        y1="24"
        x2="10"
        y2="24"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="38"
        y1="24"
        x2="42.5"
        y2="24"
        stroke={primaryStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Physician Head Contour */}
      <circle
        cx="24"
        cy="18.5"
        r="3.6"
        stroke={primaryStroke}
        strokeWidth="1.6"
        fill={bodyFill}
      />

      {/* Physician Shoulders / Lab Coat */}
      <path
        d="M16 32C16 27.2 19.5 24.5 24 24.5C28.5 24.5 32 27.2 32 32"
        stroke={primaryStroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill={bodyFill}
      />

      {/* Integrated Clinical Stethoscope */}
      <path
        d="M20 25V27.5C20 29.5 21.5 31 24 31C26.5 31 28 29.5 28 27.5V25"
        stroke={secondaryStroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Chestpiece Bell */}
      <circle cx="24" cy="31.8" r="1.3" fill={primaryStroke} />
    </svg>
  );
};
