"use client"

import { useRouter } from "next/navigation"

type Props = {
  textColor?: string // Tailwind class, e.g., "text-gray-200"
  textSize?: string  // Tailwind class, e.g., "text-b2"
}

export default function BackNavigationBtn({ textColor = "text-gray-200", textSize = "text-b2" }: Props) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push("/JD-Page")}
      className={`flex mb-6 items-center gap-2 ${textColor} hover:text-white transition ${textSize}`}
    >
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path
          d="M11.707 4.85355H0.707031M0.707031 4.85355L5.20703 0.353546M0.707031 4.85355L5.20703 9.35355"
          stroke="currentColor"
        />
      </svg>
      <p className="text-b3">See all jobs</p>
    </button>
  )
}