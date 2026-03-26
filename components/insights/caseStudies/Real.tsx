import { slideInFromBottom } from '@/utils/motion'
import Reveal from '@/utils/Reveal'
import Image from 'next/image'

export default function Real() {
  return (
    <section className='border-y border-color'>
        {/* Mobile par mx-0 taaki image edge-to-edge rahe, desktop par margins wapas aa jayenge */}
        <Reveal variants={slideInFromBottom(0.1)} className="relative mx-0 md:mx-10 lg:mx-20 xl:mx-24 md:border-x border-color h-[40vh] md:h-[50vh] flex items-center justify-center">
            
            {/* pl-0 aur text-center se mobile par content beech mein rahega */}
            <div className="flex flex-col items-center justify-center px-6 md:px-0 gap-2 z-10 text-center">
                <h2 className='text-[24px] md:text-[36px] lg:text-[48px] leading-tight'>
                    Real Results. Real Impact.
                </h2>
                
                {/* max-w-xs mobile par 2 lines force karega, md:max-w-none laptop par single line rakhega */}
                <p className='text-[14px] md:text-[16px] max-w-[280px] md:max-w-none'>
                    Explore how Ascella’s cybersecurity solutions deliver measurable business outcomes.
                </p>
            </div>

            <Image 
                src="/insights/real.svg" 
                alt="Real Results" 
                fill 
                className="absolute inset-0 object-cover -z-10" 
            />
        </Reveal>
    </section>
  )
}