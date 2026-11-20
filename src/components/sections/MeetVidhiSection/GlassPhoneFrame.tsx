import React from 'react';
import './GlassPhoneFrame.css';

interface GlassPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  isFloating?: boolean;
}

export const GlassPhoneFrame: React.FC<GlassPhoneFrameProps> = ({
  children,
  className = '',
  isFloating = true,
}) => {
  return (
    <div className={`medvidhi-glass-device-wrapper ${className}`}>
      {/* Soft diffuse ambient shadow floating beneath */}
      <div className="glass-device-ambient-shadow" aria-hidden="true" />

      {/* Main Polished Transparent Glass Chassis */}
      <div className={`glass-device-chassis ${isFloating ? 'is-floating' : ''}`}>
        {/* Subtle glass side accents */}
        <span className="glass-side-notch notch-left" aria-hidden="true" />
        <span className="glass-side-notch notch-right" aria-hidden="true" />

        {/* Refined Frosted-Glass Display Rim */}
        <div className="glass-screen-bezel">
          {/* Dynamic Island with camera lens refraction */}
          <div className="glass-island-slot" aria-hidden="true">
            <div className="glass-island-pill">
              <span className="island-lens-optical">
                <span className="island-lens-core" />
              </span>
              <span className="island-sensor-dot" />
            </div>
          </div>

          {/* Internal Application Screen Viewport */}
          <div className="glass-screen-viewport">
            {children}

            {/* Bottom Home Indicator Bar */}
            <div className="glass-home-indicator-slot" aria-hidden="true">
              <span className="glass-home-indicator-bar" />
            </div>
          </div>

          {/* Slow reflective specular glass sheen */}
          <div className="glass-reflective-sheen" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default GlassPhoneFrame;
