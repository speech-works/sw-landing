"use client";

import React, { useState } from 'react';

const ALGORITHM_DATA = [
  {
    name: "Severity Scoring",
    description: "Maps onboarding answers to a 0-100 scale anchored to published stuttering impact norms.",
    research: "Yaruss & Quesal (2006), J. Fluency Disorders",
    status: "VALIDATED"
  },
  {
    name: "1-D Kalman Filter",
    description: "Updates clinical state after every session. Uncertainty grows when you go quiet; corrects when new data arrives.",
    research: "Ecological Momentary Assessment research; population data from N=173 standardization sample",
    status: "VALIDATED"
  },
  {
    name: "Crisis Detection",
    description: "Recency-weighted volatility index. Decay factor 0.85/day. Triggers safety gate if SD > 15 over 7 days.",
    research: "Kuppens et al. (2008), JPSP — emotional state decay rate",
    status: "VALIDATED"
  },
  {
    name: "Safety Gating",
    description: "Blocks high-intensity practice during emotional instability. Forces Stabilization content.",
    research: "Foa & McLean (2016), Annual Review of Clinical Psychology",
    status: "VALIDATED"
  },
  {
    name: "Covert Phenotype Routing",
    description: "High-avoidance, low-struggle users get ACT-path content, not fluency shaping.",
    research: "Tichenor & Yaruss (2019), JSLHR",
    status: "VALIDATED"
  },
  {
    name: "Avoidance Frequency Mapping",
    description: "Translates self-reported avoidance frequency to severity scores.",
    research: "Clinically reasonable, not directly cited from research",
    status: "HEURISTIC"
  },
  {
    name: "Emotional Weighting",
    description: "Modulates initial severity based on emotional state at onboarding.",
    research: "Conceptually sound, coefficients are estimated",
    status: "HEURISTIC"
  }
];

export function AlgorithmTable() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full relative z-10 mb-16 md:mb-24 pt-8 md:pt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
          What We Built, and Why.
        </h3>
        <p className="text-[1.05rem] text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
          Some of these are validated against published research. Some are still being refined as real user data comes in. We document the difference.
        </p>
      </div>

      <div className="w-full bg-[#1A1310] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-white/50">
          <div className="col-span-3">Algorithm</div>
          <div className="col-span-4">What it Does</div>
          <div className="col-span-3">Research Base</div>
          <div className="col-span-2">Status</div>
        </div>

        <div className="divide-y divide-white/5">
          {ALGORITHM_DATA.map((row, idx) => (
            <div key={idx} className="group hover:bg-white/[0.02] transition-colors">
              <div 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 md:p-4 items-center cursor-pointer md:cursor-default"
                onClick={() => window.innerWidth < 768 && toggleRow(idx)}
              >
                {/* Mobile Header (Algorithm Name & Status) */}
                <div className="md:hidden flex justify-between items-center w-full">
                  <div className="font-bold text-white text-base">{row.name}</div>
                  <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-widest ${
                    row.status === 'VALIDATED' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'VALIDATED' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    {row.status}
                  </div>
                </div>

                {/* Desktop layout & Expandable Mobile Content */}
                <div className={`col-span-3 hidden md:block font-bold text-white text-sm`}>
                  {row.name}
                </div>
                
                <div className={`col-span-4 text-sm text-white/70 leading-relaxed ${expandedIndex === idx ? 'block mt-3 md:mt-0' : 'hidden md:block'}`}>
                  <span className="md:hidden text-[10px] uppercase text-white/40 block mb-1">What it Does</span>
                  {row.description}
                </div>
                
                <div className={`col-span-3 text-sm text-white/50 leading-relaxed ${expandedIndex === idx ? 'block mt-4 md:mt-0' : 'hidden md:block'}`}>
                  <span className="md:hidden text-[10px] uppercase text-white/40 block mb-1">Research Base</span>
                  {row.research}
                </div>
                
                <div className="col-span-2 hidden md:flex items-center">
                  <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-widest ${
                    row.status === 'VALIDATED' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'VALIDATED' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    {row.status === 'HEURISTIC' ? 'HEURISTIC — PENDING' : row.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center max-w-3xl mx-auto">
        <p className="text-sm md:text-base font-semibold text-white/60 italic">
          &quot;Two of our parameters are clearly marked as heuristics pending validation. We built the infrastructure to test and refine them as real user data comes in. We document everything.&quot;
        </p>
      </div>
    </div>
  );
}
