import React, { useRef } from 'react';
import {
  BodyMapGlassIcon,
  VoiceGlassIcon,
  ChatGlassIcon,
  DoctorBriefGlassIcon,
  HealthMemoryGlassIcon,
  ReportExplainerGlassIcon,
  RightDoctorGlassIcon,
} from './MonochromeFeatureIcons';
import './FeatureIconSelector.css';

interface FeatureIconEntry {
  id: string;
  targetId: string;
  label: string;
  index: string;
  isDistinguished?: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const FEATURE_ENTRIES: FeatureIconEntry[] = [
  {
    id: 'selector-body-map',
    targetId: 'feature-body-map',
    label: 'Body Map',
    index: '01',
    icon: BodyMapGlassIcon,
  },
  {
    id: 'selector-voice',
    targetId: 'feature-voice',
    label: 'Voice',
    index: '02',
    icon: VoiceGlassIcon,
  },
  {
    id: 'selector-chat',
    targetId: 'feature-chat',
    label: 'Chat',
    index: '03',
    icon: ChatGlassIcon,
  },
  {
    id: 'selector-doctor-brief',
    targetId: 'feature-doctor-brief',
    label: '30-Second Doctor Brief',
    index: '04',
    icon: DoctorBriefGlassIcon,
  },
  {
    id: 'selector-health-memory',
    targetId: 'feature-health-memory',
    label: 'Health Memory',
    index: '05',
    icon: HealthMemoryGlassIcon,
  },
  {
    id: 'selector-report-explainer',
    targetId: 'feature-report-explainer',
    label: 'Medical & Report Explainer',
    index: '06',
    icon: ReportExplainerGlassIcon,
  },
  {
    id: 'selector-right-doctor',
    targetId: 'feature-right-doctor',
    label: 'Right Doctor',
    index: '07',
    isDistinguished: true,
    icon: RightDoctorGlassIcon,
  },
];

export interface FeatureIconSelectorProps {
  activeFeatureId?: string;
  onSelectFeature?: (targetId: string) => void;
}

export const FeatureIconSelector: React.FC<FeatureIconSelectorProps> = ({
  activeFeatureId = 'feature-body-map',
  onSelectFeature,
}) => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelectFeature = (targetId: string) => (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (onSelectFeature) {
      onSelectFeature(targetId);
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    }
  };

  const handleKeyDown = (currentIndex: number) => (e: React.KeyboardEvent) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % FEATURE_ENTRIES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + FEATURE_ENTRIES.length) % FEATURE_ENTRIES.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = FEATURE_ENTRIES.length - 1;
    }

    if (nextIndex !== -1) {
      const nextEntry = FEATURE_ENTRIES[nextIndex];
      handleSelectFeature(nextEntry.targetId)();
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <nav
      className="feature-icon-selector-container"
      aria-label="MEDVIDHI Core Features In-Page Navigation"
    >
      <div className="feature-icon-selector-frame">
        {/* Topline Metadata */}
        <div className="feature-selector-topline">
          <div className="selector-brand-heading">
            <span className="selector-pulse-indicator" aria-hidden="true" />
            <span className="selector-brand-label">Feature Explorer</span>
          </div>
          <span className="selector-meta-hint">
            Select any capability to open its interactive floating preview
          </span>
        </div>

        {/* 7-Icon Balanced Horizontal Grid */}
        <div className="feature-icons-grid" role="tablist" aria-label="MEDVIDHI Core Features List">
          {FEATURE_ENTRIES.map((entry, idx) => {
            const IconComponent = entry.icon;
            const isSelected = activeFeatureId === entry.targetId;

            return (
              <button
                key={entry.id}
                ref={(el) => {
                  buttonRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={entry.id}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                aria-controls="feature-preview-window"
                className={`feature-icon-tile ${entry.isDistinguished ? 'is-distinguished' : ''} ${
                  isSelected ? 'is-active-tile' : ''
                }`}
                onClick={handleSelectFeature(entry.targetId)}
                onKeyDown={handleKeyDown(idx)}
                aria-label={`Select ${entry.label} preview`}
              >
                {entry.isDistinguished && (
                  <span className="distinguished-badge-pill" title="Clinical Domain Navigation" aria-hidden="true" />
                )}

                <div className="icon-glass-capsule">
                  <IconComponent size={28} />
                </div>

                <div className="feature-tile-text-col">
                  <span className="feature-tile-name">{entry.label}</span>
                  <span className="feature-tile-index">{entry.index}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
