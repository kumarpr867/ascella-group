// "use client";

// import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";
// import Reveal from "@/utils/Reveal";
// import Heading from "../headings/Heading";

// // helpers
// const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
//   const rad = ((angle - 90) * Math.PI) / 180;
//   return {
//     x: cx + r * Math.cos(rad),
//     y: cy + r * Math.sin(rad),
//   };
// };

// const arcPath = (start: number, end: number) => {
//   const s = polarToCartesian(200, 200, 160, end);
//   const e = polarToCartesian(200, 200, 160, start);
//   const largeArc = end - start <= 180 ? 0 : 1;

//   return `M ${s.x} ${s.y} A 160 160 0 ${largeArc} 0 ${e.x} ${e.y}`;
// };

// export default function OperatingGroup() {
//   const words = [
//     "Engage",
//     "Staffing",
//     "Forge",
//     "Infosec",
//     "Software Labs",
//   ];

//   return (
//     <section className="mt-20 border-y border-color">
//       <div className="flex flex-col py-10 lg:py-20 overflow-x-hidden">

//         {/* TOP CONTENT */}
//         <div className="mx-10 lg:mx-20 xl:mx-24 flex flex-col md:flex-row text-center md:text-left justify-between gap-5">

//           <Reveal
//             variants={slideInFromLeft(0.1)}
//             className="flex flex-col items-center md:items-start gap-6"
//           >
//             <Heading text="Introduction" />
//             <h3 className="text-[18px] md:text-[36px]">
//               What an Operating Group Means
//             </h3>
//             <p className="text-b3 md:w-2/3">
//               Most organisations combine vendors and internal teams to move work forward,
//               while an operating group establishes structure, authority, and accountability
//               before execution begins.
//             </p>
//           </Reveal>

//           <Reveal
//             variants={slideInFromRight(0.1)}
//             className="hidden md:flex flex-col justify-between"
//           >
//             <div></div>
//             <p className="text-b3 text-gray-200 md:text-white">
//               Ascella Group holds operating authority
//             </p>
//           </Reveal>
//         </div>

//         {/* MOBILE */}
//         <Reveal
//           variants={slideInFromBottom(0.1)}
//           className="lg:hidden mx-10 mt-6 flex flex-col items-center"
//         >
//           <div className="text-b2 text-center">
//             Ascella Group holds <br /> operating authority
//           </div>

//           <div className="relative w-full h-[300px] flex items-center justify-center">
//             <div className="w-40 h-40 rounded-full border border-white/20 flex flex-col items-center justify-center text-white text-xs space-y-1">
//               {words.map((w, i) => (
//                 <div key={i}>{w}</div>
//               ))}
//             </div>
//           </div>

//           <div className="text-b2 text-center">
//             Execution arms <br /> deliver outcomes
//           </div>
//         </Reveal>

//         {/* DESKTOP */}
//         <Reveal
//           variants={slideInFromBottom(0.1)}
//           className="relative hidden lg:flex mx-10 lg:mx-20 xl:mx-24 mt-6 py-10 items-center border border-color"
//         >

//           {/* CENTER */}
//           <div className="relative w-full h-[400px] flex items-center justify-center">

//             {/* Glow */}
//             <div className="absolute w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl opacity-30" />

//             {/* CENTER CIRCLE */}
//             <div className="absolute w-56 h-56 rounded-full 
//                             bg-white/10 backdrop-blur-lg 
//                             border border-white/20 
//                             flex flex-col items-center justify-center 
//                             text-white text-sm space-y-1">

//               {words.map((w, i) => (
//                 <div key={i}>{w}</div>
//               ))}
//             </div>

//             {/* SVG */}
//             <svg viewBox="0 0 400 400" className="w-[450px] h-[450px]">

//               <circle
//                 cx="200"
//                 cy="200"
//                 r="160"
//                 stroke="rgba(255,255,255,0.2)"
//                 strokeWidth="1.5"
//                 fill="none"
//               />

//               {[0, 72, 144, 216, 288].map((angle, i) => (
//                 <path
//                   key={i}
//                   d={arcPath(angle, angle + 72)}
//                   stroke="white"
//                   strokeWidth="3"
//                   fill="none"
//                   strokeDasharray="8 10"
//                   style={{
//                     filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
//                   }}
//                 />
//               ))}
//             </svg>
//           </div>

//           {/* SIDE TEXT */}
//           <div className="absolute inset-0 flex items-center justify-between px-10 xl:px-24">
//             <div className="text-b2 text-center">
//               Ascella Group holds <br /> operating authority
//             </div>
//             <div className="text-b2 text-center">
//               Execution arms <br /> deliver outcomes
//             </div>
//           </div>

//         </Reveal>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { slideInFromBottom, slideInFromLeft, slideInFromRight } from "@/utils/motion";
// import Reveal from "@/utils/Reveal";
// import Heading from "../headings/Heading";

// // 🔥 helpers
// const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
//   const rad = ((angle - 90) * Math.PI) / 180;
//   return {
//     x: cx + r * Math.cos(rad),
//     y: cy + r * Math.sin(rad),
//   };
// };

// const arcPath = (start: number, end: number) => {
//   const s = polarToCartesian(200, 200, 160, end);
//   const e = polarToCartesian(200, 200, 160, start);
//   const largeArc = end - start <= 180 ? 0 : 1;

//   return `M ${s.x} ${s.y} A 160 160 0 ${largeArc} 0 ${e.x} ${e.y}`;
// };

// export default function OperatingGroup() {

//   const words = [
//     "Engage",
//     "Staffing",
//     "Forge",
//     "Infosec",
//     "Software Labs",
//   ];

//   return (
//     <section className="mt-20 border-y border-color">
//       <div className="flex flex-col py-10 lg:py-20 overflow-x-hidden">

//         {/* 🔹 TOP CONTENT */}
//         <div className="mx-10 lg:mx-20 xl:mx-24 flex flex-col md:flex-row text-center md:text-left justify-between gap-5">
          
//           <Reveal variants={slideInFromLeft(0.1)} className="flex flex-col items-center md:items-start gap-6">
//             <Heading text="Introduction" />
//             <h3 className="text-[18px] md:text-[36px]">
//               What an Operating Group Means
//             </h3>
//             <p className="text-b3 md:w-2/3">
//               Most organisations combine vendors and internal teams to move work forward, 
//               while an operating group establishes structure, authority, and accountability 
//               before execution begins.
//             </p>
//           </Reveal>

//           <Reveal variants={slideInFromRight(0.1)} className="hidden md:flex flex-col justify-between">
//             <div />
//             <p className="text-b3 text-gray-200 md:text-white">
//               Ascella Group holds operating authority
//             </p>
//           </Reveal>
//         </div>

//         {/* 📱 MOBILE */}
//         <Reveal
//           variants={slideInFromBottom(0.1)}
//           className="lg:hidden mx-10 mt-6 flex flex-col items-center"
//         >
//           <div className="text-center mb-4">
//             Ascella Group holds <br /> operating authority
//           </div>

//           <div className="w-40 h-40 rounded-full border border-white/20 flex flex-col items-center justify-center text-white text-xs space-y-1">
//             {words.map((w, i) => (
//               <div key={i}>{w}</div>
//             ))}
//           </div>

//           <div className="text-center mt-4">
//             Execution arms <br /> deliver outcomes
//           </div>
//         </Reveal>

//         {/* 💻 DESKTOP */}
//         <Reveal
//           variants={slideInFromBottom(0.1)}
//           className="hidden lg:flex relative mx-10 lg:mx-20 xl:mx-24 mt-10 items-center justify-center border border-color h-[450px]"
//         >

//           {/* 🔥 CENTER */}
//           <div className="relative flex items-center justify-center w-full h-full">

//             {/* Glow */}
//             <div className="absolute w-[400px] h-[400px] rounded-full bg-white/10 blur-[100px] opacity-30" />

//             {/* CENTER CIRCLE */}
//             <div className="absolute w-56 h-56 rounded-full 
//                             bg-white/10 backdrop-blur-xl 
//                             border border-white/20 
//                             flex flex-col items-center justify-center 
//                             text-white text-center shadow-xl space-y-1">

//               {words.map((w, i) => (
//                 <div key={i} className="text-sm">
//                   {w}
//                 </div>
//               ))}
//             </div>

//             {/* 🔥 SVG */}
//             <svg viewBox="0 0 400 400" className="w-[450px] h-[450px]">

//               {/* base */}
//               <circle
//                 cx="200"
//                 cy="200"
//                 r="160"
//                 stroke="rgba(255,255,255,0.2)"
//                 strokeWidth="1.5"
//                 fill="none"
//               />

//               {/* animated arcs */}
//               {[0, 72, 144, 216, 288].map((angle, i) => (
//                 <path
//                   key={i}
//                   d={arcPath(angle, angle + 72)}
//                   stroke="white"
//                   strokeWidth="4"
//                   fill="none"
//                   strokeDasharray="10 12"
//                   className="opacity-80 animate-pulse"
//                 />
//               ))}
//             </svg>
//           </div>

//           {/* SIDE TEXT */}
//           <div className="absolute inset-0 flex items-center justify-between px-10">
//             <div className="text-center">
//               Ascella Group holds <br /> operating authority
//             </div>
//             <div className="text-center">
//               Execution arms <br /> deliver outcomes
//             </div>
//           </div>

//         </Reveal>
//       </div>
//     </section>
//   );
// }




// "use client";

// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useState } from "react";
// import {
//   slideInFromBottom,
//   slideInFromLeft,
// } from "@/utils/motion";
// import Reveal from "@/utils/Reveal";
// import Heading from "../headings/Heading";

// // helpers
// const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
//   const rad = ((angle - 90) * Math.PI) / 180;
//   return {
//     x: cx + r * Math.cos(rad),
//     y: cy + r * Math.sin(rad),
//   };
// };

// const arcPath = (start: number, end: number) => {
//   const s = polarToCartesian(200, 200, 160, end);
//   const e = polarToCartesian(200, 200, 160, start);
//   const largeArc = end - start <= 180 ? 0 : 1;

//   return `M ${s.x} ${s.y} A 160 160 0 ${largeArc} 0 ${e.x} ${e.y}`;
// };

// export default function OperatingGroup() {
//   const controls = useAnimation();
//   const [hovered, setHovered] = useState<number | null>(null);

//   const words = [
//     "Infosec",
//     "Software Labs",
//     "Engage",
//     "Staffing",
//     "Forge"
    
//   ];

//   useEffect(() => {
//     controls.start({
//       rotate: 360,
//       transition: {
//         repeat: Infinity,
//         duration: 30,
//         ease: "linear",
//       },
//     });
//   }, [controls]);

//   return (
//     <section className="mt-20 border-y border-color">
//       <div className="flex flex-col py-10 lg:py-20 overflow-x-hidden">

//         {/* 🔹 TOP */}
//         <div className="mx-6 lg:mx-20 xl:mx-24 flex flex-col md:flex-row text-center md:text-left justify-between gap-5">
//           <Reveal
//             variants={slideInFromLeft(0.1)}
//             className="flex flex-col items-center md:items-start gap-6"
//           >
//             <Heading text="Introduction" />
//             <h3 className="text-[20px] md:text-[36px]">
//               What an Operating Group Means
//             </h3>
//             <p className="text-b3 md:w-2/3">
//               Most organisations combine vendors and internal teams to move work forward,
//               while an operating group establishes structure, authority, and accountability before execution begins.
//             </p>
//           </Reveal>
//         </div>

//         {/* 📱 MOBILE */}
//         <Reveal
//           variants={slideInFromBottom(0.1)}
//           className="lg:hidden mt-10 px-6 flex flex-col items-center gap-6"
//         >
//           <div className="text-center text-sm text-white/70">
//             Ascella Group holds <br /> operating authority
//           </div>

//           <div className="relative flex items-center justify-center">
//             <div className="absolute w-[260px] h-[260px] rounded-full 
//               bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_70%)]" />

//             <div className="absolute w-40 h-40 rounded-full 
//               bg-white/10 backdrop-blur-xl border border-white/20 
//               flex flex-col items-center justify-center text-white space-y-1">
//               {words.map((w, i) => (
//                 <div key={i} className="text-xs">{w}</div>
//               ))}
//             </div>

//             <svg viewBox="0 0 400 400" className="w-[280px] h-[280px]">
//               <circle cx="200" cy="200" r="140" stroke="rgba(255,255,255,0.15)" fill="none" />
//               {[0, 72, 144, 216, 288].map((angle, i) => (
//                 <motion.path
//                   key={i}
//                   d={arcPath(angle, angle + 72)}
//                   stroke="white"
//                   strokeWidth="2"
//                   fill="none"
//                   strokeDasharray="10 12"
//                   animate={{ strokeDashoffset: [0, 100] }}
//                   transition={{ repeat: Infinity, duration: 4 + i }}
//                 />
//               ))}
//             </svg>
//           </div>

//           <div className="text-center text-sm text-white/70">
//             Execution arms <br /> deliver outcomes
//           </div>
//         </Reveal>

//         {/* 💻 DESKTOP */}
//         <Reveal
//           variants={slideInFromBottom(0.1)}
//           className="hidden lg:flex mx-10 lg:mx-20 xl:mx-24 mt-16 items-center justify-between border border-color p-10 relative"
//         >

//           {/* LEFT TEXT */}
//           <div className="text-sm text-white/70 max-w-[200px] text-center">
//             Ascella Group holds <br /> operating authority
//           </div>

//           {/* 🔥 CENTER */}
//           <div className="relative flex items-center justify-center">

//             {/* 🔹 LEFT HORIZONTAL LINE */}
//             <div className="absolute left-[-140px] top-1/2 -translate-y-1/2 h-[1px] w-[140px] bg-white/30" />

//             {/* 🔹 RIGHT HORIZONTAL LINE */}
//             <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 h-[1px] w-[140px] bg-white/30" />

//             {/* Glow */}
//             <div className="absolute w-[420px] h-[420px] rounded-full 
//               bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_70%)]" />

//             {/* Center Circle */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="absolute w-60 h-60 rounded-full 
//                 bg-white/10 backdrop-blur-xl border border-white/20 
//                 flex flex-col items-center justify-center text-white space-y-1"
//             >
//               {words.map((w, i) => (
//                 <div key={i} className="text-sm">{w}</div>
//               ))}
//             </motion.div>

//             {/* SVG */}
//             <motion.svg
//               viewBox="0 0 400 400"
//               className="w-[500px] h-[500px]"
//               animate={controls}
//             >
//               <circle cx="200" cy="200" r="160" stroke="rgba(255,255,255,0.15)" fill="none" />

//               {[0, 72, 144, 216, 288].map((angle, i) => {
//                 const isActive = hovered === i;

//                 return (
//                   <motion.path
//                     key={i}
//                     d={arcPath(angle, angle + 72)}
//                     stroke="white"
//                     strokeWidth={isActive ? 6 : 3}
//                     fill="none"
//                     strokeDasharray="12 14"
//                     onMouseEnter={() => setHovered(i)}
//                     onMouseLeave={() => setHovered(null)}
//                     animate={{ strokeDashoffset: [0, 120] }}
//                     transition={{ repeat: Infinity, duration: 4 + i }}
//                     style={{
//                       filter: isActive
//                         ? "drop-shadow(0 0 18px white)"
//                         : "drop-shadow(0 0 6px rgba(255,255,255,0.5))",
//                     }}
//                   />
//                 );
//               })}
//             </motion.svg>
//           </div>

//           {/* RIGHT TEXT */}
//           <div className="text-sm text-white/70 max-w-[200px] text-center">
//             Execution arms <br /> deliver outcomes
//           </div>

//         </Reveal>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import {
  slideInFromBottom,
  slideInFromLeft,
} from "@/utils/motion";
import Reveal from "@/utils/Reveal";
import Heading from "../headings/Heading";

// helpers
const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const arcPath = (start: number, end: number) => {
  const s = polarToCartesian(200, 200, 160, end);
  const e = polarToCartesian(200, 200, 160, start);
  const largeArc = end - start <= 180 ? 0 : 1;

  return `M ${s.x} ${s.y} A 160 160 0 ${largeArc} 0 ${e.x} ${e.y}`;
};

export default function OperatingGroup() {
  const controls = useAnimation();

  const words = [
    "Infosec",
    "Software Labs",
    "Engage",
    "Staffing",
    "Forge"
  ];

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 60, // 🔥 slower rotation
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <section className="mt-20 border-y border-color">
      <div className="flex flex-col py-10 lg:py-20 overflow-x-hidden">

        {/* 🔹 TOP */}
        <div className="mx-6 lg:mx-20 xl:mx-24 flex flex-col md:flex-row text-center md:text-left justify-between gap-5">
          <Reveal
            variants={slideInFromLeft(0.1)}
            className="flex flex-col items-center md:items-start gap-6"
          >
            <Heading text="Introduction" />
            <h3 className="text-[20px] md:text-[36px]">
              What an Operating Group Means
            </h3>
            <p className="text-b3 md:w-2/3">
              Most organisations combine vendors and internal teams to move work forward,
              while an operating group establishes structure, authority, and accountability before execution begins.
            </p>
          </Reveal>
        </div>

        {/* 📱 MOBILE */}
        <Reveal
          variants={slideInFromBottom(0.1)}
          className="lg:hidden mt-10 px-6 flex flex-col items-center gap-6"
        >
          <div className="text-center text-sm text-white/70">
            Ascella Group holds <br /> operating authority
          </div>

          <div className="relative flex items-center justify-center">

            {/* Glow */}
            <div className="absolute w-[240px] h-[240px] rounded-full 
              bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)]" />

            {/* Center */}
            <div className="absolute w-36 h-36 rounded-full 
              bg-white/10 backdrop-blur-xl border border-white/20 
              flex flex-col items-center justify-center text-white space-y-1">
              {words.map((w, i) => (
                <div key={i} className="text-xs">{w}</div>
              ))}
            </div>

            {/* SVG */}
            <svg viewBox="0 0 400 400" className="w-[260px] h-[260px]">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <motion.path
                  key={i}
                  d={arcPath(angle, angle + 72)}
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 12"
                  animate={{ strokeDashoffset: [0, 100] }}
                  transition={{ repeat: Infinity, duration: 6 + i }} // slower
                />
              ))}
            </svg>
          </div>

          <div className="text-center text-sm text-white/70">
            Execution arms <br /> deliver outcomes
          </div>
        </Reveal>

        {/* 💻 DESKTOP */}
        <Reveal
          variants={slideInFromBottom(0.1)}
          className="hidden lg:flex mx-10 lg:mx-20 xl:mx-24 mt-16 items-center justify-between border border-color p-10 relative"
        >

          {/* LEFT TEXT */}
          <div className="text-sm text-white/70 max-w-[200px] text-center">
            Ascella Group holds <br /> operating authority
          </div>

          {/* CENTER */}
          <div className="relative flex items-center justify-center">

            {/* Lines */}
            <div className="absolute left-[-140px] top-1/2 -translate-y-1/2 h-[1px] w-[140px] bg-white/30" />
            <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 h-[1px] w-[140px] bg-white/30" />

            {/* Glow */}
            <div className="absolute w-[380px] h-[380px] rounded-full 
              bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_70%)]" />

            {/* Center circle */}
            <div className="absolute w-52 h-52 rounded-full 
              bg-white/10 backdrop-blur-xl border border-white/20 
              flex flex-col items-center justify-center text-white space-y-1">
              {words.map((w, i) => (
                <div key={i} className="text-sm">{w}</div>
              ))}
            </div>

            {/* SVG rotation */}
            <motion.svg
              viewBox="0 0 400 400"
              className="w-[440px] h-[440px]"
              animate={controls}
            >
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <motion.path
                  key={i}
                  d={arcPath(angle, angle + 72)}
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="12 14"
                  animate={{ strokeDashoffset: [0, 120] }}
                  transition={{ repeat: Infinity, duration: 6 + i }}
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(255,255,255,0.5))",
                  }}
                />
              ))}
            </motion.svg>
          </div>

          {/* RIGHT TEXT */}
          <div className="text-sm text-white/70 max-w-[200px] text-center">
            Execution arms <br /> deliver outcomes
          </div>

        </Reveal>
      </div>
    </section>
  );
}