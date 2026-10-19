import React from 'react';

export interface DockIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  color?: string;
  active?: boolean;
}

/**
 * 1. Body Map Icon
 * Clean human silhouette with subtle body segmentation and a restrained mint focal point.
 */
export const BodyMapIcon: React.FC<DockIconProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`dock-icon body-map-icon ${className}`}
    {...props}
  >
    {/* Head */}
    <circle cx="16" cy="6" r="3.2" stroke={color} strokeWidth="1.8" />
    
    {/* Torso & Shoulders */}
    <path
      d="M10.5 13.5C10.5 11.5 12 10.5 16 10.5C20 10.5 21.5 11.5 21.5 13.5V19.5C21.5 21 20.5 21.8 19 22.2L19 28.5M13 28.5L13 22.2C11.5 21.8 10.5 21 10.5 19.5V13.5Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Arms */}
    <path
      d="M10.5 13.5L7.5 19.5M21.5 13.5L24.5 19.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Restrained Mint Location Highlight Pulse */}
    <circle cx="16" cy="15.5" r="2.2" fill="currentColor" />
    <circle cx="16" cy="15.5" r="4.2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
);

/**
 * 2. Voice Icon
 * Abstract microphone form combined with balanced sound-wave bars and an animated listening motif.
 */
export const VoiceIcon: React.FC<DockIconProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`dock-icon voice-icon ${className}`}
    {...props}
  >
    {/* Central Mic Capsule */}
    <rect x="13" y="6" width="6" height="11" rx="3" stroke={color} strokeWidth="1.8" />
    
    {/* Acoustic Cradle */}
    <path
      d="M9 13.5C9 17.5 12 20.5 16 20.5C20 20.5 23 17.5 23 13.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    
    {/* Stand Base */}
    <line x1="16" y1="20.5" x2="16" y2="25.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="11.5" y1="25.5" x2="20.5" y2="25.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

    {/* Balanced Soundwave Elements with Mint Accent */}
    <line x1="5.5" y1="12" x2="5.5" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="26.5" y1="12" x2="26.5" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/**
 * 3. Chat Icon
 * Distinctive geometric conversation-bubble symbol with overlapping secondary bubble.
 */
export const ChatIcon: React.FC<DockIconProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`dock-icon chat-icon ${className}`}
    {...props}
  >
    {/* Primary Conversation Bubble */}
    <path
      d="M7 7.5H21C22.6569 7.5 24 8.84315 24 10.5V18.5C24 20.1569 22.6569 21.5 21 21.5H13L8 25.5V21.5H7C5.34315 21.5 4 20.1569 4 18.5V10.5C4 8.84315 5.34315 7.5 7 7.5Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Secondary Overlapping Bubble with Mint Pulse */}
    <path
      d="M24 13.5H25C26.6569 13.5 28 14.8431 28 16.5V22.5C28 24.1569 26.6569 25.5 25 25.5H24V28L20.5 25.5"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Interior Dialogue Indicator */}
    <circle cx="10" cy="14.5" r="1.2" fill={color} />
    <circle cx="14" cy="14.5" r="1.2" fill={color} />
    <circle cx="18" cy="14.5" r="1.2" fill="currentColor" />
  </svg>
);

/**
 * 4. 30-Second Doctor Brief Icon
 * Structured document/checklist with a progressive mint line and completion check.
 */
export const DoctorBriefIcon: React.FC<DockIconProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`dock-icon doctor-brief-icon ${className}`}
    {...props}
  >
    {/* Clipboard / Document Outline */}
    <rect x="7" y="6" width="18" height="21" rx="2.5" stroke={color} strokeWidth="1.8" />
    
    {/* Clipboard Clip */}
    <path
      d="M12 6V4.5C12 3.94772 12.4477 3.5 13 3.5H19C19.5523 3.5 20 3.94772 20 4.5V6"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Structured Document Content Lines */}
    <line x1="11" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="11" y1="16.5" x2="18" y2="16.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    
    {/* Progressive Mint Completion Line */}
    <line x1="11" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    
    {/* Quick Check Completion Symbol */}
    <path
      d="M18.5 21L20 22.5L23 19.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 5. Health Memory Icon
 * Refined brain/circuit connected-node symbol suggesting continuous context.
 */
export const HealthMemoryIcon: React.FC<DockIconProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`dock-icon health-memory-icon ${className}`}
    {...props}
  >
    {/* Brain Circuit Hemispheres */}
    <path
      d="M16 6C13.5 6 11 7.2 10 9.5C8 10 7 12 7 14C7 16 8 17.5 9 18.5C9 21 11 23 13.5 23.5L16 26"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M16 6C18.5 6 21 7.2 22 9.5C24 10 25 12 25 14C25 16 24 17.5 23 18.5C23 21 21 23 18.5 23.5L16 26"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Neural Interconnected Nodes */}
    <line x1="16" y1="7" x2="16" y2="25" stroke={color} strokeWidth="1.4" strokeDasharray="2 3" />
    <circle cx="16" cy="11" r="1.8" fill="currentColor" />
    <circle cx="12" cy="16" r="1.6" fill={color} />
    <circle cx="20" cy="16" r="1.6" fill={color} />
    <circle cx="16" cy="20" r="1.8" fill="currentColor" />

    {/* Synaptic Bridge Line */}
    <path d="M12 16L16 20L20 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/**
 * 6. Medical & Report Explainer Icon
 * Medical diagnostic document combined with magnifying clarity lens.
 */
export const ReportExplainerIcon: React.FC<DockIconProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`dock-icon report-explainer-icon ${className}`}
    {...props}
  >
    {/* Medical Page Fold */}
    <path
      d="M7 6C7 4.89543 7.89543 4 9 4H18L24 10V25C24 26.1046 23.1046 27 22 27H9C7.89543 27 7 26.1046 7 25V6Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M18 4V10H24" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />

    {/* Explainer Clarification Lens */}
    <circle cx="15" cy="17" r="4.5" stroke="currentColor" strokeWidth="1.8" />
    <line x1="18.5" y1="20.5" x2="22" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

    {/* Clarity Sparkle inside lens */}
    <line x1="13" y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="15" x2="15" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * 7. Right Doctor Icon (Separate, Visually Distinguished Entry)
 * Medical professional emblem with stethoscope motif and mint focal badge.
 */
export const RightDoctorIcon: React.FC<DockIconProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`dock-icon right-doctor-icon ${className}`}
    {...props}
  >
    {/* Physician Profile Outline */}
    <circle cx="16" cy="8.5" r="4" stroke={color} strokeWidth="1.8" />
    
    <path
      d="M8.5 24C8.5 19.5 11.5 16.5 16 16.5C20.5 16.5 23.5 19.5 23.5 24"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Stethoscope Integration */}
    <path
      d="M12.5 15.5V18C12.5 20.2 14.3 22 16.5 22C18.7 22 20.5 20.2 20.5 18V15.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    
    {/* Stethoscope Bell / Right Match Badge */}
    <circle cx="16.5" cy="24" r="2.2" fill="currentColor" />
  </svg>
);
