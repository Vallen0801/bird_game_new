import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string | string[];
  speed?: number; // Time per character in ms
  delay?: number; // Warmup delay in ms before starting the animation
  onComplete?: () => void;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function Typewriter({ 
  text, 
  speed = 25, 
  delay = 0, 
  onComplete, 
  className = '', 
  as: Component = 'div' 
}: TypewriterProps) {
  const lines = Array.isArray(text) ? text : [text];
  const [visibleLines, setVisibleLines] = useState<string[]>(() => lines.map(() => ''));
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Reset everything when text content changes (e.g., node navigation)
  useEffect(() => {
    setVisibleLines(lines.map(() => ''));
    setCurrentLineIdx(0);
    setCurrentCharIdx(0);
    setStarted(false);
    setCompleted(false);
  }, [JSON.stringify(text)]);

  // Start delay trigger
  useEffect(() => {
    if (started) return;
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, started, text]);

  // Typing effect loop
  useEffect(() => {
    if (!started || completed) return;

    if (currentLineIdx >= lines.length) {
      setCompleted(true);
      onComplete?.();
      return;
    }

    const currentLineText = lines[currentLineIdx] || '';
    if (currentCharIdx < currentLineText.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => {
          const next = [...prev];
          next[currentLineIdx] = currentLineText.slice(0, currentCharIdx + 1);
          return next;
        });
        setCurrentCharIdx((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Pause slightly between lines for natural rhythm before proceeding to next line
      const timer = setTimeout(() => {
        setCurrentLineIdx((prev) => prev + 1);
        setCurrentCharIdx(0);
      }, speed * 5);
      return () => clearTimeout(timer);
    }
  }, [started, currentLineIdx, currentCharIdx, lines, speed, completed, onComplete]);

  return (
    <Component className={className}>
      {visibleLines.map((lineContent, idx) => {
        if (idx > currentLineIdx) return null;
        return (
          <span key={idx} className="block min-h-[1.5em]">
            {lineContent}
            {idx === currentLineIdx && !completed && (
              <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle animate-pulse" />
            )}
          </span>
        );
      })}
    </Component>
  );
}
