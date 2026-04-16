import React from 'react';

export default function AmbientBackgrounds() {
  return (
    <>
      {/* Ambient Grid & Soft Glows (For the light sections) */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0 hidden md:block"></div>
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand/10 blur-[120px] rounded-full pointer-events-none z-0 hidden md:block"></div>
      <div className="fixed bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-orange-300/10 blur-[100px] rounded-full pointer-events-none z-0 hidden md:block"></div>
    </>
  );
}
