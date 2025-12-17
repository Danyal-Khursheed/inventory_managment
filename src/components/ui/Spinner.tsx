import React from 'react';

export const Spinner = ({ className }: { className?: string }) => (
  <div
    className={`animate-spin rounded-full border-4 border-gray-300 border-t-transparent ${className}`}
    style={{ width: '1rem', height: '1rem' }}
  />
);
