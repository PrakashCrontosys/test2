import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className = '', ...props }: Props) {
  return (
    <>
      <input
        className={`block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </>
  );
}