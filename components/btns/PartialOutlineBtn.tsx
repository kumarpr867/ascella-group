"use client";
type PartialOutlineBtnProps = {
  text?: string;
  size?: "sm" | "md";
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  onClick?: () => void; 
}

const PartialOutlineBtn = ({
  text = "Explore More",
  size = "md",
  bgColor = "bg-black",
  textColor = "text-white",
  hoverBgColor = "hover:bg-gray-100",
  hoverTextColor = "hover:text-black",
  borderColor = "border-gray-400",
  hoverBorderColor = "group-hover:border-gray-100",
  onClick = () => {},
}) => {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-2 text-b3"
      : "px-5 py-2 text-b2";

  return (
    <button
      onClick={onClick}
      className={`
        group relative inline-flex items-center
        ${sizeClasses} tracking-wide
        ${bgColor} ${textColor}
        ${hoverBgColor} ${hoverTextColor}
        transition-colors duration-300 overflow-hidden
      `}
    >
      {text}

      
      <span
        className={`
          absolute top-0 left-0 w-2 h-2
          border-t border-l
          ${borderColor} ${hoverBorderColor}
          group-hover:w-6 group-hover:h-6
          transition-all duration-300
        `}
      />

      
      <span
        className={`
          absolute top-0 right-0 w-2 h-2
          border-t border-r
          ${borderColor} ${hoverBorderColor}
          group-hover:w-6 group-hover:h-6
          transition-all duration-300
        `}
      />

      
      <span
        className={`
          absolute bottom-0 left-0 w-2 h-2
          border-b border-l
          ${borderColor} ${hoverBorderColor}
          group-hover:w-6 group-hover:h-6
          transition-all duration-300
        `}
      />

      
      <span
        className={`
          absolute bottom-0 right-0 w-2 h-2
          border-b border-r
          ${borderColor} ${hoverBorderColor}
          group-hover:w-6 group-hover:h-6
          transition-all duration-300
        `}
      />
    </button>
  );
};

export default PartialOutlineBtn;
