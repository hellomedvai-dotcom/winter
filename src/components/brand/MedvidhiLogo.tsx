import React from 'react';
import { BRAND } from '@/config/brand';
import './Brand.css';

export interface MedvidhiLogoProps {
  className?: string;
  height?: number | string;
  showMarkOnly?: boolean;
  priority?: boolean;
  theme?: 'light' | 'dark';
}

/**
 * MedvidhiLogo
 * 
 * Renders the authentic supplied MEDVIDHI logo asset.
 * Guarantees zero redrawing or generic symbol replacement.
 * Supports both light (predominantly white canvas) and dark visual modes.
 */
export const MedvidhiLogo: React.FC<MedvidhiLogoProps> = ({
  className = '',
  height = 30,
  showMarkOnly = false,
  priority = false,
  theme = 'light',
}) => {
  const isLight = theme === 'light';

  return (
    <div className={`medvidhi-brand-lockup theme-${theme} ${className}`}>
      <img
        src={isLight ? BRAND.assets.markBlackTransparent : BRAND.assets.markWhiteTransparent}
        alt="MEDVIDHI Mark"
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className="medvidhi-brand-mark"
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          width: 'auto',
        }}
      />
      {!showMarkOnly && (
        <span className="medvidhi-brand-text" aria-label="MEDVIDHI">
          MEDVIDHI
        </span>
      )}
    </div>
  );
};
