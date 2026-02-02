'use client';

import React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';

type PlusHeadingProps = {
  text: string;
  size?: Size;
  plusSize?: Size | string;
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
};

const plusSizeClasses: Record<Size, string> = {
  sm: 'w-2 h-2',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

const PlusHeading: React.FC<PlusHeadingProps> = ({
  text,
  size = 'md',
  plusSize,
}) => {
  const resolvedPlusSize =
    plusSize && plusSize in plusSizeClasses
      ? plusSizeClasses[plusSize as Size]
      : plusSize ?? plusSizeClasses[size];

  return (
    <h2 className="group flex items-center gap-4 cursor-default">
      {/* Plus Icon */}
      <span
        className={`
          relative
          flex items-center justify-center
          transition-all duration-400 ease-out
          group-hover:rotate-180
          group-hover:scale-125
          ${resolvedPlusSize}
        `}
      >
        <span className="absolute w-full h-0.5 bg-white" />
        <span className="absolute h-full w-0.5 bg-white" />
      </span>

      <span className={`${sizeClasses[size]} font-light`}>
        {text}
      </span>
    </h2>
  );
};

export default PlusHeading;
