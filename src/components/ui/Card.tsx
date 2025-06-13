import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
}) => {
  const hoverClasses = hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-md' : '';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={`card ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;