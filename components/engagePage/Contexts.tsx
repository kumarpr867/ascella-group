
'use client';

import React, { useState } from 'react';
import ContactSection from './ContactSection';

const Contexts = () => {
  const [openAccordion, setOpenAccordion] = useState<string>('01');
  return (
    <div className="min-h-screen bg-black text-white pl-15 pr-15 font-sans">
      {/* The Main Container with Grid Background */}
      <div className="relative w-full border-t border-l border-b border-gray-800 min-h-[800px] flex overflow-hidden">
        
        {/* Custom Grid Overlay */}
        <div 
          className="absolute inset-x-0 inset-y-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), 
                              linear-gradient(to bottom, #333 1px, transparent 1px)`,
          }}
        ></div>

        {/* Left Section: Form */}
        <div className="relative z-10 w-2/6 border-r border-gray-400 p-7 flex flex-col ">
          <header className="max-w-md">
            <h5 className="text-2xl font-light mb-3">
              Provide operating context to <br /> initiate alignment.
            </h5>
            <p className="text-gray-400 text-sm mb-1">
              This form captures high-level operating information required to initiate an alignment conversation.
            </p>
          </header>
           <div className="border-t border-gray-400 w-full"></div>

          <div className=" pt-10">
            <form className="grid grid-cols-2 gap-6 ">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white">Full Name</label>
                <input type="text" className="bg-[#111] border border-gray-800 p-2 rounded focus:outline-none focus:border-gray-600" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white">Organisation name</label>
                <input type="text" className="bg-[#111] border border-gray-800 p-2 rounded focus:outline-none focus:border-gray-600" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white">Role / position</label>
                <input type="text" className="bg-[#111] border border-gray-800 p-2 rounded focus:outline-none focus:border-gray-600" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white">Email address</label>
                <input type="email" className="bg-[#111] border border-gray-800 p-2 rounded focus:outline-none focus:border-gray-600" />
              </div>
              
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-xs text-white">Organisation type</label>
                <select className="bg-[#111] border border-gray-800 p-2 rounded focus:outline-none appearance-none">
                  <option>Select...</option>
                </select>
              </div>

              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-xs text-white">Primary operating need</label>
                <select className="bg-[#111] border border-gray-800 p-2 rounded focus:outline-none appearance-none">
                  <option>Select...</option>
                </select>
              </div>

              <div className="col-span-2 flex flex-col gap-2">
                <textarea 
                  placeholder="Describe your current execution or operating challenge..."
                  className="bg-[#111] border border-gray-800 p-3 rounded h-20 focus:outline-none focus:border-gray-600 resize-none"
                ></textarea>
              </div>

              <button className="col-span-1 mt-2 relative group w-max px-6 py-2">
                 <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></span>
                 <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white"></span>
                 <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white"></span>
                 <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"></span>
                 Submit
              </button>
            </form>
            
            {/* Horizontal Line under Submit */}
            <div className="mt-11 border-t border-gray-400 w-full"></div>
            
          </div>
          
        </div>
        

        {/* Right Section: Content alignment */}
        <div className="relative z-10 w-4/6 flex flex-col">
          
          {/* Wrap top + grid in a right border so it stops below the boxes */}
          <div className="border-r border-gray-400">
          {/* Top Section (Engagement text) - Height matches the form above the line */}
          <div className="h-[735px] relative p-15 flex flex-col justify-center">
            <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
               <img src="/engagement1.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <h2 className="text-6xl font-normal leading-tight">
                Engagement begins <br /> 
                with <span className="text-gray-400">operating alignment.</span>
              </h2>
              <p className="text-xl mt-4 font-light text-gray-400">Not delivery discussions.</p>
            </div>
          </div>

          {/* This is the line that continues from the left side */}
          <div className="border-t border-gray-400 w-full">
            
            {/* Title - positioned with distance from the line */}
            <div className="px-12 pt-16 pb-15">
               <h3 className="text-4xl font-light">What alignment typically covers</h3>
            </div>

            {/* 2x3 Grid */}
            <div className="grid grid-cols-3 border-t border-gray-400">
              {/* Box 1: Image */}
              <div className="aspect-square border-r border-b border-gray-800 flex items-center justify-center p-12">
                 <img src="/alignment-symbol.png" alt="Alignment Symbol" className="w-full h-auto" />
              </div>
              
              {/* Box 2: Operating Structure */}
              <div className="aspect-square border-r border-b border-gray-800 p-10 flex flex-col justify-center">
                 <div className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center mb-6">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                 </div>
                 <p className="text-sm text-gray-300 leading-relaxed">Operating structure and decision ownership</p>
              </div>

              {/* Box 3: Accountability */}
              <div className="aspect-square border-b border-gray-800 p-10 flex flex-col justify-center">
                 <div className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center mb-6">
                    <span className="text-gray-400">⊕</span>
                 </div>
                 <p className="text-sm text-gray-300 leading-relaxed">Accountability and escalation models</p>
              </div>

              {/* Box 4: Execution */}
              <div className="aspect-square border-r border-gray-800 p-10 flex flex-col justify-center">
                 <div className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center mb-6 text-gray-400">◎</div>
                 <p className="text-sm text-gray-300 leading-relaxed">Current execution challenges and constraints</p>
              </div>

              {/* Box 5: Risk */}
              <div className="aspect-square border-r border-gray-800 p-10 flex flex-col justify-center">
                 <div className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center mb-6 text-gray-400">⚛</div>
                 <p className="text-sm text-gray-300 leading-relaxed">Risk, regulatory, and security considerations</p>
              </div>

              {/* Box 6: Readiness */}
              <div className="aspect-square p-10 flex flex-col justify-center">
                 <div className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center mb-6 text-gray-400">⦾</div>
                 <p className="text-sm text-gray-300 leading-relaxed">Readiness for governed execution</p>
              </div>
            </div>
          </div>
          {/* end bordered top+grid */}
          </div>

          {/* What happens next section */}
          <div className=" border-t border-l  border-gray-400">
            <div className="pl-12  py-10">
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span className="text-xl">✚</span>
                <span className="uppercase tracking-widest">WHAT HAPPENS NEXT</span>
              </div>

              <h3 className="text-4xl font-light max-w-2xl">Each engagement progresses through a defined alignment pathway.</h3>
            </div>

            <div className="border-t border-gray-400">
              <div>
                {/* Accordion Item 1 */}
                <div 
                  onClick={() => setOpenAccordion(openAccordion === '01' ? '' : '01')}
                  className={`border-b border-gray-400 py-6 pl-12 pr-12 cursor-pointer transition-colors ${
                    openAccordion === '01' ? 'bg-gray-900' : 'hover:bg-gray-950'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="max-w-xl">
                      <h4 className="text-xl font-light">Review and context assessment <span className="text-white">•</span></h4>
                      {openAccordion === '01' && (
                        <p className="text-sm text-gray-400 mt-2">Your submission is reviewed to understand operating complexity, execution readiness, and governance requirements.</p>
                      )}
                    </div>
                    <div className="text-2xl font-mono tracking-wider text-white">[01]</div>
                  </div>
                </div>

                {/* Accordion Item 2 */}
                <div 
                  onClick={() => setOpenAccordion(openAccordion === '02' ? '' : '02')}
                  className={`border-b border-gray-400 py-6 pl-12 pr-12 cursor-pointer transition-colors ${
                    openAccordion === '02' ? 'bg-gray-900' : 'hover:bg-gray-950'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="max-w-xl">
                      <h4 className="text-xl font-light text-gray-400">Alignment conversation</h4>
                      {openAccordion === '02' && (
                        <p className="text-sm text-gray-400 mt-2">Discussion with stakeholders to understand current state, challenges, and alignment requirements for execution.</p>
                      )}
                    </div>
                    <div className="text-2xl font-mono tracking-wider text-gray-400">[02]</div>
                  </div>
                </div>

                {/* Accordion Item 3 */}
                <div 
                  onClick={() => setOpenAccordion(openAccordion === '03' ? '' : '03')}
                  className={`border-b border-gray-400 py-6 pl-12 pr-12 cursor-pointer transition-colors ${
                    openAccordion === '03' ? 'bg-gray-900' : 'hover:bg-gray-950'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="max-w-xl">
                      <h4 className="text-xl font-light text-gray-400">Engagement pathway definition</h4>
                      {openAccordion === '03' && (
                        <p className="text-sm text-gray-400 mt-2">Clear roadmap defining phases, milestones, deliverables, and engagement model for successful execution.</p>
                      )}
                    </div>
                    <div className="text-2xl font-mono tracking-wider text-gray-400">[03]</div>
                  </div>
                </div>

                <div className=" border-gray-400  py-4 pl-12 pr-12">
                  <p className="text-sm text-gray-100">No engagement proceeds without operating alignment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <ContactSection
            title="Single point of contact for engagement coordination"
            subtitle="All engagement coordination is managed centrally."
            email={{ label: 'Email', value: 'ag@ascella.in\nhello@ascellagroup.com' }}
            contact={{ label: 'Contact', values: ['+91 94545 10860', '+91 94699 40969'] }}
            location={{ 
              label: 'Location', 
              address: '3rd Floor, SCO-5(S), Sector 34B, Chandigarh',
              postalCode: '160022'
            }}
            workHours={{ label: 'Work Hours', hours: 'Mon - Sat: 9:00 - 18:00' }}
          />

        </div>
      </div>
    </div>
  );
};

export default Contexts;