import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  asAnchor = false,
  href,
  ...props
}) => {
  const classNames = `medvidhi-btn btn-${variant} btn-${size} ${isLoading ? 'btn-loading' : ''} ${className}`;

  if (asAnchor && href) {
    return (
      <a href={href} className={classNames} aria-disabled={disabled}>
        {leftIcon && <span className="btn-icon left">{leftIcon}</span>}
        <span className="btn-text">{children}</span>
        {rightIcon && <span className="btn-icon right">{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button
      className={classNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        leftIcon && <span className="btn-icon left">{leftIcon}</span>
      )}
      <span className="btn-text">{children}</span>
      {!isLoading && rightIcon && <span className="btn-icon right">{rightIcon}</span>}
    </button>
  );
};
