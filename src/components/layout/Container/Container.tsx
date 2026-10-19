import React from 'react';
import './Container.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
  id,
}) => {
  return (
    <div id={id} className={`medvidhi-container container-${size} ${className}`}>
      {children}
    </div>
  );
};
