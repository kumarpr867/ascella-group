import React from 'react'
import Image from 'next/image'

export default function Real() {
  return (
    <section className='border-y border-color'>
        <div className="relative max-w-7xl xl:mx-auto mx-10 md:border-x border-color h-[40vh] md:h-[50vh] flex items-end justify-center">
            <div className="flex flex-col md:items-center justify-end pb-10 pl-10 md:pl-0 gap-2">
            <h2 className='text-[20px] md:text-[36px] lg:text-[48px]'>Where Responsibility Turns Into Results</h2>
            <p className='text-[12px] md:text-center md:text-[14px] max-w-2/3'>Situations where organisations brought Ascella in when execution across security, technology, marketing, sales, or staffing started breaking down.</p>
            </div>
                <Image src="/insights/real.svg" alt="Real Results" width={800} height={600} className="absolute top-0 left-0 w-full h-full object-cover -z-1" />
        </div>
    </section>
  )
}
