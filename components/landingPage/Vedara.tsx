'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const principles = [
  {
    id: "01",
    title: "HAND-VETTED BY\nHUMAN INTELLIGENCE",
    image: "/Security.png",
  },
  {
    id: "02",
    title: "DEMONSTRATE\nGENERATIONAL PURPOSE",
    image: "/dynasty/scrollImg2.png",
  },
  {
    id: "03",
    title: "DESIGNED TO ENDURE",
    image: "/dynasty/scrollImg3.png",
  },
  {
    id: "04",
    title: "CONTINUITY IN PURPOSE",
    image: "/dynasty/scrollImg4.png",
  },
];

// Basic Reveal shim and slide variants (replace with real implementations as needed)
const Reveal = ({ children, variants }: any) => (
  <motion.div initial="hidden" animate="show" variants={variants}>
    {children}
  </motion.div>
)

const slideInFromLeft = (d = 0) => ({ hidden: { x: -50, opacity: 0 }, show: { x: 0, opacity: 1, transition: { delay: d } }})
const slideInFromRight = (d = 0) => ({ hidden: { x: 50, opacity: 0 }, show: { x: 0, opacity: 1, transition: { delay: d } }})
const slideInFromBottom = (d = 0) => ({ hidden: { y: 50, opacity: 0 }, show: { y: 0, opacity: 1, transition: { delay: d } }})

const Vedara = () => {
  const container2 = useRef<any>(null)
  const sectionRef = useRef<any>(null)
  const itemRefs = useRef<any[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [segmentHeight, setSegmentHeight] = useState(0)
  const [segmentTop, setSegmentTop] = useState(0)
  const prevIndex = useRef(0)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const s2 = useTransform(scrollYProgress ?? 0, [0, 1], [0, -70])

  useEffect(() => {
    if (!scrollYProgress) return

    const total = principles.length
    setSegmentHeight(100 / total)

    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = Math.min(total - 1, Math.floor(v * total))

      const dir = idx > prevIndex.current ? 1 : idx < prevIndex.current ? -1 : direction
      setDirection(dir)
      setActiveIndex(idx)
      prevIndex.current = idx

      setSegmentTop(idx * (100 / total))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
          <section ref={container2} className="flex flex-col justify-center items-center gap-5 w-screen py-35 relative bg-primary text-white">
        <motion.div style={{y:s2}} className="flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:w-full gap-y-6 px-15 lg:px-23">
          <Reveal variants={slideInFromLeft(0.2)}>
            <div className="flex flex-col gap-y-8">
              <p className="uppercase text-[24px] lg:text-[45px] w-95 md:w-120 lg:w-168.5 tracking-tight leading-tight">
                A Private Ecosystem Engineered for Excellence
              </p>
              <p className="w-70 md:w-83.75 lg:w-116 text-[14px] lg:text-[16px] leading-tight">
                Vedara Dynasty operates through a protected, invitation-only infrastructure designed for absolute trust and emotional resonance.
              </p>
            </div>
          </Reveal>
          <Reveal variants={slideInFromRight(0.2)}>
            <p className="lg:text-right w-95 md:w-120 text-[14px] lg:text-[16px] leading-tight">
              Every project is vetted for meaning, resonance, and a future measured in decades.
            </p>
          </Reveal>
        </motion.div>


        <Reveal variants={slideInFromBottom(0.2)}>
          <section ref={sectionRef} className="relative h-[260vh]">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">
              <motion.div className="h-auto mt-0 lg:mt-10 py-5 ">
                <p className="lg:hidden w-[380px] md:w-120 mx-auto text-[20px] leading-tight mb-24">
                  The Dynasty Is Governed By Principles
                  That Protect Purity, Rarity, And Meaning.
                </p>
                <p className="hidden lg:block w-170 mx-auto text-[32px] leading-tight mb-24">
                  The Dynasty Is Governed By Principles
                  <br />
                  That Protect Purity, Rarity, And Meaning.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative w-[380px] md:w-120 lg:w-127 lg:h-full overflow-y-scroll">
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-black/10">
                      <div
                        className="absolute left-0 w-full bg-black transition-all duration-500 ease-out"
                        style={{
                          height: `${segmentHeight}%`,
                          top: `${segmentTop}%`,
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-4 lg:gap-20 lg:pl-10 py-5 lg:py-10">
                      {principles.map((item, i) => (
                        <div
                          key={item.id}
                          ref={(el) => { itemRefs.current[i] = el }}
                          data-index={i}
                          className="flex flex-col lg:flex-row gap-6 items-start pl-10"
                        >
                          <div className="flex gap-4">
                            <span
                              className={`text-sm transition-opacity duration-300 ${
                                activeIndex === i ? "text-black" : "text-black/30"
                              }`}
                            >
                              ({item.id})
                            </span>

                            <p
                              className={` text-[16px] leading-relaxed transition-opacity duration-300 ${
                                activeIndex === i ? "opacity-100" : "opacity-30"
                              }`}
                            >
                              {item.title}
                            </p>
                          </div>

                          <motion.div
                            className={`lg:hidden overflow-hidden transition-all duration-700 ease-out pl-10 ${
                              activeIndex === i
                                ? "max-h-60 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="relative w-full h-60 rounded-xl overflow-hidden">
                              <img
                                src={item.image}
                                alt="principle image"
                                className="w-[220px] object-cover"
                              />
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hidden lg:block relative w-108.75 h-105 rounded-xl overflow-hidden">
                    <AnimatePresence>
                      <motion.div
                        key={principles[activeIndex].image}
                        className="absolute inset-0 rounded-xl"
                        initial={{ y: direction === 1 ? "100%" : "-100%", }}
                        animate={{ y: "0%" }}
                        exit={{ y: direction === 1 ? "-20%" : "20%", }}
                        transition={{
                          duration: 1.5,
                          ease: [0.22, 1.5, 0.36, 1],
                        }}
                      >
                        <Image
                        key={principles[activeIndex].id}
                          src={principles[activeIndex].image}
                          alt="Dynasty principle"
                          fill
                          className="object-cover transition-opacity duration-500"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </Reveal>
      </section>
  )
}

export default Vedara