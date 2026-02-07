type PrecisionGridProps = {
  size?: number
  lineColor?: string
  opacity?: number
  fade?: "radial" | "horizontal" | "none"
}

export default function PrecisionGrid({
  size = 80,
  lineColor = "#333",
  opacity = 0.25,
  fade = "radial",
}: PrecisionGridProps) {
  const mask =
    fade === "radial"
      ? `
        radial-gradient(
          ellipse at center,
          rgba(0,0,0,1) 40%,
          rgba(0,0,0,0.6) 60%,
          rgba(0,0,0,0) 80%
        )
      `
      : fade === "horizontal"
      ? `
        linear-gradient(
          to right,
          transparent,
          black 20%,
          black 80%,
          transparent
        )
      `
      : "none"

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  )
}
