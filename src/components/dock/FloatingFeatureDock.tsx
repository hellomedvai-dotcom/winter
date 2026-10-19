import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  FEATURES_CONFIG,
  RIGHT_DOCTOR_FEATURE,
  FeatureItem,
} from '@/config/features';
import {
  BodyMapIcon,
  VoiceIcon,
  ChatIcon,
  DoctorBriefIcon,
  HealthMemoryIcon,
  ReportExplainerIcon,
  RightDoctorIcon,
} from './DockIcons';
import './FloatingFeatureDock.css';

export interface FloatingFeatureDockProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const renderFeatureIcon = (id: string, active: boolean) => {
  switch (id) {
    case 'body-map':
      return <BodyMapIcon active={active} />;
    case 'voice':
      return <VoiceIcon active={active} />;
    case 'chat':
      return <ChatIcon active={active} />;
    case 'doctor-brief':
      return <DoctorBriefIcon active={active} />;
    case 'health-memory':
      return <HealthMemoryIcon active={active} />;
    case 'report-explainer':
      return <ReportExplainerIcon active={active} />;
    case 'right-doctor':
      return <RightDoctorIcon active={active} />;
    default:
      return <ChatIcon active={active} />;
  }
};

export const FloatingFeatureDock: React.FC<FloatingFeatureDockProps> = ({
  isOpen: controlledIsOpen,
  onClose,
  className = '',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isDockOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Active / Hovered feature index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{ title: string; subtitle: string } | null>(null);

  // Position & drag management
  const dragControls = useDragControls();
  const dockRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Global listener for top navigation "Features" click
  useEffect(() => {
    const handleOpenEvent = () => {
      setInternalIsOpen(true);
    };

    const handleToggleEvent = () => {
      setInternalIsOpen((prev) => !prev);
    };

    window.addEventListener('medvidhi:open-feature-dock', handleOpenEvent);
    window.addEventListener('medvidhi:toggle-feature-dock', handleToggleEvent);

    return () => {
      window.removeEventListener('medvidhi:open-feature-dock', handleOpenEvent);
      window.removeEventListener('medvidhi:toggle-feature-dock', handleToggleEvent);
    };
  }, []);

  // Keyboard navigation: Escape key closes the dock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDockOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDockOpen]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [onClose]);

  // Navigate to feature anchor smoothly
  const handleItemClick = (feature: FeatureItem) => (e: React.MouseEvent) => {
    // Prevent accidental click if user just completed a drag
    if (isDraggingRef.current) {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(feature.anchor);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Magnification scale calculation (inspired by macOS / Cardboard.ai spatial dock)
  const getMagnificationScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.28; // Hovered item
    if (distance === 1) return 1.14; // Adjacent neighbor
    if (distance === 2) return 1.05; // 2nd neighbor
    return 1;
  };

  return (
    <AnimatePresence>
      {isDockOpen && (
        <motion.div
          ref={dockRef}
          className={`floating-spatial-dock ${className}`}
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{
            type: 'spring',
            damping: 24,
            stiffness: 280,
          }}
          drag
          dragControls={dragControls}
          dragListener={false} // Only drag via dedicated grab handle to prevent click theft!
          dragMomentum={false}
          dragConstraints={{
            left: -window.innerWidth / 3,
            right: window.innerWidth / 3,
            top: -window.innerHeight * 0.7,
            bottom: 20,
          }}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={() => {
            // Short grace period before clicks register again
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
          }}
          role="region"
          aria-label="MEDVIDHI Feature Application Dock"
        >
          {/* Active Hover Tooltip Card (Floats above dock) */}
          <AnimatePresence>
            {activeTooltip && (
              <motion.div
                className="dock-floating-tooltip"
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
              >
                <span className="tooltip-title">{activeTooltip.title}</span>
                <span className="tooltip-subtitle">{activeTooltip.subtitle}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dedicated Drag Handle / Safe Grab Area */}
          <div
            className="dock-drag-handle"
            onPointerDown={(e) => dragControls.start(e)}
            title="Drag to reposition dock"
            aria-label="Drag to reposition dock"
          >
            <span className="drag-handle-bar" />
          </div>

          {/* Primary 6 Features Container */}
          <div className="dock-primary-items" role="toolbar" aria-label="Core Health Features">
            {FEATURES_CONFIG.map((feature, idx) => {
              const scale = getMagnificationScale(idx);

              return (
                <motion.a
                  key={feature.id}
                  href={feature.anchor}
                  className="dock-item-btn"
                  onClick={handleItemClick(feature)}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    setActiveTooltip({
                      title: feature.name,
                      subtitle: feature.tagline,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setActiveTooltip(null);
                  }}
                  onFocus={() => {
                    setHoveredIndex(idx);
                    setActiveTooltip({
                      title: feature.name,
                      subtitle: feature.tagline,
                    });
                  }}
                  onBlur={() => {
                    setHoveredIndex(null);
                    setActiveTooltip(null);
                  }}
                  animate={{ scale }}
                  transition={{ type: 'spring', damping: 20, stiffness: 350 }}
                  aria-label={`${feature.name}: ${feature.tagline}`}
                  title={feature.name}
                >
                  <div className="dock-icon-wrapper">
                    {renderFeatureIcon(feature.id, hoveredIndex === idx)}
                  </div>
                  <span className="dock-item-dot" aria-hidden="true" />
                </motion.a>
              );
            })}
          </div>

          {/* Elegant Glass Divider */}
          <div className="dock-vertical-divider" aria-hidden="true" />

          {/* Distinct, Elevated Right Doctor Entry */}
          <div className="dock-specialist-entry">
            <motion.a
              href={RIGHT_DOCTOR_FEATURE.anchor}
              className="dock-item-btn dock-right-doctor-btn"
              onClick={handleItemClick(RIGHT_DOCTOR_FEATURE)}
              onMouseEnter={() => {
                setHoveredIndex(6);
                setActiveTooltip({
                  title: RIGHT_DOCTOR_FEATURE.name,
                  subtitle: RIGHT_DOCTOR_FEATURE.tagline,
                });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setActiveTooltip(null);
              }}
              onFocus={() => {
                setHoveredIndex(6);
                setActiveTooltip({
                  title: RIGHT_DOCTOR_FEATURE.name,
                  subtitle: RIGHT_DOCTOR_FEATURE.tagline,
                });
              }}
              onBlur={() => {
                setHoveredIndex(null);
                setActiveTooltip(null);
              }}
              animate={{ scale: getMagnificationScale(6) }}
              transition={{ type: 'spring', damping: 20, stiffness: 350 }}
              aria-label={`${RIGHT_DOCTOR_FEATURE.name}: ${RIGHT_DOCTOR_FEATURE.tagline}`}
              title={RIGHT_DOCTOR_FEATURE.name}
            >
              <div className="dock-icon-wrapper specialist-wrapper">
                {renderFeatureIcon('right-doctor', hoveredIndex === 6)}
              </div>
              <span className="specialist-badge-pill">Specialist</span>
            </motion.a>
          </div>

          {/* Dock Minimize / Close Button */}
          <button
            type="button"
            className="dock-close-btn"
            onClick={handleClose}
            aria-label="Minimize Feature Dock"
            title="Minimize Dock"
          >
            <span className="close-x">&times;</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
