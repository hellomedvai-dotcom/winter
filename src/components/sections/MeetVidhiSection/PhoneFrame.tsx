import React from 'react';
import './PhoneFrame.css';

interface PhoneFrameProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isActive = false,
  className = '',
}) => {
  return (
    <div
      className={`vidhi-phone-frame-wrapper ${isActive ? 'is-active-phone' : 'is-inactive-phone'} ${className}`}
    >
      {/* Outer titanium edge and bezel */}
      <div className="vidhi-phone-chassis">
        {/* Dynamic Island / Status Bar area */}
        <div className="vidhi-phone-island-slot">
          <div className="vidhi-island-pill">
            <span className="island-lens-dot" />
            <span className="island-sensor-dot" />
          </div>
        </div>

        {/* Screen Content Viewport */}
        <div className="vidhi-phone-screen">
          {children}

          {/* Bottom Home Indicator Bar */}
          <div className="vidhi-home-indicator-slot">
            <span className="vidhi-home-indicator-bar" />
          </div>
        </div>

        {/* Realistic subtle glass specular shine overlay */}
        <div className="vidhi-glass-sheen" aria-hidden="true" />
      </div>
    </div>
  );
};

