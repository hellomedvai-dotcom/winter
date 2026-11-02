import React, { useRef, useState } from 'react';
import {
  BodyMapGlassIcon,
  VoiceGlassIcon,
  ChatGlassIcon,
  DoctorBriefGlassIcon,
  HealthMemoryGlassIcon,
  ReportExplainerGlassIcon,
  RightDoctorGlassIcon,
} from './MonochromeFeatureIcons';
import { SwipeHint } from '@/components/common/SwipeHint/SwipeHint';
import { useSwipeHint } from '@/lib/motion/useSwipeHint';
import './FeatureIconSelector.css';

interface FeatureIconEntry {
  id: string;
  targetId: string;
  label: string;
  index: string;
  isDistinguished?: boolean;
  icon: React.ComponentType<{ size?: number | string; className?: string; active?: boolean }>;
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeHint = useSwipeHint<HTMLDivElement>();

  const activeEntry =
    FEATURE_ENTRIES.find((entry) => entry.targetId === activeFeatureId) || FEATURE_ENTRIES[0];

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
    <div className="feature-explorer-wrapper">
      {/* 1. Clean External Section Heading & Instruction (Outside the dock) */}
      <div className="feature-explorer-header">
        <div className="feature-explorer-eyebrow">
          <span className="feature-explorer-pulse" aria-hidden="true" />
          <span className="feature-explorer-eyebrow-text">FEATURE EXPLORER</span>
        </div>
        <p className="feature-explorer-instruction">
          Select any capability to open its interactive floating preview
        </p>
      </div>

      {/* 2. Compact Floating Liquid Glass Dock */}
      <nav
        className="liquid-glass-dock-nav"
        aria-label="MEDVIDHI Core Features Floating Dock"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          className="liquid-glass-dock"
          role="tablist"
          aria-label="MEDVIDHI Core Features List"
          ref={swipeHint.rowRef}
          onScroll={swipeHint.onRowScroll}
        >
          {FEATURE_ENTRIES.map((entry, idx) => {
            const IconComponent = entry.icon;
            const isSelected = activeFeatureId === entry.targetId;
            const isHovered = hoveredIndex === idx;
            const isFocused = focusedIndex === idx;
            const isAdjacent = hoveredIndex !== null && Math.abs(hoveredIndex - idx) === 1;

            let magnificationClass = '';
            if (isHovered) {
              magnificationClass = 'is-hover-magnified';
            } else if (isAdjacent) {
              magnificationClass = 'is-adjacent-magnified';
            }

            const showTooltip = isHovered || isFocused;

            return (
              <div key={entry.id} className="dock-item-wrapper">
                {/* Floating Tooltip Pill (Above icon, visible on hover/focus) */}
                <div
                  id={`${entry.id}-tooltip`}
                  role="tooltip"
                  className={`liquid-dock-tooltip ${showTooltip ? 'is-visible' : ''}`}
                  aria-hidden={!showTooltip}
                >
                  <span className="liquid-dock-tooltip-label">{entry.label}</span>
                  <span className="liquid-dock-tooltip-arrow" aria-hidden="true" />
                </div>

                {/* Dock Icon Button */}
                <button
                  ref={(el) => {
                    buttonRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  id={entry.id}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  aria-controls="feature-preview-window"
                  aria-describedby={`${entry.id}-tooltip`}
                  className={`dock-icon-btn ${magnificationClass} ${
                    isSelected ? 'is-active-item' : ''
                  }`}
                  onClick={() => {
                    handleSelectFeature(entry.targetId)();
                    swipeHint.notify();
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onFocus={() => setFocusedIndex(idx)}
                  onBlur={() => setFocusedIndex(null)}
                  onKeyDown={handleKeyDown(idx)}
                  aria-label={`${entry.label}${isSelected ? ' (Selected)' : ''}`}
                >
                  <div className="dock-icon-inner">
                    <IconComponent size={26} active={isSelected} className="dock-svg-icon" />
                  </div>

                  {/* Active Indicator Dot under the icon */}
                  {isSelected && <span className="dock-active-dot" aria-hidden="true" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* 3. Mobile Active Feature Identification Strip */}
        <div className="dock-mobile-active-strip" aria-live="polite">
          <span className="mobile-active-label">Active:</span>
          <span className="mobile-active-name">{activeEntry.label}</span>
        </div>

        {/* 4. Swipe Hint if horizontally scrollable on mobile */}
        <div className="dock-swipe-hint-wrap">
          <SwipeHint active={swipeHint.active} label="Swipe features" />
        </div>
      </nav>
    </div>
  );
};

export default FeatureIconSelector;
