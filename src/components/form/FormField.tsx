import React from 'react';

interface Props {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ label, required = false, children }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}