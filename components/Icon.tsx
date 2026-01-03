import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  filled?: boolean;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '', filled = true }) => {
  return (
    <span 
      className={`material-symbols-rounded ${!filled ? 'material-symbols-rounded-outlined' : ''} ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      {name}
    </span>
  );
};
