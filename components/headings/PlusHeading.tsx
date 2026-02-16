'use client';

import React from 'react';

type Size = 'b1' | 'b2' | 'b3';

type PlusHeadingProps = {
  text: string;
  size?: Size;
  plusSize?: 'sm' | 'md' | 'lg' | string;
};

const textSizeClasses: Record<Size, string> = {
  b1: 'text-b1',
  b2: 'text-b2',
  b3: 'text-b3',
};

const plusSizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const PlusHeading: React.FC<PlusHeadingProps> = ({
  text,
  size = 'b1',
  plusSize = 'md',
}) => {
  const resolvedPlusSize =
    plusSize in plusSizeClasses
      ? plusSizeClasses[plusSize as keyof typeof plusSizeClasses]
      : plusSize;

  return (
    <div className="group flex items-center gap-3 cursor-default">
      
      <span
        className={`
          relative flex items-center justify-center
          ${resolvedPlusSize}
          transition-transform duration-300 ease-out
          group-hover:rotate-180
          group-hover:scale-150
        `}
      >
        <span className="absolute w-full h-px bg-current" />
        <span className="absolute h-full w-px bg-current" />
      </span>

      <span className={`${textSizeClasses[size]} font-normal`}>
        {text}
      </span>
    </div>
  );
};

export default PlusHeading;
