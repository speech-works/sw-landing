"use client";

import React, { useState, useEffect, useRef } from 'react';

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>?/";

interface DecryptedTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
  as?: React.ElementType;
  speed?: number;
}

export default function DecryptedText({ 
  text, 
  isHovered, 
  className = "", 
  as: Component = "span",
  speed = 30
}: DecryptedTextProps) {
  const [iteration, setIteration] = useState(-1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [scrambledPart, setScrambledPart] = useState("");

  useEffect(() => {
    clearInterval(intervalRef.current!);
    
    if (isHovered) {
      setIteration(0);
      intervalRef.current = setInterval(() => {
        setIteration((prev) => {
          if (prev >= text.length) {
            clearInterval(intervalRef.current!);
            return text.length;
          }
          return prev + 1;
        });
        
        // Update scrambled part periodically
        setScrambledPart(
          text
            .split("")
            .map((char) => char === " " ? " " : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
            .join("")
        );
      }, speed);
    } else {
      setIteration(-1);
      setScrambledPart(
        text
          .split("")
          .map((char) => char === " " ? " " : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
          .join("")
      );
    }
    
    return () => clearInterval(intervalRef.current!);
  }, [text, isHovered, speed]);

  const decryptedText = text.substring(0, iteration);
  const leadingChar = iteration >= 0 && iteration < text.length ? scrambledPart[iteration] : "";
  const remainingScrambled = scrambledPart.substring(Math.min(iteration + 1, text.length));

  return (
    <Component className={`font-mono leading-relaxed block w-full whitespace-pre-wrap break-words ${className}`}>
      <span className="text-app-text transition-colors duration-300">
        {decryptedText}
      </span>
      {isHovered && iteration < text.length && (
        <span className="text-brand shadow-[0_0_10px_rgba(234,88,12,0.8)] font-black scale-110 inline-block">
          {leadingChar}
        </span>
      )}
      <span className="text-brand/20 blur-[0.2px]">
        {remainingScrambled}
      </span>
    </Component>
  );
}
