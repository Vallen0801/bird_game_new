import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirdData, Choice } from '../types';
import { cn } from '../utils';
import { birdImages } from '../assets';
import { Typewriter } from '../components/Typewriter';

interface StoryViewProps {
  bird: BirdData;
  onFinish: (scores: Record<string, number>, history: string[]) => void;
}

export function StoryView({ bird, onFinish }: StoryViewProps) {
  const [currentNodeIdx, setCurrentNodeIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [step, setStep] = useState<'node' | 'feedback'>('node');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  const node = bird.nodes[currentNodeIdx];
  const totalNodes = bird.nodes.length;

  const handleChoice = (choice: Choice) => {
    const newScores = { ...scores };
    Object.entries(choice.scores || {}).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);
    setHistory([...history, choice.id]);
    setSelectedChoice(choice);
    setStep('feedback');
  };

  const handleNext = () => {
    if (currentNodeIdx < totalNodes - 1) {
      setCurrentNodeIdx(currentNodeIdx + 1);
      setSelectedChoice(null);
      setStep('node');
    } else {
      onFinish(scores, history);
    }
  };

  if (!node) return null;

  const isLastNode = currentNodeIdx === totalNodes - 1;

  return (
    <div className="relative min-h-dvh w-full max-w-lg mx-auto overflow-hidden bg-bg-base font-sans selection:bg-brand selection:text-white shadow-xl border-x border-border-light">
      <AnimatePresence>
        {step === 'node' ? (
          <motion.div
            key={`node-${currentNodeIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-bg-base overflow-y-auto overflow-x-hidden"
          >
            <div className="flex flex-col min-h-max">
              {/* Top Image Portion */}
              <div className="relative w-full shrink-0">
                <img
                  src={node.imageUrl || birdImages[bird.id]}
                  alt="Scene"
                  className="w-full h-auto block aspect-[3/4] object-cover"
                  onError={(e) => {
                    const fallback = birdImages[bird.id];
                    if (!e.currentTarget.src.includes(encodeURIComponent(fallback)) && !e.currentTarget.src.includes(fallback)) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-base to-transparent pointer-events-none" />
                
                {/* Top Progress Bar */}
                <div className="absolute top-0 left-0 right-0 w-full flex items-center justify-between p-6 z-10">
                  <span className="text-[11px] font-bold text-white uppercase tracking-widest drop-shadow-md">
                    {bird.name}的一天
                  </span>
                  <div className="flex gap-1 flex-1 mx-4 drop-shadow-sm">
                    {Array.from({ length: totalNodes }).map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "h-1 flex-1 rounded-full shadow-sm transition-all duration-300",
                          idx <= currentNodeIdx ? "bg-white" : "bg-white/40"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-white uppercase tracking-widest drop-shadow-md">
                    {currentNodeIdx + 1}/{totalNodes}
                  </span>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 px-6 pb-12 -mt-12 flex flex-col flex-1">
                <div className="mb-6 shrink-0">
                  <Typewriter 
                    as="h3"
                    text={node.title}
                    speed={80}
                    delay={100}
                    className="text-xl font-bold text-brand mb-3 drop-shadow-sm"
                  />
                  <div className="space-y-1.5 text-text-base text-[14px] leading-relaxed font-medium drop-shadow-sm">
                    <Typewriter 
                      text={node.sceneText}
                      speed={35}
                      delay={400}
                      className="space-y-2"
                    />
                  </div>
                </div>

                <div className="space-y-3 mt-auto shrink-0 pt-6">
                  {node.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="w-full relative overflow-hidden rounded-[20px] bg-white border border-border-light shadow-sm p-4 text-center transition-all hover:bg-bg-card active:scale-[0.98]"
                    >
                      <span className="relative z-10 text-brand font-bold text-[15px] block w-full">
                        {choice.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`feedback-${currentNodeIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-bg-base overflow-y-auto overflow-x-hidden"
          >
            <div className="flex flex-col min-h-max">
              {/* Top Image Portion */}
              <div className="relative w-full shrink-0">
                <img
                  src={selectedChoice?.feedbackImage || birdImages[bird.id]}
                  alt="Feedback"
                  className="w-full h-auto block aspect-[3/4] object-cover"
                  onError={(e) => {
                    const fallback = birdImages[bird.id];
                    if (!e.currentTarget.src.includes(encodeURIComponent(fallback)) && !e.currentTarget.src.includes(fallback)) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-base to-transparent pointer-events-none" />
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 px-8 pb-12 -mt-12 flex flex-col flex-1 justify-center items-center">
                <div className="space-y-3 text-center mb-10 w-full shrink-0 drop-shadow-sm">
                  {selectedChoice?.feedbackText && (
                    <Typewriter 
                      text={selectedChoice.feedbackText}
                      speed={40}
                      delay={200}
                      className="space-y-2 text-[15px] font-medium text-brand leading-relaxed"
                    />
                  )}
                </div>

                <div className="mt-auto shrink-0 flex justify-center w-full pt-6">
                  <button
                    onClick={handleNext}
                    className="bg-brand text-white font-bold text-[15px] py-4 px-10 rounded-full shadow-[0_4px_14px_0_rgba(110,93,81,0.39)] transition-transform hover:scale-105 active:scale-95"
                  >
                    {isLastNode ? "查看我的鸟类结局" : "继续"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
