"use client";
const PartialOutlineBtn = ({
    text = "Explore More",
  size = "md",
  bgColor = "bg-black",
  textColor = "text-white",
  hoverBgColor = "hover:bg-gray-100",
  hoverTextColor = "hover:text-black",
  borderColor = "border-gray-400",
  hoverBorderColor = "group-hover:border-gray-100",
}) => {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-2 text-b3"
      : "px-5 py-2 text-b2";

  return (
    <button
      className={`
        group relative inline-flex items-center
        ${sizeClasses} tracking-wide
        ${bgColor} ${textColor}
        ${hoverBgColor} ${hoverTextColor}
        transition-colors duration-300 overflow-hidden
      `}
    >
      {text}

      {/* Top Left */}
      <span
        className={`
          absolute top-0 left-0 w-2 h-2
          border-t border-l
          ${borderColor} ${hoverBorderColor}
          group-hover:w-6 group-hover:h-6
          transition-all duration-300
        `}
      />

      {/* Top Right */}
      <span
        className={`
          absolute top-0 right-0 w-2 h-2
          border-t border-r
          ${borderColor} ${hoverBorderColor}
          group-hover:w-6 group-hover:h-6
          transition-all duration-300
        `}
      />

      {/* Bottom Left */}
      <span
        className={`
          absolute bottom-0 left-0 w-2 h-2
          border-b border-l
          ${borderColor} ${hoverBorderColor}
          group-hover:w-6 group-hover:h-6
          transition-all duration-300
        `}
      />

      {/* Bottom Right */}
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
