import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirdData } from '../types';
import { birdsConfig } from '../data';
import { birdImages } from '../assets';
import { cn } from '../utils';

interface SelectionViewProps {
  onSelect: (birdId: string) => void;
}

export function SelectionView({ onSelect }: SelectionViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedId) {
      onSelect(selectedId);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col p-6 max-w-lg mx-auto relative pb-28 bg-bg-base">
      <div className="mb-6 pt-4">
        <h2 className="text-2xl font-serif italic text-brand mb-1">选一只鸟</h2>
        <p className="text-[10px] text-muted uppercase tracking-wider">Choose your resonance</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {birdsConfig.map((bird, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={bird.id}
            onClick={() => setSelectedId(bird.id)}
            className={cn(
              "relative bg-white rounded-2xl p-3 shadow-sm border cursor-pointer transition-all duration-200",
              selectedId === bird.id 
                ? "ring-2 ring-brand border-transparent" 
                : "border-border-light hover:border-brand/30"
            )}
          >
            <div className="aspect-square bg-white rounded-xl overflow-hidden mb-3 relative">
              <img 
                src={birdImages[bird.id]} 
                alt={bird.name}
                className={cn("w-full h-full object-contain transition-all", selectedId === bird.id ? "" : "grayscale-[0.5]")}
              />
              {!bird.isPlayable && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white text-xs font-medium px-2 py-1 bg-black/40 rounded-full">剧情待解锁</span>
                </div>
              )}
            </div>
            <h3 className={cn("font-bold text-xs mb-1", selectedId === bird.id ? "text-text-base" : "text-text-base opacity-60")}>{bird.name}</h3>
            <p className={cn("text-[10px] leading-tight mt-1 italic line-clamp-2", selectedId === bird.id ? "text-muted" : "opacity-40 text-muted")}>{bird.quote}</p>
            {selectedId === bird.id && <div className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full shadow-sm" />}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-base via-bg-base to-transparent z-50 flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-lg pointer-events-auto">
              <button 
                onClick={handleConfirm}
                className="w-full py-4 px-6 border border-brand text-brand hover:bg-bg-card rounded-full font-semibold text-xs tracking-wider flex items-center justify-center shadow-md active:scale-95 transition-transform bg-bg-base"
              >
                选择它起飞
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
