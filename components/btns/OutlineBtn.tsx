interface Props {
  text?: string;
  size?: "sm" | "md" | "lg";
  color?: string; 
  className?: string;
}

export default function OutlineBtn({
  text = "Button",
  size = "md",
  color = "#9E9E9E", 
  className = "",
}: Props) {
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-5 py-2 text-sm",
    lg: "px-7 py-3 text-base",
  };

  return (
    <button
      className={`
        group flex items-center gap-3 border
        transition-all duration-200
        ${sizes[size]} ${className}
      `}
      style={{
        borderColor: color,
        color: color,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = color;
        e.currentTarget.style.color = "#000";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = color;
      }}
    >
      {text}

      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="currentColor"
      >
        <rect width="2" height="2" />
        <rect y="6" width="2" height="2" />
        <rect x="6" y="6" width="2" height="2" />
        <rect x="6" width="2" height="2" />
        <rect x="12" y="6" width="2" height="2" />
        <rect x="6" y="12" width="2" height="2" />
        <rect x="12" y="12" width="2" height="2" />
      </svg>
    </button>
  );
}
