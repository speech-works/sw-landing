"use client";
import React, { useState, useEffect } from "react";

// -------------------------------------------------------
// ICONS
// -------------------------------------------------------
const SignalIcon = ({ color = "#1E293B" }) => (
    <svg viewBox="0 0 17 12" fill={color} className="w-[14px] h-[10px]">
        <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
        <rect x="8" y="2" width="2.5" height="9" rx="0.5" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
    </svg>
);

// ──────────────────────────────────────────────────────────────────────────
// FEATURE BUBBLES (EXPLODE TO TOP-FRONT)
// ──────────────────────────────────────────────────────────────────────────
function FeatureBubbles({ isHovered }: { isHovered: boolean }) {
    const bubbles = [
        { 
            id: 1, 
            label: "Roleplay", 
            icon: "🎭", 
            color: "bg-amber-400", 
            angle: -140, 
            radius: 280, 
            z: 220, 
            yOffset: -180,
            delay: 0.1 
        },
        { 
            id: 2, 
            label: "AI Calls", 
            icon: "📱", 
            color: "bg-violet-500", 
            angle: -40, 
            radius: 260, 
            z: 260, 
            yOffset: -160,
            delay: 0.25 
        },
        { 
            id: 3, 
            label: "Social Challenge", 
            icon: "🤝", 
            color: "bg-emerald-500", 
            angle: 140, 
            radius: 270, 
            z: 200, 
            yOffset: -140,
            delay: 0.15 
        },
        { 
            id: 4, 
            label: "Interview", 
            icon: "💼", 
            color: "bg-slate-700", 
            angle: 40, 
            radius: 250, 
            z: 240, 
            yOffset: -170,
            delay: 0.3 
        }
    ];

    const smoothEase = "cubic-bezier(0.16, 1, 0.3, 1)";

    return (
        <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
            {bubbles.map((b) => (
                <div 
                    key={b.id}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[1800ms]"
                    style={{ 
                        transformStyle: "preserve-3d",
                        transitionTimingFunction: smoothEase,
                        transitionDelay: `${isHovered ? b.delay : 0}s`,
                        transform: `
                            rotateZ(${isHovered ? b.angle : b.angle - 140}deg)
                            scale(${isHovered ? 1 : 0.1})
                        `,
                        opacity: isHovered ? 1 : 0,
                        willChange: "transform, opacity"
                    }}
                >
                    {/* The Inner Bubble - flies dramatically to the TOP FRONT */}
                    <div 
                        className={`px-7 py-4 rounded-full flex items-center gap-3.5 shadow-2xl border border-white/30 backdrop-blur-xl overflow-hidden transition-all duration-[1800ms]`}
                        style={{ 
                            backgroundColor: "rgba(255,255,255,0.94)",
                            transitionTimingFunction: smoothEase,
                            transitionDelay: `${isHovered ? b.delay : 0}s`,
                            transform: `
                                translateX(${isHovered ? b.radius : 0}px)
                                translateY(${isHovered ? b.yOffset : 0}px)
                                translateZ(${isHovered ? b.z + 200 : 0}px)
                                rotateZ(${isHovered ? -b.angle : -(b.angle - 140)}deg)
                            `,
                            boxShadow: isHovered ? "0 60px 140px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.8)" : "none",
                            willChange: "transform"
                        }}
                    >
                        <div className={`w-8 h-8 rounded-full ${b.color} flex items-center justify-center text-sm shadow-inner shrink-0 leading-none`}>
                            {b.icon}
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-widest text-slate-900 whitespace-nowrap leading-none">
                            {b.label}
                        </span>
                        
                        {/* Watermark/Ghost Icon */}
                        <div className="absolute -right-1.5 -bottom-1.5 text-4xl opacity-[0.1] pointer-events-none select-none">
                            {b.icon}
                        </div>
                    </div>
                </div>
            ))}

            {/* Decor dots orbiting the explosion */}
            {[...Array(8)].map((_, i) => (
                <div 
                    key={`dot-${i}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[2000ms]"
                    style={{
                        transitionTimingFunction: smoothEase,
                        transitionDelay: `${Math.random() * 0.5}s`,
                        transform: `
                            rotateZ(${(i * 45) + (isHovered ? 60 : 180)}deg)
                            scale(${isHovered ? 1 : 0})
                        `,
                    }}
                >
                    <div 
                        className="w-2 h-2 rounded-full bg-white/60 blur-[1px] transition-all duration-[2000ms]"
                        style={{
                            transitionTimingFunction: smoothEase,
                            transform: `translateX(${isHovered ? 320 + (i * 15) : 0}px) translateY(${isHovered ? -100 : 0}px) translateZ(${isHovered ? 400 : -200}px)`,
                            opacity: isHovered ? 0.8 : 0,
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

// ──────────────────────────────────────────────────────────────────────────
// ADVERSARIAL CHAT INTERNAL UI
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
    <div className="flex flex-col gap-4 p-5 pt-16 pb-52 antialiased">
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
// INTERNAL CARD STACK COMPONENT
// ──────────────────────────────────────────────────────────────────────────
function CardStack({ isSectionHovered }: { isSectionHovered: boolean }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % 3);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    const cards = [
        {
            id: "easy",
            title: "LEVEL 01: EMOTIONAL SAFETY",
            content: "Talking to Your Pet. Build composure in low-stakes practice.",
            bg: "bg-emerald-500",
            textColor: "text-white",
            tagColor: "text-emerald-100",
            dotColor: "bg-white"
        },
        {
            id: "medium",
            title: "LEVEL 02: CASUAL SOCIAL",
            content: "Social Trip. Practice casual, semi-structured conversation.",
            bg: "bg-indigo-600",
            textColor: "text-white",
            tagColor: "text-indigo-100",
            dotColor: "bg-white"
        },
        {
            id: "difficult",
            title: "LEVEL 03: ADVERSARIAL TEST",
            content: "Impatient Interviewer. Stay regulated under intense pressure.",
            bg: "bg-slate-900 border-red-500/30",
            textColor: "text-white",
            tagColor: "text-red-400",
            dotColor: "bg-red-500"
        }
    ];

    return (
        <div 
            className="absolute bottom-8 left-4 right-4 h-[180px]"
            style={{ 
                transformStyle: "preserve-3d",
                zIndex: 300 
            }}
        >
            {cards.map((card, idx) => {
                const isFocused = idx === activeIndex;
                const offset = (idx - activeIndex + 3) % 3; // 0 is focused, 1 is next, 2 is last
                
                // Pop-up stacked layout
                const zPos = isFocused ? (isSectionHovered ? 120 : 60) : (0 - offset * 25);
                const yPos = isFocused ? 0 : (offset * 16);
                const opacity = isFocused ? 1 : 0.2;
                const scale = isFocused ? 1 : (1 - offset * 0.04);

                return (
                    <div 
                        key={card.id}
                        className={`absolute inset-0 p-5 ${card.bg} ${card.textColor} rounded-[2rem] shadow-2xl transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) border border-white/10 backdrop-blur-3xl flex flex-col justify-center`}
                        style={{ 
                            transform: `translateZ(${zPos}px) translateY(${yPos}px) scale(${scale})`,
                            opacity,
                            zIndex: 100 - offset,
                            boxShadow: isFocused ? "0 30px 60px -12px rgba(0,0,0,0.4)" : "none"
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${card.dotColor} ${isFocused ? 'animate-pulse' : ''}`} />
                            <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${card.tagColor}`}>{card.title}</span>
                        </div>
                        <p className="text-[13px] md:text-[14px] font-bold leading-snug tracking-tight opacity-95">{card.content}</p>
                    </div>
                );
            })}
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
    // OPPOSITE TILT
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
                    {/* Status Bar & Dynamic Island (Pinned) */}
                    <div className="absolute top-0 inset-x-0 h-14 pointer-events-none z-[160] flex flex-col">
                        <div className="h-[32px] pt-1.5 px-8 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-900 tracking-tight">9:41</span>
                            <div className="flex items-center gap-1.5">
                                <SignalIcon color="#0f172a" />
                                <div className="w-[18px] h-[9px] border-[1px] border-slate-900 rounded-[2px] p-[1.2px] flex">
                                    <div className="w-[85%] h-full bg-slate-900 rounded-px" />
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Island */}
                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[25px] bg-black rounded-[14px] flex items-center justify-center overflow-hidden">
                             <div className="absolute inset-0 bg-red-500/10 animate-pulse-island" />
                             <div className="flex items-center gap-[2px] opacity-40">
                                 {[1,0.6,1.2,0.8].map((h, i) => (
                                     <div key={i} className="w-[2px] bg-red-400 rounded-full animate-island-wave" style={{ height: `${h * 4}px`, animationDelay: `${i * 0.1}s` }} />
                                 ))}
                             </div>
                        </div>
                    </div>

                    <AdversarialChatUI animKey={animKey} />

                    {/* ── INTERNAL CARD STACK ── */}
                    <CardStack isSectionHovered={isSectionHovered} />

                    {/* Laser Sweep */}
                    <div 
                        className="absolute inset-0 z-[50] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-1000"
                        style={{
                            background: `linear-gradient(${75 + externalMousePos.x * 20}deg, transparent, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 55%, transparent)`,
                            transform: `translateX(${externalMousePos.x * 100}%)`,
                        }}
                    />
                </div>

                {/* ── FEATURE BUBBLES (EXPLODE TO TOP-FRONT) ── */}
                {/* Positoned LAST to ensure it renders in front of everything else */}
                <FeatureBubbles isHovered={isSectionHovered} />

            </div>

            <style>{`
                @keyframes pulse-island {
                    0%, 100% { opacity: 0.2; scale: 1; }
                    50% { opacity: 0.4; scale: 1.1; }
                }
                @keyframes island-wave {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.5); }
                }
                .animate-pulse-island { animation: pulse-island 2s ease-in-out infinite; }
                .animate-island-wave { animation: island-wave 1s ease-in-out infinite; }
            `}</style>
        </div>
    );
}
