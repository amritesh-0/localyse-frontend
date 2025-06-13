import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ className = '', children, ...props }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
