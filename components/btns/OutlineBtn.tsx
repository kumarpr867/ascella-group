interface Props {
  text?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function OutlineBtn({
  text = "Button",
  size = "md",
  color = "var(--color-white)",
  className = "",
  onClick,
}: Props) {
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-5 py-2 text-sm",
    lg: "px-7 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`
  group flex items-center gap-3 border
  transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 hover:font-extrabold
  ${sizes[size]} ${className}
`}
      style={{
        borderColor: 'var(--color-gray-100)',
        backgroundColor: color,
        color: 'var(--color-black)',
      }}
      onMouseEnter={(e) => {
        const root = getComputedStyle(document.documentElement);
        e.currentTarget.style.backgroundColor = root.getPropertyValue('--color-white');
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = color;
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