import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  fullWidth = true,
  className = '',
  ...props
}, ref) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-primary-500 focus:border-primary-500';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label htmlFor={props.id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`block w-full rounded-xl border bg-white px-3 py-2.5 text-slate-900 shadow-sm transition-colors ${
            icon ? 'pl-10' : ''
          } ${errorClass} focus:outline-none focus:ring-2`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;