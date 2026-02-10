import React from 'react';

type Props = {
  title: string;
  index?: string;
  children?: React.ReactNode;
  open?: boolean;
};

const AccordionItem: React.FC<Props> = ({ title, index, children, open = false }) => {
  return (
    <details open={open} className="group">
      <summary className="list-none flex justify-between items-start py-6 cursor-pointer pl-12 pr-12 border-b border-gray-700">
        <div className="max-w-xl">
          <h4 className="text-xl font-light">{title}</h4>
          {/* description placed below when details opened */}
        </div>
        <div className="text-2xl font-mono tracking-wider text-gray-400">{index}</div>
      </summary>

      {children ? (
        <div className="pl-12 pr-12 pb-6 text-sm text-gray-400">
          {children}
        </div>
      ) : null}
    </details>
  );
};

export default AccordionItem;
