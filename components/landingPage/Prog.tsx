"use client"

import React, { useEffect, useRef, useState } from "react"
import PartialOutlineBtn from "../btns/PartialOutlineBtn"

// SVG center
const CX = 308.958
const CY = 314.981

const DOT_R = Math.sqrt(99.89 ** 2 + 82.113 ** 2)
const DOT_ORIG_ANGLE = Math.atan2(82.113, -99.89)

const R_INNER = 140

function InteractiveSVG() {
    const outerAngleRef = useRef(0)
    const midAngleRef   = useRef(0)
    const innerAngleRef = useRef(0)

    // Dot current position (lerped)
    const dotXRef = useRef(CX + DOT_R * Math.cos(DOT_ORIG_ANGLE))
    const dotYRef = useRef(CY + DOT_R * Math.sin(DOT_ORIG_ANGLE))

    // Dot target position
    const dotTargetXRef = useRef(dotXRef.current)
    const dotTargetYRef = useRef(dotYRef.current)

    const midVelRef   = useRef(0)
    const innerVelRef = useRef(0)

    const hoverRef = useRef({
        mid:        false,
        inner:      false,
        dot:        false,
        clickInner: false,
    })

    const [outerAngle,    setOuterAngle]    = useState(0)
    const [midAngle,      setMidAngle]      = useState(0)
    const [innerAngle,    setInnerAngle]    = useState(0)
    const [dotPos,        setDotPos]        = useState({ x: dotXRef.current, y: dotYRef.current })
    const [isDotHovered,  setIsDotHovered]  = useState(false)
    const [isInsideInner, setIsInsideInner] = useState(false)
    const [cursorPos,     setCursorPos]     = useState({ x: 0, y: 0 })

    const svgRef = useRef<SVGSVGElement | null>(null)
    const rafRef = useRef<number | null>(null)

    const OUTER_SPEED = -0.15

    useEffect(() => {
        const SPEED    = 0.6
        const LERP     = 0.07
        const DOT_LERP = 0.09

        const loop = () => {
            const h = hoverRef.current

            outerAngleRef.current += OUTER_SPEED

            let midTarget   = 0
            let innerTarget = 0

            if (h.clickInner) {
                innerTarget = SPEED
            } else {
                if (h.mid)   midTarget   = -SPEED
                if (h.inner) innerTarget =  SPEED
            }

            midVelRef.current   += (midTarget   - midVelRef.current)   * LERP
            innerVelRef.current += (innerTarget - innerVelRef.current)  * LERP

            midAngleRef.current   += midVelRef.current
            innerAngleRef.current += innerVelRef.current

            // Smoothly lerp dot toward target
            dotXRef.current += (dotTargetXRef.current - dotXRef.current) * DOT_LERP
            dotYRef.current += (dotTargetYRef.current - dotYRef.current) * DOT_LERP

            setOuterAngle(outerAngleRef.current)
            setMidAngle(midAngleRef.current)
            setInnerAngle(innerAngleRef.current)
            setDotPos({ x: dotXRef.current, y: dotYRef.current })

            rafRef.current = requestAnimationFrame(loop)
        }

        rafRef.current = requestAnimationFrame(loop)
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    }, [])

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svg = svgRef.current
        if (!svg) return

        const pt  = svg.createSVGPoint()
        pt.x = e.clientX
        pt.y = e.clientY
        const ctm = svg.getScreenCTM()
        if (!ctm) return
        const svgP = pt.matrixTransform(ctm.inverse())

        const dx   = svgP.x - CX
        const dy   = svgP.y - CY
        const dist = Math.sqrt(dx * dx + dy * dy)

        const R_MID_IN  = 141
        const R_MID_OUT = 185

        // Check if cursor is on the dot
        const ddx  = svgP.x - dotXRef.current
        const ddy  = svgP.y - dotYRef.current
        const dotD = Math.sqrt(ddx * ddx + ddy * ddy)

        const isOnDot = dotD < 18
        setIsDotHovered(isOnDot)
        setIsInsideInner(dist < R_INNER)
        setCursorPos({ x: svgP.x, y: svgP.y })

        hoverRef.current.dot   = isOnDot
        hoverRef.current.inner = dist < R_INNER && !isOnDot
        hoverRef.current.mid   = dist >= R_MID_IN && dist <= R_MID_OUT

        if (dist < R_INNER && !isOnDot) {
            // Move dot to exact cursor position, clamped inside circle boundary
            const angle       = Math.atan2(dy, dx)
            const clampedDist = Math.min(dist, R_INNER - 13)
            dotTargetXRef.current = CX + clampedDist * Math.cos(angle)
            dotTargetYRef.current = CY + clampedDist * Math.sin(angle)
        }

        // If cursor hovers the dot → push it away
        if (isOnDot) {
            const angle  = Math.atan2(dy, dx)
            const offset = Math.PI * (0.85 + Math.random() * 0.3)
            const pushR  = R_INNER * 0.8
            dotTargetXRef.current = CX + pushR * Math.cos(angle + offset)
            dotTargetYRef.current = CY + pushR * Math.sin(angle + offset)
        }
    }

    const handleMouseLeave = () => {
        hoverRef.current = { mid: false, inner: false, dot: false, clickInner: false }
        setIsDotHovered(false)
        setIsInsideInner(false)
    }

    const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svg = svgRef.current
        if (!svg) return
        const pt  = svg.createSVGPoint()
        pt.x = e.clientX
        pt.y = e.clientY
        const ctm = svg.getScreenCTM()
        if (!ctm) return
        const svgP = pt.matrixTransform(ctm.inverse())
        const dx   = svgP.x - CX
        const dy   = svgP.y - CY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < R_INNER) {
            hoverRef.current.clickInner = !hoverRef.current.clickInner
        }
    }

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 620 630"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto"
            style={{ cursor: isInsideInner ? "none" : "default" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* ── STATIC: 4 faint background circles ── */}
            <circle cx="308.958" cy="188.472" r="188.222" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
            <circle cx="308.958" cy="441.49"  r="188.222" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
            <circle cx="431.163" cy="314.98"  r="188.222" transform="rotate(90 431.163 314.98)" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
            <circle cx="188.472" cy="314.98"  r="188.222" transform="rotate(90 188.472 314.98)" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />

            {/* ── OUTER GROUP ── */}
            <g transform={`rotate(${outerAngle} ${CX} ${CY})`}>
                <path d="M308.07 67.144C444.624 67.1443 555.324 178.104 555.324 314.981C555.324 451.858 444.624 562.818 308.07 562.818C171.516 562.818 60.815 451.858 60.8149 314.981C60.8149 178.104 171.516 67.144 308.07 67.144Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <path d="M308.07 92.7678C430.472 92.7681 529.7 192.256 529.7 314.981C529.7 437.706 430.472 537.193 308.07 537.194C185.667 537.194 86.439 437.706 86.439 314.981C86.439 192.255 185.667 92.7678 308.07 92.7678Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <ellipse cx="311.563" cy="66.8939"  rx="2.91183" ry="3.4942" fill="white" />
                <ellipse cx="311.563" cy="563.067"  rx="2.91183" ry="3.4942" fill="white" />
                <circle  cx="555.573" cy="314.981"  r="3.4942" fill="white" />
                <circle  cx="60.5652" cy="314.981"  r="3.4942" fill="white" />
                <line x1="361.697" y1="483.594" x2="373.279" y2="526.82" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line y1="-0.25" x2="44.7516" y2="-0.25" transform="matrix(-0.258819 0.965926 0.965926 0.258819 251.298 483.658)" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line x1="264.824" y1="143.121" x2="253.241" y2="99.8941" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line y1="-0.25" x2="44.7516" y2="-0.25" transform="matrix(0.258819 -0.965926 -0.965926 -0.258819 351.127 143.056)" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line y1="-0.25" x2="44.7516" y2="-0.25" transform="matrix(0.837422 -0.546557 -0.546557 -0.837422 463.005 229.283)" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line x1="408.143" y1="461.158" x2="430.518" y2="499.914" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line y1="-0.25" x2="44.7516" y2="-0.25" transform="matrix(-0.5 0.866025 0.866025 0.5 206.547 459.561)" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line x1="218.378" y1="162.807" x2="196.002" y2="124.051" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line y1="-0.25" x2="44.7516" y2="-0.25" transform="matrix(0.5 -0.866025 -0.866025 -0.5 397.598 162.682)" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line y1="-0.25" x2="44.7516" y2="-0.25" transform="matrix(0.950347 -0.311193 -0.311193 -0.950347 480.212 273.828)" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line x1="154.38"  y1="226.05"  x2="116.904" y2="201.59"  stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line x1="137.122" y1="268.9"   x2="94.5928" y2="254.974" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line y1="-0.25" x2="44.7516" y2="-0.25" transform="matrix(-0.874704 0.484657 0.484657 0.874704 149.302 392.435)" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line x1="466.566" y1="393.937" x2="505.71"  y2="415.626" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line y1="-0.25" x2="44.7516" y2="-0.25" transform="matrix(-0.973935 0.226828 0.226828 0.973935 134.807 352.848)" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line x1="480.996" y1="354.324" x2="524.582" y2="364.475" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
            </g>

            {/* ── MID GROUP ── */}
            <g transform={`rotate(${midAngle} ${CX} ${CY})`}>
                <path d="M308.07 138.192C406.03 138.192 485.441 217.344 485.441 314.981C485.441 412.618 406.03 491.771 308.07 491.771C210.11 491.77 130.699 412.618 130.699 314.981C130.699 217.344 210.11 138.192 308.07 138.192Z" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
                <line x1="311.786" y1="92.9503"  x2="308.344" y2="282.283" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="6 6" />
                <line x1="310.066" y1="337.354"  x2="311.787" y2="537.014" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="6 6" />
                <line x1="330.629" y1="337.162"  x2="478.722" y2="457.092" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="6 6" />
                <line x1="278.995" y1="337.546"  x2="138.248" y2="457.252" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="6 6" />
                <line x1="151.643" y1="158.172"  x2="279.012" y2="282.099" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="6 6" />
                <line x1="465.549" y1="158.535"  x2="330.636" y2="282.462" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="6 6" />
                <line x1="330.781" y1="314.73"   x2="529.949" y2="314.73"  stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="6 6" />
                <line x1="86.189"  y1="314.73"   x2="278.369" y2="314.73"  stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="6 6" />
            </g>

            {/* ── INNER GROUP ── */}
            <g transform={`rotate(${innerAngle} ${CX} ${CY})`}>
                <circle cx="309.816" cy="314.981" r="140.932" fill="url(#paint0_radial_125_2049)" fillOpacity="0.4" />
                <circle cx="309.816" cy="314.981" r="140.682" stroke="white" strokeOpacity="0.5" strokeWidth="0.5" />
            </g>

            {/* ── REAL DOT — hidden when cursor is inside inner circle ── */}
            {!isInsideInner && (
                <circle
                    cx={dotPos.x}
                    cy={dotPos.y}
                    r={11.065}
                    fill="#9ca3af"
                    style={{ cursor: "pointer" }}
                />
            )}

            {/* ── CUSTOM CURSOR DOT — shown only inside inner circle ── */}
            {isInsideInner && (
                <>
                    <circle
                        cx={cursorPos.x}
                        cy={cursorPos.y}
                        r={20}
                        fill="white"
                        fillOpacity="0.06"
                        style={{ pointerEvents: "none" }}
                    />
                    <circle
                        cx={cursorPos.x}
                        cy={cursorPos.y}
                        r={11}
                        fill="#9ca3af"
                        style={{
                            pointerEvents: "none",
                            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
                        }}
                    />
                </>
            )}

            <defs>
                <radialGradient id="paint0_radial_125_2049" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(309.816 314.981) rotate(90) scale(317.657)">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.327624" stopColor="white" stopOpacity="0" />
                    <stop offset="1" stopColor="white" />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default function Prog() {
    return (
        <section>
            <div className="border-y border-color">
                <div className="mx-10 xl:mx-auto max-w-7xl flex py-8 px-5 lg:px-10 lg:py-10 border-x border-color">
                    <h3 className="text-[24px] md:text-[36px] text-gray-300 leading-tight tracking-tighter">
                        <span className="text-white">The programme focuses on </span>
                        embedding operating <br />discipline before scale introduces complexity.
                    </h3>
                </div>
            </div>

            <div className="mx-10 xl:mx-auto max-w-7xl  border-x border-color">
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-color">
                        {[
                            {
                                title: "Central Decision Engine",
                                subtitle: "A single decision authority receives inputs, sets priorities, and signs off on trade offs.",
                                body: "Roles and responsibilities map to outcomes, not tasks. Escalation follows a clear path so issues reach the right level fast. This reduces overlap and speeds delivery.",
                            },
                            {
                                title: "Named Accountability",
                                subtitle: "Every critical control has an accountable person and a documented remit.",
                                body: "Work packages include named owners, acceptance criteria, and delivery milestones. Status becomes factual, not noisy, because responsibility is visible. That visibility shortens feedback loops and limits scope creep.",
                            },
                            {
                                title: "Control Gates",
                                subtitle: "Release and change gates require explicit approvals tied to risk and impact.",
                                body: "Each gate has standard evidence, owners, and timelines. Decisions either progress work or resolve blockers before impact widens. The result is steadier operations and fewer emergency escalations.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="border-b border-color p-6 lg:p-10 last:border-0">
                                <h5 className="text-[18px] md:text-[20px] pb-10">{item.title}</h5>
                                <p className="text-b2 pb-2 md:pr-48">{item.subtitle}</p>
                                <p className="text-b2 text-gray-200">{item.body}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center p-6 lg:p-10">
                        <InteractiveSVG />
                    </div>
                </div>
            </div>

            <div className="w-full border-y border-color">
                <div className="mx-10 xl:mx-auto max-w-7xl border-x border-color">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between p-6 lg:p-10">
                        <PartialOutlineBtn text="See How It Works" size="sm" />
                        <p className="sm:w-xs text-left leading-relaxed text-b3 ">
                            Complexity grows faster than controls when scale outruns governance. Clear gates keep delivery steady as scope expands.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}