import React, { useState } from "react";

// The core face blob identity shared across all faces
const FACE_BLOB =
  "M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736";

interface FaceProps {
  size?: number | string;
  shouldAnimate?: boolean;
  transparentBg?: boolean;
}

export default function PodcasterFace({ size = 100, shouldAnimate = true, transparentBg = false }: FaceProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: transparentBg ? "transparent" : "#000",
      }}
    >
      <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
        {!transparentBg && <circle cx="24" cy="24" r="24" fill="#433E3B" />}

        {/* Soundwaves radiating in background */}
        <g stroke="#E28755" strokeWidth="1" fill="none" opacity="0.4">
          {[16, 24, 32].map((r, i) => (
            <circle key={i} cx="24" cy="24" r={r}>
              {shouldAnimate && (
                <animate
                  attributeName="r"
                  values={`${r}; ${r + 8}; ${r}`}
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                />
              )}
              {shouldAnimate && (
                <animate
                  attributeName="opacity"
                  values="0.4; 0; 0.4"
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                />
              )}
            </circle>
          ))}
        </g>

        <path d={FACE_BLOB} fill="#FAF8F5" />

        {/* Cool Headphones */}
        <path
          d="M 6 24 C 6 10 42 10 42 24"
          fill="none"
          stroke="#212121"
          strokeWidth="4"
        />
        <rect x="2" y="18" width="6" height="14" rx="2" fill="#E28755" />
        <rect x="40" y="18" width="6" height="14" rx="2" fill="#E28755" />

        {/* Focused Eyes */}
        <circle cx="16" cy="24" r="2" fill="#433E3B" />
        <circle cx="32" cy="24" r="2" fill="#433E3B" />
        <path
          d="M 20 32 Q 24 36 28 32"
          stroke="#433E3B"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        >
          {shouldAnimate && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 2; 0 0"
              dur="0.4s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Large Studio Microphone */}
        <g transform="translate(24, 38)">
          <rect x="-6" y="-12" width="12" height="20" rx="4" fill="#212121" />
          <rect x="-5" y="-11" width="10" height="12" rx="3" fill="#424242" />
          <g stroke="#9E9E9E" strokeWidth="0.5">
            <line x1="-5" y1="-8" x2="5" y2="-8" />
            <line x1="-5" y1="-5" x2="5" y2="-5" />
            <line x1="-5" y1="-2" x2="5" y2="-2" />
            <line x1="-2" y1="-11" x2="-2" y2="1" />
            <line x1="2" y1="-11" x2="2" y2="1" />
          </g>
          <rect x="-2" y="8" width="4" height="10" fill="#757575" />

          {/* "ON AIR" Sign */}
          <rect x="-8" y="2" width="16" height="4" rx="1" fill="#433E3B" />
          <text
            x="0"
            y="5"
            fill="#F44336"
            fontSize="3"
            fontWeight="bold"
            textAnchor="middle"
          >
            ON AIR
            {shouldAnimate && (
              <animate
                attributeName="opacity"
                values="1; 0.2; 1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            )}
          </text>
        </g>
      </svg>
    </div>
  );
}
