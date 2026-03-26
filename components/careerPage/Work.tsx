"use client";
import Image from "next/image";
import { motion } from "motion/react";

export default function Work() {
  // Animation Variants
  const revealLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const revealRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <section className="overflow-hidden">
      {/* Top Border */}
      <div className="border-t border-color">

        {/* Text Section */}
        <div className="grid grid-cols-[60px_1fr_60px] md:grid-cols-[100px_1fr_100px]">
          {/* Left Block */}
          <motion.div 
            className="sm:border-r border-color"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealLeft}
          />

          <div className="sm:border-r border-color sm:px-6 py-16 md:px-12 md:py-16">
            <div className="hidden lg:flex flex-col md:flex-row md:justify-between md:items-end gap-8">

              {/* Left Side: Headline */}
              <motion.div 
                className="max-w-sm xl:max-w-3xl pt-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealLeft}
              >
                <h2 className="text-[36px] lg:text-[48px] leading-[1.1] tracking-tight">
                  Work within a governance-led
                </h2>

                <div className="flex items-center justify-start gap-3  mt-1 group">
                  
                  <span className="text-[#6E6E6E] text-[36px] lg:text-[48px] font-medium leading-[1.1] tracking-tight group-hover:text-white transition-colors">
                    operating environment
                  </span>
                  <div className="border border-white/20 rounded-full p-2 md:p-3 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Right Side: Paragraph */}
              <motion.div 
                className="md:w-[280px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealRight}
              >
                <p className="text-[12px] md:text-[11px] tracking-widest leading-relaxed text-white/40 ">
                  Ascella roles operate inside defined accountability,
                  structured execution, and central oversight frameworks.
                </p>
              </motion.div>
            </div>

            {/* Mobile View Content */}
            <motion.div 
              className="flex lg:hidden flex-col md:w-2/3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealLeft}
            >
              <h4>Work within a governance-led operating environment</h4>
              <div className="flex gap-2 items-center">
                
                <p className="text-b3 pr-10">Ascella roles operate inside defined accountability, structured execution, and central oversight frameworks.</p>
              </div>
            </motion.div>
          </div>
          <div />
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-color" />

        {/* Image Section */}
        <div className="grid grid-cols-[60px_1fr_60px] md:grid-cols-[100px_1fr_100px]">
          <motion.div 
            className="border-r border-color" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealLeft}
          />

          <motion.div 
            className="border-r border-color h-[250px] md:h-[440px] relative bg-[#0A0A0A] overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/work.svg"
              alt="Work visual"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>

          <div />
        </div>

        {/* Bottom Border */}
        <div className="border-t border-color" />
      </div>
    </section>
  );
}