import React, { useState } from 'react';
import { BodyRegionDefinition, BodyView, RecordedRegionIssue, HandSubregionDefinition, AnatomicalSide } from '@/types/bodymap';
import { ALL_BODY_REGIONS } from '@/config/bodyRegions';
import { InlineHandMagnifier } from './InlineHandMagnifier';

interface ActiveConditionDraft {
  primaryIssue: string;
  swellingExtent?: string;
  skinColor?: string;
  warmth?: boolean;
}

interface AnatomicalFigureProps {
  view: BodyView;
  selectedRegion: BodyRegionDefinition | null;
  hoveredRegion: BodyRegionDefinition | null;
  recordedIssues: RecordedRegionIssue[];
  activeCondition?: ActiveConditionDraft;
  selectedSubregion?: HandSubregionDefinition | null;
  onSelectRegion: (region: BodyRegionDefinition) => void;
  onHoverRegion: (region: BodyRegionDefinition | null) => void;
  onSelectSubregion?: (sub: HandSubregionDefinition | null) => void;
  onRequestHandMagnifier?: (side: AnatomicalSide) => void;
}

export const AnatomicalFigure: React.FC<AnatomicalFigureProps> = ({
  view,
  selectedRegion,
  hoveredRegion,
  recordedIssues,
  activeCondition,
  selectedSubregion,
  onSelectRegion,
  onHoverRegion,
  onSelectSubregion,
}) => {
  const [showHandMagnifier, setShowHandMagnifier] = useState<boolean>(false);
  const [magnifierSide, setMagnifierSide] = useState<AnatomicalSide>('right');

  // Close hand magnifier whenever user toggles Front/Back view
  React.useEffect(() => {
    setShowHandMagnifier(false);
  }, [view]);

  const isSelected = (id: string) => selectedRegion?.id === id;
  const isHovered = (id: string) => hoveredRegion?.id === id;

  const handleRegionClick = (e: React.MouseEvent, regionId: string) => {
    e.stopPropagation();
    const region = ALL_BODY_REGIONS.find((r) => r.id === regionId);
    if (region) {
      onSelectRegion(region);
      // Hand regions behave like standard regions without getting stuck
      if (region.side === 'left') {
        setMagnifierSide('left');
      } else {
        setMagnifierSide('right');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, regionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const region = ALL_BODY_REGIONS.find((r) => r.id === regionId);
      if (region) {
        onSelectRegion(region);
        if (region.side === 'left') {
          setMagnifierSide('left');
        } else {
          setMagnifierSide('right');
        }
      }
    }
  };

  const handleRegionHover = (regionId: string | null) => {
    if (!regionId) {
      onHoverRegion(null);
      return;
    }
    const region = ALL_BODY_REGIONS.find((r) => r.id === regionId);
    onHoverRegion(region || null);
  };

  const getRegionClass = (id: string, isJoint: boolean = false) => {
    const selected = isSelected(id);
    const hovered = isHovered(id);

    if (selected) {
      return 'bodymap-svg-target is-selected';
    }
    if (hovered) {
      return 'bodymap-svg-target is-hovered';
    }
    return isJoint ? 'bodymap-svg-target is-joint-idle' : 'bodymap-svg-target is-limb-idle';
  };

  // Determine active visual glow color based on patient-reported concern
  const activeOverlayType = activeCondition?.primaryIssue || 'pain';
  let lensGlowGrad = 'url(#lensPainGrad)';
  let glowOuterColor = 'rgba(255, 170, 0, 0.35)';

  if (
    activeOverlayType === 'color_change' ||
    activeCondition?.skinColor === 'red' ||
    activeCondition?.warmth
  ) {
    lensGlowGrad = 'url(#lensRedGrad)';
    glowOuterColor = 'rgba(255, 42, 75, 0.45)';
  } else if (activeOverlayType === 'swelling') {
    lensGlowGrad = 'url(#lensSwellingGrad)';
    glowOuterColor = 'rgba(95, 215, 255, 0.45)';
  } else if (activeCondition?.skinColor === 'blue_purple') {
    lensGlowGrad = 'url(#lensBruiseGrad)';
    glowOuterColor = 'rgba(155, 81, 224, 0.45)';
  }

  // Filter recorded issues matching current view
  const visibleRecordedIssues = recordedIssues.filter((issue) => {
    const regionDef = ALL_BODY_REGIONS.find((r) => r.id === issue.regionId);
    if (!regionDef) return false;
    if (regionDef.view === 'both') return true;
    return regionDef.view === view;
  });

  const pin = selectedRegion?.pinCoordinates || { x: 384, y: 512 };

  return (
    <div className="bodymap-stage-viewport" role="region" aria-label="Interactive Realistic Body Map">
      {/* 1. Subtle Transparent Glass Disc / Pedestal beneath feet */}
      <div className="bodymap-pedestal-container" aria-hidden="true">
        <div className="pedestal-shadow" />
        <div className="pedestal-glass-disc">
          <div className="pedestal-inner-ring" />
          <div className="pedestal-core-glow" />
          <div className="pedestal-specular-edge" />
        </div>
      </div>

      {/* 2. Visual Human Figure Backdrop (Natural lighting on high-contrast black stage) */}
      <div className="bodymap-figure-backdrop" aria-hidden="true">
        <div className="figure-canvas-container">
          <img
            src={view === 'front' ? '/models/bodymap-front.png' : '/models/bodymap-back.png'}
            alt={`Realistic male body ${view} view on black stage`}
            className="figure-silhouette-img"
            loading="eager"
          />
        </div>
      </div>

      {/* 3. High-Precision Interactive SVG Hit Areas & Glass Lens */}
      <div className="bodymap-svg-overlay-container">
        <svg
          viewBox="0 0 768 1024"
          className="bodymap-interaction-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-label={`Interactive anatomical hit map, ${view} view`}
        >
          <defs>
            {/* LENS SOFT GLOW GRADIENTS */}
            <radialGradient id="lensPainGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#FF7700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="lensRedGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF2A4B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#E6002A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#770014" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="lensSwellingGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5FD7FF" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#00A2E8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#005B8C" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="lensBruiseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9B51E0" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#4A148C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1A237E" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="lensWhiteFocused" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ================================================================= */}
          {/* HIT AREAS LAYER                                                   */}
          {/* ================================================================= */}
          {view === 'front' ? (
            <g id="front-anatomy-layer">
              {/* Forehead & Cranium */}
              <path
                id="svg-front-head"
                d="M 345,55 C 345,35 423,35 423,55 C 423,80 415,86 384,86 C 353,86 345,80 345,55 Z"
                className={getRegionClass('head')}
                onClick={(e) => handleRegionClick(e, 'head')}
                onMouseEnter={() => handleRegionHover('head')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'head')}
                tabIndex={0}
                role="button"
                aria-label="Forehead and Cranium"
              />

              {/* Eyes & Brow */}
              <circle
                id="svg-front-right-eye"
                cx="362"
                cy="92"
                r="14"
                className={getRegionClass('right_eye', true)}
                onClick={(e) => handleRegionClick(e, 'right_eye')}
                onMouseEnter={() => handleRegionHover('right_eye')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_eye')}
                tabIndex={0}
                role="button"
                aria-label="Right Eye Area"
              />
              <circle
                id="svg-front-left-eye"
                cx="406"
                cy="92"
                r="14"
                className={getRegionClass('left_eye', true)}
                onClick={(e) => handleRegionClick(e, 'left_eye')}
                onMouseEnter={() => handleRegionHover('left_eye')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_eye')}
                tabIndex={0}
                role="button"
                aria-label="Left Eye Area"
              />

              {/* Nose */}
              <path
                id="svg-front-nose"
                d="M 376,96 L 392,96 L 395,116 L 373,116 Z"
                className={getRegionClass('nose')}
                onClick={(e) => handleRegionClick(e, 'nose')}
                onMouseEnter={() => handleRegionHover('nose')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'nose')}
                tabIndex={0}
                role="button"
                aria-label="Nose and Bridge"
              />

              {/* Cheeks */}
              <path
                id="svg-front-right-cheek"
                d="M 342,105 C 342,105 365,105 365,128 C 365,135 342,135 342,120 Z"
                className={getRegionClass('right_cheek')}
                onClick={(e) => handleRegionClick(e, 'right_cheek')}
                onMouseEnter={() => handleRegionHover('right_cheek')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_cheek')}
                tabIndex={0}
                role="button"
                aria-label="Right Cheek and Zygoma"
              />
              <path
                id="svg-front-left-cheek"
                d="M 403,105 C 403,105 426,105 426,120 C 426,135 403,135 403,128 Z"
                className={getRegionClass('left_cheek')}
                onClick={(e) => handleRegionClick(e, 'left_cheek')}
                onMouseEnter={() => handleRegionHover('left_cheek')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_cheek')}
                tabIndex={0}
                role="button"
                aria-label="Left Cheek and Zygoma"
              />

              {/* Ears */}
              <path
                id="svg-front-right-ear"
                d="M 330,85 C 322,85 322,115 330,122 L 338,118 L 338,90 Z"
                className={getRegionClass('right_ear')}
                onClick={(e) => handleRegionClick(e, 'right_ear')}
                onMouseEnter={() => handleRegionHover('right_ear')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_ear')}
                tabIndex={0}
                role="button"
                aria-label="Right Ear"
              />
              <path
                id="svg-front-left-ear"
                d="M 438,85 C 446,85 446,115 438,122 L 430,118 L 430,90 Z"
                className={getRegionClass('left_ear')}
                onClick={(e) => handleRegionClick(e, 'left_ear')}
                onMouseEnter={() => handleRegionHover('left_ear')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_ear')}
                tabIndex={0}
                role="button"
                aria-label="Left Ear"
              />

              {/* Jaw & Chin */}
              <path
                id="svg-front-jaw"
                d="M 350,130 L 418,130 C 418,145 398,155 384,155 C 370,155 350,145 350,130 Z"
                className={getRegionClass('jaw')}
                onClick={(e) => handleRegionClick(e, 'jaw')}
                onMouseEnter={() => handleRegionHover('jaw')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'jaw')}
                tabIndex={0}
                role="button"
                aria-label="Jaw and Mandible"
              />

              {/* Neck & Anterior Throat */}
              <path
                id="svg-front-neck"
                d="M 358,155 L 410,155 L 420,195 C 398,200 370,200 348,195 Z"
                className={getRegionClass('neck')}
                onClick={(e) => handleRegionClick(e, 'neck')}
                onMouseEnter={() => handleRegionHover('neck')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'neck')}
                tabIndex={0}
                role="button"
                aria-label="Neck and Anterior Throat"
              />

              {/* Torso: Shoulders */}
              <circle
                id="svg-front-right-shoulder"
                cx="298"
                cy="235"
                r="26"
                className={getRegionClass('right_shoulder', true)}
                onClick={(e) => handleRegionClick(e, 'right_shoulder')}
                onMouseEnter={() => handleRegionHover('right_shoulder')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_shoulder')}
                tabIndex={0}
                role="button"
                aria-label="Right Shoulder"
              />
              <circle
                id="svg-front-left-shoulder"
                cx="468"
                cy="235"
                r="26"
                className={getRegionClass('left_shoulder', true)}
                onClick={(e) => handleRegionClick(e, 'left_shoulder')}
                onMouseEnter={() => handleRegionHover('left_shoulder')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_shoulder')}
                tabIndex={0}
                role="button"
                aria-label="Left Shoulder"
              />

              {/* Chest: Right Pectoral, Left Pectoral & Midline */}
              <path
                id="svg-front-right-chest"
                d="M 320,205 C 345,200 372,205 372,205 L 372,295 C 340,295 320,280 315,250 Z"
                className={getRegionClass('right_chest')}
                onClick={(e) => handleRegionClick(e, 'right_chest')}
                onMouseEnter={() => handleRegionHover('right_chest')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_chest')}
                tabIndex={0}
                role="button"
                aria-label="Right Chest Pectoral"
              />
              <path
                id="svg-front-left-chest"
                d="M 396,205 C 396,205 423,200 448,205 C 453,250 433,295 396,295 Z"
                className={getRegionClass('left_chest')}
                onClick={(e) => handleRegionClick(e, 'left_chest')}
                onMouseEnter={() => handleRegionHover('left_chest')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_chest')}
                tabIndex={0}
                role="button"
                aria-label="Left Chest and Precordium"
              />
              <path
                id="svg-front-chest-mid"
                d="M 372,205 L 396,205 L 396,295 L 372,295 Z"
                className={getRegionClass('chest')}
                onClick={(e) => handleRegionClick(e, 'chest')}
                onMouseEnter={() => handleRegionHover('chest')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'chest')}
                tabIndex={0}
                role="button"
                aria-label="Pectoral Sternum Wall"
              />

              {/* Abdomen: Upper & Lower */}
              <path
                id="svg-front-upper-abdomen"
                d="M 330,295 C 360,290 408,290 438,295 C 440,335 435,365 425,365 C 395,360 373,360 343,365 C 333,365 328,335 330,295 Z"
                className={getRegionClass('upper_abdomen')}
                onClick={(e) => handleRegionClick(e, 'upper_abdomen')}
                onMouseEnter={() => handleRegionHover('upper_abdomen')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'upper_abdomen')}
                tabIndex={0}
                role="button"
                aria-label="Upper Abdomen and Epigastrium"
              />
              <path
                id="svg-front-lower-abdomen"
                d="M 343,365 C 373,360 395,360 425,365 C 430,395 425,430 420,430 C 395,425 373,425 348,430 C 343,430 338,395 343,365 Z"
                className={getRegionClass('lower_abdomen')}
                onClick={(e) => handleRegionClick(e, 'lower_abdomen')}
                onMouseEnter={() => handleRegionHover('lower_abdomen')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'lower_abdomen')}
                tabIndex={0}
                role="button"
                aria-label="Lower Abdomen and Navel"
              />

              {/* Pelvis & Hips */}
              <path
                id="svg-front-pelvis"
                d="M 348,430 C 373,425 395,425 420,430 C 430,460 405,525 384,535 C 363,525 338,460 348,430 Z"
                className={getRegionClass('pelvis')}
                onClick={(e) => handleRegionClick(e, 'pelvis')}
                onMouseEnter={() => handleRegionHover('pelvis')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'pelvis')}
                tabIndex={0}
                role="button"
                aria-label="Pelvis and Inguinal Groin"
              />
              <path
                id="svg-front-right-hip"
                d="M 295,430 C 325,425 345,430 345,465 C 330,495 295,475 295,430 Z"
                className={getRegionClass('right_hip', true)}
                onClick={(e) => handleRegionClick(e, 'right_hip')}
                onMouseEnter={() => handleRegionHover('right_hip')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_hip')}
                tabIndex={0}
                role="button"
                aria-label="Right Hip"
              />
              <path
                id="svg-front-left-hip"
                d="M 473,430 C 473,475 438,495 423,465 C 423,430 443,425 473,430 Z"
                className={getRegionClass('left_hip', true)}
                onClick={(e) => handleRegionClick(e, 'left_hip')}
                onMouseEnter={() => handleRegionHover('left_hip')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_hip')}
                tabIndex={0}
                role="button"
                aria-label="Left Hip"
              />

              {/* Right Arm: Bicep, Elbow, Forearm, Wrist, Hand, Fingertips */}
              <path
                id="svg-front-right-upper-arm"
                d="M 285,250 C 270,265 242,320 248,360 C 265,365 285,340 295,295 Z"
                className={getRegionClass('right_upper_arm')}
                onClick={(e) => handleRegionClick(e, 'right_upper_arm')}
                onMouseEnter={() => handleRegionHover('right_upper_arm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_upper_arm')}
                tabIndex={0}
                role="button"
                aria-label="Right Upper Arm and Bicep"
              />
              <circle
                id="svg-front-right-elbow"
                cx="238"
                cy="380"
                r="22"
                className={getRegionClass('right_elbow', true)}
                onClick={(e) => handleRegionClick(e, 'right_elbow')}
                onMouseEnter={() => handleRegionHover('right_elbow')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_elbow')}
                tabIndex={0}
                role="button"
                aria-label="Right Elbow"
              />
              <path
                id="svg-front-right-forearm"
                d="M 245,395 C 235,420 215,465 208,495 C 225,502 242,480 255,410 Z"
                className={getRegionClass('right_forearm')}
                onClick={(e) => handleRegionClick(e, 'right_forearm')}
                onMouseEnter={() => handleRegionHover('right_forearm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_forearm')}
                tabIndex={0}
                role="button"
                aria-label="Right Forearm"
              />
              <circle
                id="svg-front-right-wrist"
                cx="202"
                cy="515"
                r="18"
                className={getRegionClass('right_wrist', true)}
                onClick={(e) => handleRegionClick(e, 'right_wrist')}
                onMouseEnter={() => handleRegionHover('right_wrist')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_wrist')}
                tabIndex={0}
                role="button"
                aria-label="Right Wrist"
              />
              <path
                id="svg-front-right-palm"
                d="M 185,532 L 215,532 L 205,578 L 178,578 Z"
                className={getRegionClass('right_palm')}
                onClick={(e) => handleRegionClick(e, 'right_palm')}
                onMouseEnter={() => handleRegionHover('right_palm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_palm')}
                tabIndex={0}
                role="button"
                aria-label="Right Palm"
              />
              <path
                id="svg-front-right-hand"
                d="M 215,532 C 220,560 210,610 190,635 C 165,630 160,580 185,532 Z"
                className={getRegionClass('right_hand')}
                onClick={(e) => handleRegionClick(e, 'right_hand')}
                onMouseEnter={() => handleRegionHover('right_hand')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_hand')}
                tabIndex={0}
                role="button"
                aria-label="Right Hand and Fingers"
              />
              <path
                id="svg-front-right-fingertips"
                d="M 160,605 C 160,590 195,590 195,605 C 195,635 160,635 160,605 Z"
                className={getRegionClass('right_fingertips')}
                onClick={(e) => handleRegionClick(e, 'right_fingertips')}
                onMouseEnter={() => handleRegionHover('right_fingertips')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_fingertips')}
                tabIndex={0}
                role="button"
                aria-label="Right Fingertips"
              />

              {/* Left Arm: Bicep, Elbow, Forearm, Wrist, Hand, Fingertips */}
              <path
                id="svg-front-left-upper-arm"
                d="M 473,295 C 483,340 503,365 520,360 C 526,320 498,265 483,250 Z"
                className={getRegionClass('left_upper_arm')}
                onClick={(e) => handleRegionClick(e, 'left_upper_arm')}
                onMouseEnter={() => handleRegionHover('left_upper_arm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_upper_arm')}
                tabIndex={0}
                role="button"
                aria-label="Left Upper Arm and Bicep"
              />
              <circle
                id="svg-front-left-elbow"
                cx="530"
                cy="380"
                r="22"
                className={getRegionClass('left_elbow', true)}
                onClick={(e) => handleRegionClick(e, 'left_elbow')}
                onMouseEnter={() => handleRegionHover('left_elbow')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_elbow')}
                tabIndex={0}
                role="button"
                aria-label="Left Elbow"
              />
              <path
                id="svg-front-left-forearm"
                d="M 513,410 C 526,480 543,502 560,495 C 553,465 533,420 523,395 Z"
                className={getRegionClass('left_forearm')}
                onClick={(e) => handleRegionClick(e, 'left_forearm')}
                onMouseEnter={() => handleRegionHover('left_forearm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_forearm')}
                tabIndex={0}
                role="button"
                aria-label="Left Forearm"
              />
              <circle
                id="svg-front-left-wrist"
                cx="566"
                cy="515"
                r="18"
                className={getRegionClass('left_wrist', true)}
                onClick={(e) => handleRegionClick(e, 'left_wrist')}
                onMouseEnter={() => handleRegionHover('left_wrist')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_wrist')}
                tabIndex={0}
                role="button"
                aria-label="Left Wrist"
              />
              <path
                id="svg-front-left-palm"
                d="M 553,532 L 583,532 L 590,578 L 563,578 Z"
                className={getRegionClass('left_palm')}
                onClick={(e) => handleRegionClick(e, 'left_palm')}
                onMouseEnter={() => handleRegionHover('left_palm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_palm')}
                tabIndex={0}
                role="button"
                aria-label="Left Palm"
              />
              <path
                id="svg-front-left-hand"
                d="M 553,532 C 578,580 573,630 548,635 C 528,610 518,560 523,532 Z"
                className={getRegionClass('left_hand')}
                onClick={(e) => handleRegionClick(e, 'left_hand')}
                onMouseEnter={() => handleRegionHover('left_hand')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_hand')}
                tabIndex={0}
                role="button"
                aria-label="Left Hand and Fingers"
              />
              <path
                id="svg-front-left-fingertips"
                d="M 573,605 C 573,590 608,590 608,605 C 608,635 573,635 573,605 Z"
                className={getRegionClass('left_fingertips')}
                onClick={(e) => handleRegionClick(e, 'left_fingertips')}
                onMouseEnter={() => handleRegionHover('left_fingertips')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_fingertips')}
                tabIndex={0}
                role="button"
                aria-label="Left Fingertips"
              />

              {/* Legs: Thighs, Knees, Shins, Calves, Ankles, Feet */}
              <path
                id="svg-front-right-thigh"
                d="M 295,490 C 340,490 365,520 360,650 C 330,660 300,640 285,550 Z"
                className={getRegionClass('right_thigh')}
                onClick={(e) => handleRegionClick(e, 'right_thigh')}
                onMouseEnter={() => handleRegionHover('right_thigh')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_thigh')}
                tabIndex={0}
                role="button"
                aria-label="Right Thigh and Quadriceps"
              />
              <path
                id="svg-front-left-thigh"
                d="M 473,490 C 483,550 468,640 438,660 C 433,520 458,490 473,490 Z"
                className={getRegionClass('left_thigh')}
                onClick={(e) => handleRegionClick(e, 'left_thigh')}
                onMouseEnter={() => handleRegionHover('left_thigh')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_thigh')}
                tabIndex={0}
                role="button"
                aria-label="Left Thigh and Quadriceps"
              />

              <circle
                id="svg-front-right-knee"
                cx="330"
                cy="695"
                r="26"
                className={getRegionClass('right_knee', true)}
                onClick={(e) => handleRegionClick(e, 'right_knee')}
                onMouseEnter={() => handleRegionHover('right_knee')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_knee')}
                tabIndex={0}
                role="button"
                aria-label="Right Knee and Patella"
              />
              <circle
                id="svg-front-left-knee"
                cx="438"
                cy="695"
                r="26"
                className={getRegionClass('left_knee', true)}
                onClick={(e) => handleRegionClick(e, 'left_knee')}
                onMouseEnter={() => handleRegionHover('left_knee')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_knee')}
                tabIndex={0}
                role="button"
                aria-label="Left Knee and Patella"
              />

              <path
                id="svg-front-right-shin"
                d="M 315,720 L 345,720 L 335,855 L 305,855 Z"
                className={getRegionClass('right_shin')}
                onClick={(e) => handleRegionClick(e, 'right_shin')}
                onMouseEnter={() => handleRegionHover('right_shin')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_shin')}
                tabIndex={0}
                role="button"
                aria-label="Right Shin"
              />
              <path
                id="svg-front-left-shin"
                d="M 423,720 L 453,720 L 463,855 L 433,855 Z"
                className={getRegionClass('left_shin')}
                onClick={(e) => handleRegionClick(e, 'left_shin')}
                onMouseEnter={() => handleRegionHover('left_shin')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_shin')}
                tabIndex={0}
                role="button"
                aria-label="Left Shin"
              />

              <path
                id="svg-front-right-calf"
                d="M 280,735 C 295,730 315,730 315,860 C 290,860 270,810 280,735 Z"
                className={getRegionClass('right_calf')}
                onClick={(e) => handleRegionClick(e, 'right_calf')}
                onMouseEnter={() => handleRegionHover('right_calf')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_calf')}
                tabIndex={0}
                role="button"
                aria-label="Right Calf"
              />
              <path
                id="svg-front-left-calf"
                d="M 488,735 C 498,810 478,860 453,860 C 453,730 473,730 488,735 Z"
                className={getRegionClass('left_calf')}
                onClick={(e) => handleRegionClick(e, 'left_calf')}
                onMouseEnter={() => handleRegionHover('left_calf')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_calf')}
                tabIndex={0}
                role="button"
                aria-label="Left Calf"
              />

              <circle
                id="svg-front-right-ankle"
                cx="308"
                cy="895"
                r="20"
                className={getRegionClass('right_ankle', true)}
                onClick={(e) => handleRegionClick(e, 'right_ankle')}
                onMouseEnter={() => handleRegionHover('right_ankle')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_ankle')}
                tabIndex={0}
                role="button"
                aria-label="Right Ankle"
              />
              <circle
                id="svg-front-left-ankle"
                cx="460"
                cy="895"
                r="20"
                className={getRegionClass('left_ankle', true)}
                onClick={(e) => handleRegionClick(e, 'left_ankle')}
                onMouseEnter={() => handleRegionHover('left_ankle')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_ankle')}
                tabIndex={0}
                role="button"
                aria-label="Left Ankle"
              />

              <path
                id="svg-front-right-foot"
                d="M 270,915 C 315,910 325,930 320,995 C 290,1010 255,1000 255,960 Z"
                className={getRegionClass('right_foot')}
                onClick={(e) => handleRegionClick(e, 'right_foot')}
                onMouseEnter={() => handleRegionHover('right_foot')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_foot')}
                tabIndex={0}
                role="button"
                aria-label="Right Foot and Toes"
              />
              <path
                id="svg-front-left-foot"
                d="M 498,915 C 513,960 513,1000 448,1010 C 443,930 453,910 498,915 Z"
                className={getRegionClass('left_foot')}
                onClick={(e) => handleRegionClick(e, 'left_foot')}
                onMouseEnter={() => handleRegionHover('left_foot')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_foot')}
                tabIndex={0}
                role="button"
                aria-label="Left Foot and Toes"
              />
            </g>
          ) : (
            <g id="back-anatomy-layer">
              {/* Back Head & Cervical Spine */}
              <path
                id="svg-back-head"
                d="M 345,45 C 345,30 423,30 423,45 C 430,90 423,130 384,130 C 345,130 338,90 345,45 Z"
                className={getRegionClass('back_head')}
                onClick={(e) => handleRegionClick(e, 'back_head')}
                onMouseEnter={() => handleRegionHover('back_head')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_head')}
                tabIndex={0}
                role="button"
                aria-label="Back of Head Occiput"
              />
              <path
                id="svg-back-cervical"
                d="M 365,135 L 403,135 L 413,185 C 395,190 373,190 355,185 Z"
                className={getRegionClass('cervical_spine')}
                onClick={(e) => handleRegionClick(e, 'cervical_spine')}
                onMouseEnter={() => handleRegionHover('cervical_spine')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'cervical_spine')}
                tabIndex={0}
                role="button"
                aria-label="Neck and Cervical Spine"
              />

              {/* Shoulders Posterior & Scapulae */}
              <circle
                id="svg-back-left-shoulder"
                cx="298"
                cy="235"
                r="26"
                className={getRegionClass('back_left_shoulder', true)}
                onClick={(e) => handleRegionClick(e, 'back_left_shoulder')}
                onMouseEnter={() => handleRegionHover('back_left_shoulder')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_shoulder')}
                tabIndex={0}
                role="button"
                aria-label="Left Shoulder Posterior"
              />
              <circle
                id="svg-back-right-shoulder"
                cx="468"
                cy="235"
                r="26"
                className={getRegionClass('back_right_shoulder', true)}
                onClick={(e) => handleRegionClick(e, 'back_right_shoulder')}
                onMouseEnter={() => handleRegionHover('back_right_shoulder')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_shoulder')}
                tabIndex={0}
                role="button"
                aria-label="Right Shoulder Posterior"
              />

              <path
                id="svg-back-left-scapula"
                d="M 315,205 C 345,205 365,225 365,280 C 340,285 315,260 315,205 Z"
                className={getRegionClass('left_scapula')}
                onClick={(e) => handleRegionClick(e, 'left_scapula')}
                onMouseEnter={() => handleRegionHover('left_scapula')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_scapula')}
                tabIndex={0}
                role="button"
                aria-label="Left Shoulder Blade Scapula"
              />
              <path
                id="svg-back-right-scapula"
                d="M 453,205 C 453,260 428,285 403,280 C 403,225 423,205 453,205 Z"
                className={getRegionClass('right_scapula')}
                onClick={(e) => handleRegionClick(e, 'right_scapula')}
                onMouseEnter={() => handleRegionHover('right_scapula')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_scapula')}
                tabIndex={0}
                role="button"
                aria-label="Right Shoulder Blade Scapula"
              />

              {/* Upper Back, Spine, Lower Back */}
              <path
                id="svg-back-upper-back"
                d="M 365,190 L 403,190 L 403,270 L 365,270 Z"
                className={getRegionClass('upper_back')}
                onClick={(e) => handleRegionClick(e, 'upper_back')}
                onMouseEnter={() => handleRegionHover('upper_back')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'upper_back')}
                tabIndex={0}
                role="button"
                aria-label="Upper Back and Thoracic Trapezius"
              />
              <path
                id="svg-back-spine"
                d="M 374,270 L 394,270 L 394,350 L 374,350 Z"
                className={getRegionClass('spine')}
                onClick={(e) => handleRegionClick(e, 'spine')}
                onMouseEnter={() => handleRegionHover('spine')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'spine')}
                tabIndex={0}
                role="button"
                aria-label="Thoracic Mid-Spine"
              />
              <path
                id="svg-back-lower-back"
                d="M 374,350 L 394,350 L 394,435 L 374,435 Z"
                className={getRegionClass('lower_back')}
                onClick={(e) => handleRegionClick(e, 'lower_back')}
                onMouseEnter={() => handleRegionHover('lower_back')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'lower_back')}
                tabIndex={0}
                role="button"
                aria-label="Lower Back and Lumbar Spine"
              />

              <path
                id="svg-back-left-lower-back"
                d="M 310,345 C 345,345 374,350 374,430 C 340,430 310,400 310,345 Z"
                className={getRegionClass('left_lower_back')}
                onClick={(e) => handleRegionClick(e, 'left_lower_back')}
                onMouseEnter={() => handleRegionHover('left_lower_back')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_lower_back')}
                tabIndex={0}
                role="button"
                aria-label="Left Lower Back Flank"
              />
              <path
                id="svg-back-right-lower-back"
                d="M 458,345 C 458,400 428,430 394,430 C 394,350 423,345 458,345 Z"
                className={getRegionClass('right_lower_back')}
                onClick={(e) => handleRegionClick(e, 'right_lower_back')}
                onMouseEnter={() => handleRegionHover('right_lower_back')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_lower_back')}
                tabIndex={0}
                role="button"
                aria-label="Right Lower Back Flank"
              />

              {/* Glutes & Hips */}
              <path
                id="svg-back-glutes"
                d="M 330,440 C 365,435 403,435 438,440 C 453,490 438,540 384,540 C 330,540 315,490 330,440 Z"
                className={getRegionClass('glutes')}
                onClick={(e) => handleRegionClick(e, 'glutes')}
                onMouseEnter={() => handleRegionHover('glutes')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'glutes')}
                tabIndex={0}
                role="button"
                aria-label="Glutes and Pelvic Sacrum"
              />
              <path
                id="svg-back-left-hip"
                d="M 295,430 C 325,425 345,430 345,465 C 330,495 295,475 295,430 Z"
                className={getRegionClass('back_left_hip', true)}
                onClick={(e) => handleRegionClick(e, 'back_left_hip')}
                onMouseEnter={() => handleRegionHover('back_left_hip')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_hip')}
                tabIndex={0}
                role="button"
                aria-label="Left Hip Posterior"
              />
              <path
                id="svg-back-right-hip"
                d="M 473,430 C 473,475 438,495 423,465 C 423,430 443,425 473,430 Z"
                className={getRegionClass('back_right_hip', true)}
                onClick={(e) => handleRegionClick(e, 'back_right_hip')}
                onMouseEnter={() => handleRegionHover('back_right_hip')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_hip')}
                tabIndex={0}
                role="button"
                aria-label="Right Hip Posterior"
              />

              {/* Back Left Arm: Tricep, Elbow, Forearm, Wrist, Hand */}
              <path
                id="svg-back-left-upper-arm"
                d="M 285,250 C 270,265 242,320 248,360 C 265,365 285,340 295,295 Z"
                className={getRegionClass('back_left_upper_arm')}
                onClick={(e) => handleRegionClick(e, 'back_left_upper_arm')}
                onMouseEnter={() => handleRegionHover('back_left_upper_arm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_upper_arm')}
                tabIndex={0}
                role="button"
                aria-label="Left Triceps and Upper Arm"
              />
              <circle
                id="svg-back-left-elbow"
                cx="238"
                cy="380"
                r="22"
                className={getRegionClass('back_left_elbow', true)}
                onClick={(e) => handleRegionClick(e, 'back_left_elbow')}
                onMouseEnter={() => handleRegionHover('back_left_elbow')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_elbow')}
                tabIndex={0}
                role="button"
                aria-label="Left Elbow Olecranon"
              />
              <path
                id="svg-back-left-forearm"
                d="M 245,395 C 235,420 215,465 208,495 C 225,502 242,480 255,410 Z"
                className={getRegionClass('back_left_forearm')}
                onClick={(e) => handleRegionClick(e, 'back_left_forearm')}
                onMouseEnter={() => handleRegionHover('back_left_forearm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_forearm')}
                tabIndex={0}
                role="button"
                aria-label="Left Dorsal Forearm"
              />
              <circle
                id="svg-back-left-wrist"
                cx="202"
                cy="515"
                r="18"
                className={getRegionClass('back_left_wrist', true)}
                onClick={(e) => handleRegionClick(e, 'back_left_wrist')}
                onMouseEnter={() => handleRegionHover('back_left_wrist')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_wrist')}
                tabIndex={0}
                role="button"
                aria-label="Left Dorsal Wrist"
              />
              <path
                id="svg-back-left-hand"
                d="M 215,532 C 220,560 210,610 190,635 C 165,630 160,580 185,532 Z"
                className={getRegionClass('back_left_hand')}
                onClick={(e) => handleRegionClick(e, 'back_left_hand')}
                onMouseEnter={() => handleRegionHover('back_left_hand')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_hand')}
                tabIndex={0}
                role="button"
                aria-label="Back of Left Hand and Fingers"
              />

              {/* Back Right Arm: Tricep, Elbow, Forearm, Wrist, Hand */}
              <path
                id="svg-back-right-upper-arm"
                d="M 473,295 C 483,340 503,365 520,360 C 526,320 498,265 483,250 Z"
                className={getRegionClass('back_right_upper_arm')}
                onClick={(e) => handleRegionClick(e, 'back_right_upper_arm')}
                onMouseEnter={() => handleRegionHover('back_right_upper_arm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_upper_arm')}
                tabIndex={0}
                role="button"
                aria-label="Right Triceps and Upper Arm"
              />
              <circle
                id="svg-back-right-elbow"
                cx="530"
                cy="380"
                r="22"
                className={getRegionClass('back_right_elbow', true)}
                onClick={(e) => handleRegionClick(e, 'back_right_elbow')}
                onMouseEnter={() => handleRegionHover('back_right_elbow')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_elbow')}
                tabIndex={0}
                role="button"
                aria-label="Right Elbow Olecranon"
              />
              <path
                id="svg-back-right-forearm"
                d="M 513,410 C 526,480 543,502 560,495 C 553,465 533,420 523,395 Z"
                className={getRegionClass('back_right_forearm')}
                onClick={(e) => handleRegionClick(e, 'back_right_forearm')}
                onMouseEnter={() => handleRegionHover('back_right_forearm')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_forearm')}
                tabIndex={0}
                role="button"
                aria-label="Right Dorsal Forearm"
              />
              <circle
                id="svg-back-right-wrist"
                cx="566"
                cy="515"
                r="18"
                className={getRegionClass('back_right_wrist', true)}
                onClick={(e) => handleRegionClick(e, 'back_right_wrist')}
                onMouseEnter={() => handleRegionHover('back_right_wrist')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_wrist')}
                tabIndex={0}
                role="button"
                aria-label="Right Dorsal Wrist"
              />
              <path
                id="svg-back-right-hand"
                d="M 553,532 C 578,580 573,630 548,635 C 528,610 518,560 523,532 Z"
                className={getRegionClass('back_right_hand')}
                onClick={(e) => handleRegionClick(e, 'back_right_hand')}
                onMouseEnter={() => handleRegionHover('back_right_hand')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_hand')}
                tabIndex={0}
                role="button"
                aria-label="Back of Right Hand and Fingers"
              />

              {/* Back Legs: Hamstrings, Popliteal, Calves, Heels */}
              <path
                id="svg-back-left-hamstring"
                d="M 295,535 C 340,535 365,560 360,660 C 330,665 300,650 285,585 Z"
                className={getRegionClass('left_hamstring')}
                onClick={(e) => handleRegionClick(e, 'left_hamstring')}
                onMouseEnter={() => handleRegionHover('left_hamstring')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_hamstring')}
                tabIndex={0}
                role="button"
                aria-label="Left Hamstring Posterior Thigh"
              />
              <path
                id="svg-back-right-hamstring"
                d="M 473,535 C 483,585 468,650 438,665 C 433,560 458,535 473,535 Z"
                className={getRegionClass('right_hamstring')}
                onClick={(e) => handleRegionClick(e, 'right_hamstring')}
                onMouseEnter={() => handleRegionHover('right_hamstring')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_hamstring')}
                tabIndex={0}
                role="button"
                aria-label="Right Hamstring Posterior Thigh"
              />

              <circle
                id="svg-back-left-knee"
                cx="330"
                cy="695"
                r="24"
                className={getRegionClass('back_left_knee', true)}
                onClick={(e) => handleRegionClick(e, 'back_left_knee')}
                onMouseEnter={() => handleRegionHover('back_left_knee')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_knee')}
                tabIndex={0}
                role="button"
                aria-label="Left Popliteal Back of Knee"
              />
              <circle
                id="svg-back-right-knee"
                cx="438"
                cy="695"
                r="24"
                className={getRegionClass('back_right_knee', true)}
                onClick={(e) => handleRegionClick(e, 'back_right_knee')}
                onMouseEnter={() => handleRegionHover('back_right_knee')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_knee')}
                tabIndex={0}
                role="button"
                aria-label="Right Popliteal Back of Knee"
              />

              <path
                id="svg-back-left-calf"
                d="M 280,725 C 310,720 340,720 335,855 C 300,860 275,820 280,725 Z"
                className={getRegionClass('back_left_calf')}
                onClick={(e) => handleRegionClick(e, 'back_left_calf')}
                onMouseEnter={() => handleRegionHover('back_left_calf')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_left_calf')}
                tabIndex={0}
                role="button"
                aria-label="Left Calf Gastrocnemius"
              />
              <path
                id="svg-back-right-calf"
                d="M 488,725 C 493,820 468,860 433,855 C 428,720 458,720 488,725 Z"
                className={getRegionClass('back_right_calf')}
                onClick={(e) => handleRegionClick(e, 'back_right_calf')}
                onMouseEnter={() => handleRegionHover('back_right_calf')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'back_right_calf')}
                tabIndex={0}
                role="button"
                aria-label="Right Calf Gastrocnemius"
              />

              <path
                id="svg-back-left-heel"
                d="M 290,875 C 325,875 325,930 320,995 C 295,1005 275,980 275,930 Z"
                className={getRegionClass('left_heel')}
                onClick={(e) => handleRegionClick(e, 'left_heel')}
                onMouseEnter={() => handleRegionHover('left_heel')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'left_heel')}
                tabIndex={0}
                role="button"
                aria-label="Left Heel and Achilles Tendon"
              />
              <path
                id="svg-back-right-heel"
                d="M 478,875 C 493,930 473,980 448,1005 C 443,930 443,875 478,875 Z"
                className={getRegionClass('right_heel')}
                onClick={(e) => handleRegionClick(e, 'right_heel')}
                onMouseEnter={() => handleRegionHover('right_heel')}
                onMouseLeave={() => handleRegionHover(null)}
                onKeyDown={(e) => handleKeyDown(e, 'right_heel')}
                tabIndex={0}
                role="button"
                aria-label="Right Heel and Achilles Tendon"
              />
            </g>
          )}

          {/* ================================================================= */}
          {/* ATTACHED SYMPTOM TAGS LAYER (Requirement 6)                       */}
          {/* ================================================================= */}
          <g id="saved-symptom-tags-layer">
            {visibleRecordedIssues.map((issue) => {
              const regDef = ALL_BODY_REGIONS.find((r) => r.id === issue.regionId);
              if (!regDef || !regDef.pinCoordinates) return null;

              const isTagActive = selectedRegion?.id === issue.regionId;
              const tagPin = regDef.pinCoordinates;
              const isRightSide = tagPin.x >= 384;

              // Compute clean leader line offset away from body
              const deltaX = isRightSide ? 55 : -55;
              const deltaY = -24;
              const pillX = isRightSide ? deltaX + 4 : deltaX - 160;
              const pillY = deltaY - 12;

              // Color indicator based on symptom
              let dotColor = '#FFAA00';
              if (issue.primaryIssue === 'color_change' || issue.skinAppearance?.observedColor === 'red') {
                dotColor = '#FF2A4B';
              } else if (issue.primaryIssue === 'swelling') {
                dotColor = '#5FD7FF';
              } else if (issue.primaryIssue === 'cut') {
                dotColor = '#EF4444';
              } else if (issue.primaryIssue === 'numbness') {
                dotColor = '#A855F7';
              } else if (issue.primaryIssue === 'stiffness') {
                dotColor = '#F59E0B';
              }

              // Text summary e.g. Left elbow · Pain 6/10 · 3 days
              const sevText = issue.pain ? ` · Pain ${issue.pain.severity}/10` : ` · ${issue.primaryIssue.toUpperCase()}`;
              const durText = issue.pain?.onset ? ` · ${issue.pain.onset.split(' ')[0]}` : '';
              const tagText = `${regDef.name.split(' ')[0]}${sevText}${durText}`;

              return (
                <g
                  key={`tag-${issue.id}`}
                  className={`bodymap-symptom-tag ${isTagActive ? 'is-active-tag' : ''}`}
                  transform={`translate(${tagPin.x}, ${tagPin.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRegion(regDef);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Subtle skin glow spot */}
                  <circle cx="0" cy="0" r="14" fill={dotColor} opacity="0.35" />
                  <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1.2" />

                  {/* Leader connector line */}
                  <polyline
                    points={`0,0 ${deltaX * 0.4},${deltaY * 0.4} ${deltaX},${deltaY}`}
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                    fill="none"
                  />
                  <circle cx={deltaX} cy={deltaY} r="2" fill="#FFFFFF" />

                  {/* Glass Tag Callout Pill */}
                  <g transform={`translate(${pillX}, ${pillY})`}>
                    <rect
                      x="0"
                      y="0"
                      width="156"
                      height="24"
                      rx="12"
                      fill="rgba(12, 17, 26, 0.88)"
                      stroke={isTagActive ? '#5FD7FF' : 'rgba(255, 255, 255, 0.22)'}
                      strokeWidth={isTagActive ? '1.5' : '1'}
                      className="symptom-tag-pill-rect"
                    />
                    <circle cx="10" cy="12" r="3.5" fill={dotColor} />
                    <text
                      x="18"
                      y="15.5"
                      fill="#FFFFFF"
                      fontSize="9.5"
                      fontFamily="var(--font-family-mono, monospace)"
                      fontWeight="bold"
                    >
                      {tagText.length > 22 ? tagText.slice(0, 20) + '…' : tagText}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* ================================================================= */}
          {/* LOCALIZED GLASS LENS (Requirement 4)                              */}
          {/* ================================================================= */}
          {/* ================================================================= */}
          {/* LOCALIZED GLASS LENS & CONNECTOR LEADER (Requirement 2 & 4)       */}
          {/* ================================================================= */}
          {selectedRegion && pin && (
            <>
              {/* Connector line leading to floating glass panel */}
              <g className="bodymap-panel-anchor-leader" aria-hidden="true">
                {/* Horizontal line extending toward panel docking side */}
                <line
                  x1={pin.x}
                  y1={pin.y}
                  x2={pin.x <= 384 ? pin.x + 36 : pin.x - 36}
                  y2={pin.y}
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="1.2"
                />
                <line
                  x1={pin.x <= 384 ? pin.x + 36 : pin.x - 36}
                  y1={pin.y}
                  x2={pin.x <= 384 ? 680 : 88}
                  y2={pin.y}
                  stroke="rgba(255, 255, 255, 0.22)"
                  strokeWidth="0.9"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={pin.x <= 384 ? 680 : 88}
                  cy={pin.y}
                  r="3.5"
                  fill="#5FD7FF"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                />
              </g>

              {/* Main Localized Glass Contact Lens */}
              <g
                className="bodymap-glass-lens-anchor"
                transform={`translate(${pin.x}, ${pin.y})`}
                aria-hidden="true"
              >
                {/* 1. Underlying Soft Symptom Glow / Halo */}
                {activeOverlayType === 'swelling' ? (
                  <circle
                    cx="0"
                    cy="0"
                    r={
                      activeCondition?.swellingExtent?.includes('Extensive')
                        ? 54
                        : activeCondition?.swellingExtent?.includes('Noticeable')
                        ? 42
                        : 32
                    }
                    fill="url(#lensSwellingGrad)"
                    className="lens-symptom-glow-spot is-swelling-halo"
                    style={{ filter: `drop-shadow(0 0 16px ${glowOuterColor})` }}
                  />
                ) : activeOverlayType === 'numbness' ? (
                  <g className="lens-numbness-ripples">
                    <circle cx="0" cy="0" r="32" fill="none" stroke="#A855F7" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                    <circle cx="0" cy="0" r="44" fill="none" stroke="#C084FC" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.45" />
                    <circle cx="0" cy="0" r="26" fill="rgba(168, 85, 247, 0.15)" />
                  </g>
                ) : activeOverlayType === 'stiffness' ? (
                  <g className="lens-stiffness-brackets">
                    <path d="M -22,-20 A 28 28 0 0 1 -22,20" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M 22,-20 A 28 28 0 0 0 22,20" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="0" cy="0" r="28" fill="rgba(245, 158, 11, 0.12)" />
                  </g>
                ) : activeOverlayType === 'cut' ? (
                  <g className="lens-cut-marker">
                    <circle cx="0" cy="0" r="28" fill="rgba(239, 68, 68, 0.15)" />
                    <line x1="-12" y1="-5" x2="12" y2="5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                    <line x1="-3" y1="-9" x2="-1" y2="-1" stroke="#EF4444" strokeWidth="1.2" />
                    <line x1="2" y1="1" x2="4" y2="9" stroke="#EF4444" strokeWidth="1.2" />
                  </g>
                ) : (
                  <circle
                    cx="0"
                    cy="0"
                    r="34"
                    fill={lensGlowGrad}
                    className="lens-symptom-glow-spot"
                    style={{ filter: `drop-shadow(0 0 16px ${glowOuterColor})` }}
                  />
                )}

                {/* 2. Soft focused white illumination (Reference #5 style) */}
                <circle cx="0" cy="0" r="30" fill="url(#lensWhiteFocused)" opacity="0.65" />

                {/* 3. Transparent Glass Disc with Thin Translucent White Rim (Reference #3 style) */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="27"
                  ry="27"
                  fill="rgba(255, 255, 255, 0.04)"
                  stroke="rgba(255, 255, 255, 0.85)"
                  strokeWidth="1.2"
                  className="lens-glass-disc-rim"
                />

                {/* Inner concentric micro-etched ring */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="19"
                  ry="19"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.38)"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  className="lens-inner-ring"
                />

                {/* Micro HUD Specular Highlight Arc */}
                <path
                  d="M -16,-16 A 23 23 0 0 1 12,-19"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.95)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="lens-specular-highlight"
                />

                {/* Precision Crosshair Ticks */}
                <line x1="-33" y1="0" x2="-26" y2="0" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                <line x1="26" y1="0" x2="33" y2="0" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                <line x1="0" y1="-33" x2="0" y2="-26" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                <line x1="0" y1="26" x2="0" y2="33" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />

                {/* Luminous center landmark point */}
                <circle cx="0" cy="0" r="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
              </g>
            </>
          )}
        </svg>
      </div>

      {/* Hand Loupe Trigger Pill when a hand region is selected */}
      {selectedRegion &&
        (selectedRegion.parentArea === 'hands' ||
          selectedRegion.id.includes('hand') ||
          selectedRegion.id.includes('finger') ||
          selectedRegion.id.includes('palm')) && (
          <button
            type="button"
            className="bodymap-hand-loupe-trigger"
            onClick={() => {
              setMagnifierSide(selectedRegion.side === 'left' ? 'left' : 'right');
              setShowHandMagnifier(true);
            }}
            title="Inspect individual fingers and fingertips"
          >
            <span>🔍 Micro-Digital Loupe (Fingers)</span>
          </button>
        )}

      {/* 4. Inline Hand Magnifier Overlay (When Hand Loupe is opened) */}
      {showHandMagnifier && (
        <InlineHandMagnifier
          side={magnifierSide}
          selectedSubregion={selectedSubregion || null}
          recordedIssues={recordedIssues}
          activeCondition={activeCondition}
          onSelectSubregion={(sub) => {
            if (onSelectSubregion) {
              onSelectSubregion(sub);
            }
          }}
          onClose={() => setShowHandMagnifier(false)}
          onToggleSide={(s) => setMagnifierSide(s)}
        />
      )}
    </div>
  );
};
export default AnatomicalFigure;
