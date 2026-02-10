'use client';

import React from 'react';
import Image from 'next/image';

const Roles = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8 md:p-20 font-sans">
      {/* Centered Header Section */}
      <div className="max-w-6xl mx-auto mb-16 flex flex-col items-center text-center">
        <div className="flex items-center  text-[10px] tracking-[0.2em] text-white mb-8 uppercase font-medium">
          <span className=" text-5xl">+ </span> 
          <span className="  ">Working at Ascella</span>
        
        </div>
        
        <h3 className="text-3xl md:text-5xl font-medium leading-tight max-w-4xl">
          Roles at Ascella are {` `}
          <span className="text-gray-400  decoration-1">
            designed around accountability structure, and execution discipline.
          </span>
        </h3>
      </div>

      {/* Single Main Container Box */}
      <div className="max-w-6xl mx-auto border border-gray-800  bg-[#0A0A0A] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Section: Operating Environment */}
          <div className="flex-1 p-10 md:p-14 border-b md:border-b-0 md:border-r border-gray-800">
            <h3 className="text-2xl font-semibold mb-2">Operating environment</h3>
            <p className="text-gray-500 text-sm mb-10">subtitle: 1XI</p>
            
            {/* Image Box - Reduced Size */}
            <div className="w-full   mb-12">
               <div className="border border-dashed border-gray-700 w-full max-w-[280px] aspect-video flex items-center justify-center bg-[#111]">
                  <img 
                    src="/box.png" 
                    alt="Operating Environment" 
                    className="w-4/4 h-auto object-contain opacity-50"
                  />
               </div>
            </div>

            <hr className="border-gray-800 mb-8" />
            
            <h4 className="text-xl font-bold mb-4">Expectations</h4>
            <p className="text-white leading-relaxed text-sm">
              Ascella operates as a unified operating group. Work is structured through 
              governance frameworks, defined decision and measurable execution engines. 
              Aenean ipsum dolo sit orom Aenan massa.
            </p>
          </div>

          {/* Right Section: Expectations */}
          <div className="flex-1 p-10 md:p-14">
            <h3 className="text-2xl font-semibold mb-2">Title</h3>
            <p className="text-gray-500 text-sm mb-10">subtitle: Expectations</p>
            
            {/* Image Box - Reduced Size */}
            <div className="w-full  mb-12">
               <div className="border border-dashed border-gray-700 w-full max-w-[280px] aspect-video flex items-center justify-center bg-[#111]">
                  <img 
                    src="/box.png" 
                    alt="Expectations" 
                    className="w-4/4 h-auto object-contain opacity-50"
                  />
               </div>
            </div>

            <hr className="border-gray-800 mb-8" />
            
            <h4 className="text-xl font-bold mb-4">Expectations 5</h4>
            <p className="text-white leading-relaxed text-sm">
              Team members operate within structured pods pods eporg models. 
              Clarity of responsibility, documentation, and delivery. Aenean ion 
              adipiscing elit. Aenean massa, commodo ligula ebor.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Roles;