"use client"

import { useEffect, useState } from "react"

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const percent = (scrollTop / docHeight) * 100
      setProgress(percent)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-[0px] left-0 w-full h-[4px] z-[9999]">
      <div
        className="h-full bg-white"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}