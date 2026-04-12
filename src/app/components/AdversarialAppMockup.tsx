"use client";
import React, { useState, useEffect, useRef } from "react";

// ──────────────────────────────────────────────────────────────────────────
// ADVERSARIAL CHAT INTERNAL UI (Extracted and refined from Platform.tsx)
// ──────────────────────────────────────────────────────────────────────────
function AdversarialChatUI({ animKey }: { animKey: number }) {
  const [phase, setPhase] = useState<"waiter" | "thinking" | "suggestion">("waiter");

  useEffect(() => {
    setPhase("waiter");
    const t1 = setTimeout(() => setPhase("thinking"),    900);
    const t2 = setTimeout(() => setPhase("suggestion"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [animKey]);

  const aiAvatar = (full?: boolean) => (
    <div
      className={`w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 border-2 border-white shadow-md flex items-center justify-center relative ${full ? "" : "opacity-50"}`}
      style={{ boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}
    >
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      {full && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-5 antialiased">
      {/* Waiter bubble */}
      <div
        className="flex items-end gap-2.5 self-start max-w-[100%]"
        style={{ animation: "platform-chatReveal 0.5s cubic-bezier(0.23,1,0.32,1) 0.1s both" }}
      >
        <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 border-2 border-white shadow-md flex items-center justify-center text-base select-none">
          🧑‍🍳
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[9px] font-semibold text-slate-400 ml-1 uppercase tracking-widest">Wait Staff</span>
          <div className="bg-white text-slate-700 text-xs font-medium leading-relaxed px-4 py-3 rounded-2xl rounded-bl-none shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100/80">
            Um, are you ready to order? We have a line forming.
          </div>
        </div>
      </div>

      {/* AI Slot */}
      {phase !== "waiter" && (
        <div
          className="flex items-end gap-2.5 self-start max-w-[100%]"
          style={{ animation: "platform-chatReveal 0.4s cubic-bezier(0.23,1,0.32,1) both" }}
        >
          {phase === "thinking" ? aiAvatar(false) : aiAvatar(true)}

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className={`text-[9px] font-semibold ml-1 uppercase tracking-widest transition-colors duration-300 ${phase === "suggestion" ? "text-violet-400/90" : "text-violet-400/50"}`}>
              Speechworks.AI
            </span>

            {/* Thinking dots */}
            {phase === "thinking" && (
              <div className="bg-indigo-950/40 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-violet-400 rounded-full"
                    style={{ animation: `platform-thinkDot 1.1s ease-in-out ${i * 0.18}s infinite` }}
                  />
                ))}
              </div>
            )}

            {/* AI suggestion */}
            {phase === "suggestion" && (
              <div
                className="text-white text-[11px] md:text-xs font-medium leading-relaxed px-4 py-3 rounded-2xl rounded-bl-none relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4c1d95 100%)",
                  boxShadow: "0 8px 32px rgba(76,29,149,0.35), 0 0 0 1px rgba(139,92,246,0.2)",
                  animation: "platform-chatReveal 0.45s cubic-bezier(0.23,1,0.32,1) both",
                }}
              >
                <p>
                  Friction Detected. Use{" "}
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white/10 border border-violet-400/20 text-violet-200 font-bold text-[10px]">
                    Advertising
                  </span>{" "}
                  to set a boundary.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN MOCKUP COMPONENT
// ──────────────────────────────────────────────────────────────────────────
export default function AdversarialAppMockup({ 
    animKey,
    isSectionHovered = false,
    externalMousePos = { x: 0, y: 0 } 
}: { 
    animKey: number,
    isSectionHovered?: boolean,
    externalMousePos?: { x: number, y: number }
}) {
    // OPPOSITE TILT: Progress was rotateY(-28), we use rotateY(28)
    const rotateX = (18 - (externalMousePos.y * 10)); 
    const rotateY = (28 - (externalMousePos.x * 12));
    const rotateZ = (-6 - (externalMousePos.x * 3));

    return (
        <div className="w-full h-full flex items-center justify-center p-4 md:p-8 select-none relative group" style={{ perspective: "2000px" }}>
            
            {/* 3D Wrapper */}
            <div 
                className="relative w-[240px] md:w-[260px] h-[500px] md:h-[540px] transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1)"
                style={{ 
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${isSectionHovered ? 1.05 : 0.95})`
                }}
            >
                {/* ── PHONE BASE ── */}
                <div 
                    className="absolute inset-0 rounded-[3.5rem] bg-slate-900 shadow-[40px_80px_100px_rgba(0,0,0,0.5)] border-[6px] border-slate-800" 
                    style={{ transform: "translateZ(0)" }}
                />

                {/* ── SCREEN ── */}
                <div 
                    className="absolute inset-[6px] rounded-[3rem] bg-[#F8F9FF] overflow-hidden flex flex-col" 
                    style={{ transform: `translateZ(15px)`, transformStyle: "preserve-3d" }}
                >
                    {/* Status Bar */}
                    <div className="h-12 flex items-end justify-between px-8 pb-1">
                        <span className="text-[10px] font-bold text-slate-800">9:41</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full border border-slate-800" />
                            <div className="w-5 h-2.5 rounded-sm border border-slate-800" />
                        </div>
                    </div>

                    <AdversarialChatUI animKey={animKey} />

                    {/* Laser Sweep */}
                    <div 
                        className="absolute inset-0 z-[50] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-1000"
                        style={{
                            background: `linear-gradient(${75 + externalMousePos.x * 20}deg, transparent, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 55%, transparent)`,
                            transform: `translateX(${externalMousePos.x * 100}%)`,
                        }}
                    />
                </div>

                {/* ── FLOATING CARDS (EXPLODE) ── */}

                {/* Card 1: Friction Alert (Top Left) */}
                <div 
                    className="absolute -top-4 -left-20 w-[160px] p-4 bg-indigo-950/90 text-white rounded-2xl shadow-2xl transition-transform duration-1000 ease-out border border-white/10 backdrop-blur-xl"
                    style={{ 
                        transform: `translateZ(${isSectionHovered ? 320 : 120}px) translateX(${externalMousePos.x * -20}px) translateY(${externalMousePos.y * -10}px)`,
                        zIndex: 200
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-red-400">Friction Alert</span>
                    </div>
                    <p className="text-[11px] font-medium leading-tight text-white/90">AI detected aggressive pacing. Recommend tactical pause.</p>
                </div>

                {/* Card 2: Strategic Play (Bottom Left) */}
                <div 
                    className="absolute bottom-16 -left-16 w-[180px] p-4 bg-white rounded-2xl shadow-2xl transition-transform duration-1000 ease-out border border-slate-100"
                    style={{ 
                        transform: `translateZ(${isSectionHovered ? 240 : 80}px) translateX(${externalMousePos.x * -30}px) translateY(${externalMousePos.y * 20}px)`,
                        zIndex: 180
                    }}
                >
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#4c1d95] mb-2">Strategic Play</h5>
                    <div className="flex flex-col gap-2">
                        <div className="h-2 bg-violet-100 rounded-full w-full" />
                        <div className="h-2 bg-violet-50 rounded-full w-2/3" />
                    </div>
                </div>

                {/* Card 3: Bio-Feedback (Bottom Right) */}
                <div 
                    className="absolute top-1/2 -right-24 w-[140px] p-4 bg-gradient-to-br from-violet-600 to-purple-800 text-white rounded-2xl shadow-2xl transition-transform duration-1000 ease-out border border-white/20 overflow-hidden"
                    style={{ 
                        transform: `translateZ(${isSectionHovered ? 280 : 100}px) translateX(${externalMousePos.x * 30}px) translateY(${externalMousePos.y * 5}px) rotateY(-10deg)`,
                        zIndex: 190
                    }}
                >
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full blur-xl translate-x-1/3 -translate-y-1/3" />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-2 block">Pacing</span>
                    <div className="text-xl font-black">1.4x</div>
                    <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-3/4 shadow-[0_0_8px_white]" />
                    </div>
                </div>

            </div>
        </div>
    );
}
