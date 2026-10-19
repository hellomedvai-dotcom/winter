import React from 'react';
import { BRAND } from '@/config/brand';
import './Brand.css';

export interface BrandMarkProps {
  className?: string;
  size?: number | string;
  theme?: 'light' | 'dark';
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  size = 32,
  theme = 'light',
}) => {
  const isLight = theme === 'light';
  const assetSrc = isLight ? BRAND.assets.markLightCropped : BRAND.assets.markDark;

  return (
    <div
      className={`medvidhi-mark-container theme-${theme} ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
    >
      <img
        src={assetSrc}
        alt="MEDVIDHI Mark"
        className="medvidhi-mark-image"
      />
    </div>
  );
};
