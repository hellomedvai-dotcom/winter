import React from 'react';
import './PhoneFrame.css';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  isFloating?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  className = '',
  isFloating = true,
}) => {
  return (
    <div className={`vidhi-phone-showcase-container ${className}`}>
      {/* Outer ambient shadow glow */}
      <div className="vidhi-phone-ambient-shadow" aria-hidden="true" />

      {/* Main Titanium / Pearl-White Metallic Chassis */}
      <div className={`vidhi-phone-chassis ${isFloating ? 'is-floating' : ''}`}>
        {/* Antenna band accents */}
        <span className="vidhi-antenna-band band-top-left" aria-hidden="true" />
        <span className="vidhi-antenna-band band-top-right" aria-hidden="true" />
        <span className="vidhi-antenna-band band-bottom-left" aria-hidden="true" />
        <span className="vidhi-antenna-band band-bottom-right" aria-hidden="true" />

        {/* Side physical button accents */}
        <span className="vidhi-side-button btn-action" aria-hidden="true" />
        <span className="vidhi-side-button btn-vol-up" aria-hidden="true" />
        <span className="vidhi-side-button btn-vol-down" aria-hidden="true" />
        <span className="vidhi-side-button btn-power" aria-hidden="true" />

        {/* Inner display bezel */}
        <div className="vidhi-phone-screen-bezel">
          {/* Dynamic Island / TrueDepth camera housing */}
          <div className="vidhi-phone-island-slot" aria-hidden="true">
            <div className="vidhi-island-pill">
              <span className="island-lens-cluster">
                <span className="island-lens-ring" />
                <span className="island-lens-dot" />
              </span>
              <span className="island-sensor-dot" />
            </div>
          </div>

          {/* Screen Content Viewport */}
          <div className="vidhi-phone-screen-content">
            {children}

            {/* Bottom Home Indicator Bar */}
            <div className="vidhi-home-indicator-slot" aria-hidden="true">
              <span className="vidhi-home-indicator-bar" />
            </div>
          </div>

          {/* Glass Specular Sheen Overlay */}
          <div className="vidhi-glass-sheen" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};
