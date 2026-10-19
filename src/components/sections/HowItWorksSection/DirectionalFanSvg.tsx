import React from 'react';

export interface DirectionalFanSvgProps {
  className?: string;
  activeStageIndex: number;
  stagePositions: Array<{
    x: number;
    y: number;
    hubX: number;
    hubY: number;
  }>;
  onSelectStage?: (index: number) => void;
}

/**
 * DirectionalFanSvg
 * 
 * Renders the mathematical radial rays originating from the curved boundary
 * of the black semicircle hub and connecting precisely to the seven stage panels.
 */
export const DirectionalFanSvg: React.FC<DirectionalFanSvgProps> = ({
  className = '',
  activeStageIndex,
  stagePositions,
  onSelectStage,
}) => {
  return (
    <svg
      className={`directional-fan-svg ${className}`}
      viewBox="0 0 1000 680"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle gradient for active connector ray */}
        <linearGradient id="activeRayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Seven Directional Connector Rays */}
      {stagePositions.map((pos, idx) => {
        const isActive = idx === activeStageIndex;
        // Subtle organic curvature: control point pulls slightly outward
        const midX = (pos.hubX + pos.x) / 2;
        const midY = (pos.hubY + pos.y) / 2;
        const pathD = `M ${pos.hubX} ${pos.hubY} Q ${midX + 15} ${midY} ${pos.x} ${pos.y}`;

        return (
          <g
            key={`fan-ray-${idx}`}
            className={`fan-ray-group ${isActive ? 'is-active-ray' : ''}`}
            onClick={() => onSelectStage && onSelectStage(idx)}
            style={{ cursor: 'pointer' }}
          >
            {/* Expanded invisible hit area for easy clicking */}
            <path
              d={pathD}
              stroke="transparent"
              strokeWidth="16"
              fill="none"
            />

            {/* Inactive or Active Ray Line */}
            <path
              d={pathD}
              stroke={isActive ? '#000000' : '#E4E4E7'}
              strokeWidth={isActive ? '2.5' : '1.25'}
              strokeDasharray={isActive ? 'none' : 'none'}
              strokeLinecap="round"
              className="ray-path"
            />

            {/* Hub Origin Node on the curved semicircle boundary */}
            <circle
              cx={pos.hubX}
              cy={pos.hubY}
              r={isActive ? 5 : 3.5}
              fill={isActive ? '#000000' : '#A1A1AA'}
              stroke="#FFFFFF"
              strokeWidth={isActive ? 2 : 1.25}
              className="ray-hub-node"
            />

            {/* Panel Anchor Node at the panel connection point */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isActive ? 4.5 : 3}
              fill={isActive ? '#000000' : '#D4D4D8'}
              className="ray-panel-node"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default DirectionalFanSvg;
