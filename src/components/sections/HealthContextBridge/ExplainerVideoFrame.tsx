import React from 'react';
import { Play } from 'lucide-react';
import './ExplainerVideoFrame.css';

export interface ExplainerVideoFrameProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  caption?: string;
  className?: string;
}

export const ExplainerVideoFrame: React.FC<ExplainerVideoFrameProps> = ({
  videoUrl,
  posterUrl,
  title = 'MEDVIDHI — Product Story',
  caption = 'Video coming soon',
  className = '',
}) => {
  const isVideoConfigured = Boolean(videoUrl && videoUrl.trim() !== '');

  return (
    <div className={`explainer-video-frame-wrapper ${className}`}>
      {/* Four crisp black corner-bracket details OUTSIDE the frame */}
      <div className="retro-corner-bracket bracket-top-left" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M 0 16 L 0 0 L 16 0" stroke="#000000" strokeWidth="2.2" strokeLinecap="square" />
        </svg>
      </div>
      <div className="retro-corner-bracket bracket-top-right" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M 2 0 L 18 0 L 18 16" stroke="#000000" strokeWidth="2.2" strokeLinecap="square" />
        </svg>
      </div>
      <div className="retro-corner-bracket bracket-bottom-left" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M 0 2 L 0 18 L 16 18" stroke="#000000" strokeWidth="2.2" strokeLinecap="square" />
        </svg>
      </div>
      <div className="retro-corner-bracket bracket-bottom-right" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M 2 18 L 18 18 L 18 2" stroke="#000000" strokeWidth="2.2" strokeLinecap="square" />
        </svg>
      </div>

      {/* Main landscape-oriented media container with softly rounded boundary */}
      <div className="explainer-media-boundary">
        {isVideoConfigured ? (
          <video
            controls
            src={videoUrl}
            poster={posterUrl}
            className="explainer-native-video"
            aria-label={title}
          />
        ) : (
          /* Elegant monochrome visual placeholder */
          <div
            className="explainer-poster-placeholder"
            role="region"
            aria-label={`${title} (${caption})`}
          >
            {/* Subtle monochrome geometric contour background */}
            <div className="poster-monochrome-pattern" aria-hidden="true">
              <svg width="100%" height="100%" viewBox="0 0 800 450" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="posterLineGrad" x1="0" y1="0" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <circle cx="400" cy="225" r="320" stroke="url(#posterLineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="400" cy="225" r="210" stroke="url(#posterLineGrad)" strokeWidth="1" />
                <circle cx="400" cy="225" r="120" stroke="url(#posterLineGrad)" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="100" y1="225" x2="700" y2="225" stroke="url(#posterLineGrad)" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="400" y1="40" x2="400" y2="410" stroke="url(#posterLineGrad)" strokeWidth="0.8" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Poster Topline Brand Tag */}
            <div className="poster-topline">
              <span className="poster-brand-dot" aria-hidden="true" />
              <span className="poster-title-label">{title}</span>
            </div>

            {/* Clearly Positioned Circular Play Control (Non-fake, authentic placeholder state) */}
            <div className="poster-center-control" aria-hidden="true">
              <div className="poster-play-circle" title="Video coming soon">
                <Play size={24} className="poster-play-icon" />
              </div>
            </div>

            {/* Restrained Caption & Technical Specs Footer */}
            <div className="poster-footer">
              <span className="poster-caption-tag">{caption}</span>
              <span className="poster-specs-mono">16:9 • 4K CONTEXT ENGINE ARCHITECTURE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplainerVideoFrame;
