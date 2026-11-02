import React, { useState } from 'react';
import { Activity, Clock, Pill, FileText, Sparkles } from 'lucide-react';
import './HeroScatteredToConnectedVisual.css';

interface HeroPreviewNode {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  accentColor: string;
  xPercent: number;
  yPercent: number;
  svgX: number;
  svgY: number;
}

const PREVIEW_NODES: HeroPreviewNode[] = [
  {
    id: 'symptoms',
    label: 'Symptoms',
    category: 'Reported',
    icon: <Activity size={15} />,
    accentColor: '#0ea5e9',
    xPercent: 18,
    yPercent: 24,
    svgX: 122,
    svgY: 62,
  },
  {
    id: 'timeline',
    label: 'Timeline',
    category: 'Chronology',
    icon: <Clock size={15} />,
    accentColor: '#14b8a6',
    xPercent: 16,
    yPercent: 76,
    svgX: 110,
    svgY: 198,
  },
  {
    id: 'reports',
    label: 'Reports & Care',
    category: 'Clinical',
    icon: <FileText size={15} />,
    accentColor: '#10b981',
    xPercent: 82,
    yPercent: 24,
    svgX: 558,
    svgY: 62,
  },
  {
    id: 'medicines',
    label: 'Medicines',
    category: 'Treatments',
    icon: <Pill size={15} />,
    accentColor: '#6366f1',
    xPercent: 84,
    yPercent: 76,
    svgX: 570,
    svgY: 198,
  },
];

export const HeroScatteredToConnectedVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('symptoms');

  const centerSvgX = 340;
  const centerSvgY = 130;

  return (
    <div
      className="hero-constellation-preview"
      aria-label="Health context connectivity preview: scattered signals organizing into connected context"
    >
      <div className="constellation-canvas-wrapper">
        {/* SVG Connector Streams from 4 perimeter nodes to center */}
        <svg
          className="constellation-lines-svg"
          viewBox="0 0 680 260"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="streamActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="streamPassiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
            </linearGradient>
            <filter id="streamGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Orbit Ring */}
          <circle
            cx={centerSvgX}
            cy={centerSvgY}
            r="64"
            className="center-orbit-ring"
          />
          <circle
            cx={centerSvgX}
            cy={centerSvgY}
            r="82"
            className="center-orbit-outer"
          />

          {/* Curved Connection Lines from Peripheral Nodes to Center */}
          {PREVIEW_NODES.map((node) => {
            const isActive = activeNode === node.id;
            const midX = (node.svgX + centerSvgX) / 2;
            const midY = (node.svgY + centerSvgY) / 2 + (node.svgY < centerSvgY ? -18 : 18);

            return (
              <g key={`path-group-${node.id}`}>
                {/* Background path */}
                <path
                  d={`M ${node.svgX} ${node.svgY} Q ${midX} ${midY}, ${centerSvgX} ${centerSvgY}`}
                  className={`preview-path ${isActive ? 'is-active-path' : ''}`}
                  stroke={isActive ? 'url(#streamActiveGrad)' : 'url(#streamPassiveGrad)'}
                  strokeWidth={isActive ? 2.5 : 1.25}
                  fill="none"
                />
                {/* Active pulse bead */}
                {isActive && (
                  <circle
                    cx={(node.svgX + centerSvgX) / 2}
                    cy={midY}
                    r="3.5"
                    fill="#0ea5e9"
                    className="stream-pulse-bead"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* 4 Peripheral Interactive Nodes */}
        {PREVIEW_NODES.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`preview-scatter-node ${isActive ? 'is-active' : ''}`}
              style={{ left: `${node.xPercent}%`, top: `${node.yPercent}%` }}
              onClick={() => setActiveNode(node.id)}
              aria-label={`Highlight ${node.label} connection`}
              data-cursor="pointer"
            >
              <span
                className="node-icon-wrap"
                style={{ color: node.accentColor }}
                aria-hidden="true"
              >
                {node.icon}
              </span>
              <span className="node-text-wrap">
                <span className="node-category-micro">{node.category}</span>
                <span className="node-label-pill">{node.label}</span>
              </span>
            </button>
          );
        })}

        {/* Center Connected Health Context Hub */}
        <div className="center-connected-hub" aria-hidden="true">
          <div className="hub-core-pulse">
            <Sparkles size={16} className="hub-sparkle-icon" />
          </div>
          <div className="hub-text-block">
            <span className="hub-brand-micro">MEDVIDHI HEALTH MEMORY</span>
            <span className="hub-main-label">Organised Health Context</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroScatteredToConnectedVisual;
