import { useEffect, useRef } from "react";

export default function InteractiveGrid() {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = ref.current;
        if (!svg) return;

        // Select both lines and paths
        const lines = svg.querySelectorAll<SVGLineElement>("line");
        const paths = svg.querySelectorAll<SVGPathElement>("path");
        const elements = [...lines, ...paths];

        const handleMove = (e: MouseEvent) => {
            const rect = svg.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            elements.forEach((element) => {
                const box = element.getBBox();
                const cx = box.x + box.width / 2;
                const cy = box.y + box.height / 2;

                const dx = mx - cx;
                const dy = my - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const max = 250;
                const intensity = Math.max(0, 1 - dist / max);

                // Handle stroke opacity
                element.style.strokeOpacity = (0.05 + intensity * 0.7).toString();
                
                // Apply glow filter only to lines when close enough
                if (element.tagName === 'line' && intensity > 0.3) {
                    element.style.filter = "url(#gridGlow)";
                } else {
                    element.style.filter = "none";
                }
            });
        };

        svg.addEventListener("mousemove", handleMove);
        return () => svg.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <svg ref={ref} width="830" height="587" viewBox="0 0 830 587" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Grid Glow Filter */}
                <filter id="gridGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>

                {/* Linear Gradients */}
                <linearGradient id="paint0_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint2_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint3_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint4_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint5_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint6_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint7_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint8_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint9_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint10_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint11_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint12_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint13_linear_790_1251" x1="759.102" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint14_linear_790_1251" x1="334.795" y1="236.5" x2="213.795" y2="240.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 393.982 -26)" stroke="url(#paint0_linear_790_1251)" strokeOpacity="0.06" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 328.202 10)" stroke="url(#paint1_linear_790_1251)" strokeOpacity="0.06" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 262.422 46)" stroke="url(#paint2_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 196.642 82)" stroke="url(#paint3_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 130.861 118)" stroke="url(#paint4_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 65.0811 154)" stroke="url(#paint5_linear_790_1251)" strokeOpacity="0.06" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(0.862615 0.505861 0.795028 -0.606572 0.794922 202)" stroke="url(#paint6_linear_790_1251)" strokeOpacity="0.06" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 655.608 -26)" stroke="url(#paint7_linear_790_1251)" strokeOpacity="0.02" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 721.389 10)" stroke="url(#paint8_linear_790_1251)" strokeOpacity="0.04" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 787.169 46)" stroke="url(#paint9_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 852.949 82)" stroke="url(#paint10_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 918.729 118)" stroke="url(#paint11_linear_790_1251)" strokeOpacity="0.12" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 984.51 154)" stroke="url(#paint12_linear_790_1251)" strokeOpacity="0.04" strokeDasharray="2 2" />
            <line y1="-0.5" x2="759.102" y2="-0.5" transform="matrix(-0.862615 0.505861 -0.795028 -0.606572 1048.79 202)" stroke="url(#paint13_linear_790_1251)" strokeOpacity="0.02" strokeDasharray="2 2" />
            
            {/* Paths */}
            <path d="M461.788 237.498L477.046 246.367L477.05 246.369L524.3 274.421L571.546 247.342L587.806 237.514C577.069 231.433 561.491 222.498 548.48 214.92C541.824 211.043 535.837 207.519 531.514 204.914C529.353 203.612 527.604 202.538 526.394 201.763C525.79 201.376 525.314 201.06 524.986 200.826C524.886 200.754 524.796 200.685 524.719 200.624L461.788 237.498Z" stroke="white" strokeOpacity="0.12" />
            <path d="M207.788 237.498L223.046 246.367L223.05 246.369L270.3 274.421L317.546 247.342L333.806 237.514C323.069 231.433 307.491 222.498 294.48 214.92C287.824 211.043 281.837 207.519 277.514 204.914C275.353 203.612 273.604 202.538 272.394 201.763C271.79 201.376 271.314 201.06 270.986 200.826C270.886 200.754 270.796 200.685 270.719 200.624L207.788 237.498Z" stroke="url(#paint14_linear_790_1251)" strokeOpacity="0.12" />
        </svg>
    );
}