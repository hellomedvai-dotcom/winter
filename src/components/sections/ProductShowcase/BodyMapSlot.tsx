import React, { useState } from 'react';
import { Shield, Sparkles, Crosshair, Layers } from 'lucide-react';
import { BODY_MAP_CONTENT } from '@/config/showcaseContent';
import './BodyMapSlot.css';

export const BodyMapSlot: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('elbow');

  const selectedRegion = BODY_MAP_CONTENT.sampleRegions.find(
    (r) => r.id === selectedRegionId
  ) || BODY_MAP_CONTENT.sampleRegions[0];

  return (
    <section
      id="feature-body-map"
      className="showcase-feature-section theme-dark body-map-showcase-section"
      aria-label="Body Map Feature"
    >
      <div className="feature-section-inner">
        {/* Section Subhead & Eyebrow */}
        <div className="dark-feature-header">
          <div className="dark-badge-row">
            <span className="dark-mint-pill">
              <Crosshair size={13} className="pill-icon" />
              {BODY_MAP_CONTENT.badge}
            </span>
            <span className="dark-anchor-tag">#feature-body-map</span>
          </div>

          <h3 className="dark-feature-headline">
            Point to where it hurts.{' '}
            <span className="editorial-serif dark-serif-mint">Let context follow.</span>
          </h3>

          <p className="dark-feature-lead">{BODY_MAP_CONTENT.subhead}</p>
        </div>

        {/* Integration Ready Card */}
        <div className="body-map-integration-card">
          {/* Top Status Header */}
          <div className="body-map-card-topbar">
            <div className="slot-boundary-badge">
              <span className="boundary-pulse-dot" />
              <span className="boundary-label">{BODY_MAP_CONTENT.integrationNotice.status}</span>
            </div>
            <div className="slot-security-tag">
              <Shield size={14} className="security-icon" />
              <span>{BODY_MAP_CONTENT.integrationNotice.pill}</span>
            </div>
          </div>

          {/* Main Visual Preview Grid */}
          <div className="body-map-preview-grid">
            {/* Visual Anatomical Canvas (Static Silhouette Preview) */}
            <div className="body-map-silhouette-pane">
              <div className="silhouette-ambient-glow" />
              
              {/* SVG Anatomical Wireframe Silhouette */}
              <div className="silhouette-canvas" aria-hidden="true">
                <svg
                  viewBox="0 0 320 480"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="anatomical-wireframe-svg"
                >
                  <defs>
                    <linearGradient id="bodyWireGrad" x1="160" y1="20" x2="160" y2="460" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                      <stop offset="50%" stopColor="rgba(64, 217, 177, 0.4)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                    </linearGradient>
                    <radialGradient id="hotspotGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Head & Neck */}
                  <circle cx="160" cy="56" r="30" stroke="url(#bodyWireGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M152 86 L152 108 M168 86 L168 108" stroke="url(#bodyWireGrad)" strokeWidth="1.5" />

                  {/* Shoulders & Torso Outline */}
                  <path
                    d="M160 108 C135 110 108 122 96 138 L84 210 L74 278 M160 108 C185 110 212 122 224 138 L236 210 L246 278"
                    stroke="url(#bodyWireGrad)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M116 142 C124 190 126 240 132 284 L142 340 M204 142 C196 190 194 240 188 284 L178 340"
                    stroke="url(#bodyWireGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />

                  {/* Pelvis & Lower Extremities */}
                  <path
                    d="M132 284 C144 294 176 294 188 284 M142 340 L136 430 L132 458 M178 340 L184 430 L188 458"
                    stroke="url(#bodyWireGrad)"
                    strokeWidth="1.5"
                  />

                  {/* Right Arm Coordinate (Active Focal Point) */}
                  <g className="focal-marker focal-elbow" transform="translate(236, 210)">
                    <circle cx="0" cy="0" r="16" fill="url(#hotspotGlow)" className="pulse-aura" />
                    <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                    <line x1="0" y1="0" x2="45" y2="-20" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx="45" cy="-20" r="3" fill="#FFFFFF" />
                    <text x="52" y="-16" fill="#FFFFFF" fontSize="10" fontFamily="var(--font-family-mono)" fontWeight="600">
                      R. ELBOW PIN
                    </text>
                  </g>

                  {/* Lumbar Spine Marker */}
                  <g className="focal-marker focal-lumbar" transform="translate(160, 240)">
                    <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.6)" stroke="#080A0A" strokeWidth="1.5" />
                  </g>

                  {/* Cervical Neck Marker */}
                  <g className="focal-marker focal-cervical" transform="translate(160, 102)">
                    <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.6)" stroke="#080A0A" strokeWidth="1.5" />
                  </g>
                </svg>

                {/* Spatial Grid Reticle Lines */}
                <div className="spatial-reticle horizontal top" />
                <div className="spatial-reticle horizontal middle" />
                <div className="spatial-reticle horizontal bottom" />
                <div className="spatial-reticle vertical center" />
              </div>

              {/* Watermark Notice */}
              <div className="silhouette-overlay-caption">
                <span className="caption-mono">STATIC PREVIEW • 3D MMCIF / MOL* COMPONENT RESERVED</span>
              </div>
            </div>

            {/* Right Interactive Region Inspection Area */}
            <div className="body-map-details-pane">
              <div className="details-header">
                <span className="details-eyebrow">Spatial Coordinate Binding</span>
                <h4 className="details-title">Select Region to Inspect Localization</h4>
                <p className="details-text">
                  In the complete MEDVIDHI system, touching or clicking an anatomical landmark immediately
                  orients the follow-up dialogue and maps medical history to verified body regions.
                </p>
              </div>

              {/* Sample Region Selection Chips */}
              <div className="regions-chips-list" role="tablist" aria-label="Selectable anatomical regions">
                {BODY_MAP_CONTENT.sampleRegions.map((region) => {
                  const isSelected = region.id === selectedRegionId;
                  return (
                    <button
                      key={region.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      className={`region-chip-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedRegionId(region.id)}
                    >
                      <span className="chip-indicator" />
                      <span className="chip-name">{region.name}</span>
                      <span className="chip-status-tag">{region.status}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Region Data Inspector */}
              <div className="selected-region-card">
                <div className="region-card-header">
                  <div className="region-card-title-row">
                    <Crosshair size={16} className="text-white" />
                    <span className="region-card-name">{selectedRegion.name}</span>
                  </div>
                  <span className="region-coord-pill">{selectedRegion.coordinates}</span>
                </div>

                <div className="region-meta-grid">
                  <div className="region-meta-item">
                    <span className="meta-label">Downstream Flow</span>
                    <span className="meta-value">Pre-selects Extensor Tendon Examination</span>
                  </div>
                  <div className="region-meta-item">
                    <span className="meta-label">Voice / Chat Binding</span>
                    <span className="meta-value">Links “वस्तू उचलताना” to Lateral Epicondyle</span>
                  </div>
                  <div className="region-meta-item">
                    <span className="meta-label">Doctor Brief Mapping</span>
                    <span className="meta-value">Section 01 (Current Concern) &amp; Section 07</span>
                  </div>
                </div>

                <div className="region-connection-signal">
                  <Sparkles size={14} className="signal-icon" />
                  <span>
                    Selecting a region eliminates vague verbal directions (&ldquo;somewhere in my arm&rdquo;).
                  </span>
                </div>
              </div>

              {/* Alpha Drop-in Guarantee Note */}
              <div className="body-map-dropin-note">
                <Layers size={16} className="note-icon" />
                <p className="note-text">
                  <strong>Protected Implementation:</strong> The verified Body Map from the Alpha project
                  plugs into this container with zero layout shifts or dock reconfigurations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
