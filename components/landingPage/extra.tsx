'use client'

import Image from 'next/image'
import { useState } from 'react'

const slides = [
  {
    title: 'Ascella Infosec',
    description:
      'Delivering full lifecycle cybersecurity solutions designed for critical environments and complex enterprises.',
    image: '/executionArms.png', 
  },
  {
    title: 'Enterprise Security',
    description:
      'Advanced security architecture for organizations that cannot afford operational risk.',
    image: '/mock-screen.png',
  },
]

export default function ExecutionArms() {
  const [active, setActive] = useState(0)

  return (
    <section className="w-full flex flex-col items-center justify-center py-24">
      {/* Heading */}
      <div className="text-center max-w-3xl mb-16">
        <span className="uppercase text-xs tracking-[0.3em] text-gray-200">
          Execution Arms
        </span>
        <p className="mt-4 text-xl md:text-2xl text-gray-100 leading-relaxed">
          We take full responsibility for critical outcomes that organisations
          cannot afford to fragment
        </p>
      </div>

      <div className="relative w-full max-w-6xl border border-gray-400 rounded-2xl overflow-hidden bg-linear-to-br from-black to-gray-500">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-105">
          {/* Sidebar */}
          <aside className="border-r border-gray-400 p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-sm tracking-widest text-gray-200 mb-6">
                EXECUTION ARMS
              </h4>

              <ul className="space-y-3 text-sm">
                {slides.map((_, idx) => (
                  <li
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`cursor-pointer transition-colors ${
                      active === idx
                        ? 'text-white'
                        : 'text-gray-300 hover:text-gray-100'
                    }`}
                  >
                    Ascella Infosec
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-8 w-fit border border-gray-400 px-5 py-2 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </aside>

          {/* Content */}
          <div className="relative p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs text-gray-300">
                0{active + 1} / 0{slides.length}
              </span>

              <h3 className="mt-6 text-3xl font-light">
                {slides[active].title}
              </h3>

              <p className="mt-4 text-gray-200 max-w-md leading-relaxed">
                {slides[active].description}
              </p>
            </div>

            {/* Image */}
            <div className="absolute right-6 bottom-6 w-[320px] md:w-95 opacity-90">
              <Image
                src={slides[active].image}
                alt="Dashboard preview"
                width={400}
                height={300}
                className="object-contain"
              />
            </div>

            {/* Pagination dots */}
            <div className="absolute bottom-6 left-10 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`h-2 w-2 rounded-full transition ${
                    active === idx ? 'bg-white' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
