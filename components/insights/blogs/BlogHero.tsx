import React from 'react'
import Image from 'next/image'
import PartialOutlineBtn from '@/components/btns/PartialOutlineBtn'

export default function BlogHero() {
  return (
    <section className='border-y border-color'>
      <div className="relative max-w-7xl xl:mx-auto md:mx-10 md:border-x  border-color h-[40vh] md:h-[50vh] flex items-end justify-center md:text-center ">
        <div className="flex flex-col md:items-center justify-center h-full pl-10 md:pl-0 gap-2">
          <h2 className='w-2/3 text-[20px] md:text-[36px] lg:text-[48px]'>Observations From Real Execution</h2>
          <p className='text-[12px] my-4 md:text-[14px] w-sm md:max-w-md'>Short notes on patterns we see across organisations dealing with security, technology, growth, and operational complexity</p>
          <div className="flex max-w-xs border border-white rounded overflow-hidden">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 bg-white text-black px-2 py-2 text-xs md:text-sm outline-none placeholder:text-gray-400"
          />
          <PartialOutlineBtn
            text="Join Us"
            textColor="text-black"
            bgColor="bg-white"
            borderColor="border-black"
            hoverBgColor="hover:bg-black"
            hoverTextColor="hover:text-white"
          />
        </div>
        </div>
        
        <Image src="/insights/real.svg" alt="Real Results" width={800} height={600} className="absolute top-0 left-0 w-full h-full object-cover -z-1" />
      </div>
    </section>
  )
}
