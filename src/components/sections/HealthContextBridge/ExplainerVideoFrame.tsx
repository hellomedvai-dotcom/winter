import React, { useState, useRef, useCallback } from 'react';
import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { MEDIA_CONFIG } from '@/config/media';
import './ExplainerVideoFrame.css';

export interface ExplainerVideoFrameProps {
  playbackId?: string;
  posterUrl?: string;
  title?: string;
  className?: string;
}

export const ExplainerVideoFrame: React.FC<ExplainerVideoFrameProps> = ({
  playbackId = MEDIA_CONFIG.explainerVideo.playbackId,
  posterUrl = MEDIA_CONFIG.explainerVideo.posterUrl,
  title = MEDIA_CONFIG.explainerVideo.title,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<MuxPlayerRefAttributes | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;

    if (playerRef.current.paused || playerRef.current.ended) {
      playerRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsCompleted(false);
          setHasError(false);
        })
        .catch((err) => {
          console.warn('Playback error / interrupted:', err);
        });
    } else {
      playerRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Media event handlers
  const handlePlay = () => {
    setIsPlaying(true);
    setIsCompleted(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`explainer-video-frame-wrapper ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={`${title} Player`}
    >
      {/* Four crisp black corner brackets OUTSIDE the frame */}
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
      <div
        className="explainer-media-boundary"
        onClick={togglePlay}
      >
        {/* Mux Video Player without default controls or branding */}
        <MuxPlayer
          ref={playerRef}
          playbackId={playbackId}
          poster={posterUrl}
          preload="metadata"
          playsInline
          className="explainer-mux-player"
          title={title}
          nohotkeys
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onError={handleError}
        />

        {/* Ambient subtle scrim overlay when paused to give the glass button crisp contrast */}
        <div
          className={`explainer-video-scrim ${!isPlaying ? 'scrim--visible' : 'scrim--hidden'}`}
          aria-hidden="true"
        />

        {/* Exactly one prominent Centered Liquid Glass Play/Pause Button */}
        <div
          className={`explainer-center-control-layer ${
            !isPlaying ? 'control-layer--visible' : 'control-layer--hidden'
          }`}
        >
          <button
            type="button"
            className="explainer-liquid-glass-btn"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isCompleted ? 'Replay video' : isPlaying ? 'Pause video' : 'Play video'}
            title={isCompleted ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
          >
            {isCompleted ? (
              <RotateCcw size={32} className="glass-btn-icon" />
            ) : isPlaying ? (
              <Pause size={32} className="glass-btn-icon" />
            ) : (
              <Play size={32} className="glass-btn-icon glass-btn-icon--play" />
            )}
          </button>
        </div>

        {/* Error Fallback */}
        {hasError && (
          <div className="explainer-error-overlay" role="alert">
            <p>Unable to load video stream.</p>
            <button
              type="button"
              className="glass-error-retry"
              onClick={(e) => {
                e.stopPropagation();
                setHasError(false);
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplainerVideoFrame;
