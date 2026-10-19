import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'interactive' | 'highlight';
  glow?: boolean;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  glow = false,
  id,
}) => {
  return (
    <div
      id={id}
      className={`medvidhi-card card-${variant} ${glow ? 'card-glow' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
