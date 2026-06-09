import { useRef } from 'react';
import { motion } from 'motion/react';
import { BirdData, Ending } from '../types';
import { birdImages } from '../assets';
import { Download, RefreshCcw, BookOpen } from 'lucide-react';
import { cn } from '../utils';
import { Typewriter } from '../components/Typewriter';

interface EndingViewProps {
  bird: BirdData;
  ending: Ending;
  onRestart: () => void;
  onSelectAnother: () => void;
  onImportToGallery: () => void;
}

export function EndingView({ bird, ending, onRestart, onSelectAnother, onImportToGallery }: EndingViewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-dvh flex flex-col items-center p-6 bg-bg-base relative overflow-hidden pb-32">
      {/* Background shape */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-soft/20 to-transparent sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mb-6 text-center pt-8"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">你的鸟类结局</span>
      </motion.div>

      {/* The Shareable Card */}
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", damping: 25 }}
        className="w-full max-w-sm bg-brand text-white rounded-[32px] p-8 shadow-2xl relative overflow-hidden flex flex-col"
      >
        {/* Type Badge & Intro */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">
            {ending.type}
          </div>
          <Typewriter 
            as="h2"
            text={ending.name}
            speed={80}
            delay={200}
            className="text-3xl font-serif italic mb-4 leading-tight"
          />
          
          {/* Ending Text */}
          <div className="space-y-1 mb-6 text-xs leading-relaxed opacity-90 font-medium">
            <Typewriter 
              text={ending.text}
              speed={40}
              delay={800}
              className="space-y-2"
            />
          </div>
        </div>

        {/* Content Footer line */}
        <div className="border-t border-white/20 pt-4 mt-2">
          {ending.careMessage && (
            <div className="mb-4">
               <p className="text-[10px] font-bold text-white/80 mb-1">给人类的一句话</p>
               <Typewriter 
                 text={`“${ending.careMessage}”`}
                 speed={40}
                 delay={1500}
                 className="text-xs text-white opacity-90 leading-relaxed italic border-l-2 border-white/30 pl-3 py-1 font-medium"
               />
            </div>
          )}

          <div className="mb-4">
             <p className="text-[10px] font-bold text-white/80 mb-1">达成成就</p>
             <Typewriter 
               text={ending.achievement}
               speed={50}
               delay={2000}
               className="text-[11px] font-medium opacity-90"
             />
          </div>

          <div className="flex justify-between items-end mt-6">
             <div className="text-[8px] font-bold opacity-40 tracking-widest uppercase">
                 BIRD GENES: {bird.id}
             </div>
             <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shadow-inner p-1">
                 <img src={birdImages[bird.id]} alt="bird" className="w-full h-full object-contain rounded-lg bg-white/90" />
             </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-base via-bg-base to-transparent flex flex-col gap-3 max-w-lg mx-auto pointer-events-auto"
      >
        <button 
          className="w-full py-4 px-4 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-xs tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          onClick={onImportToGallery}
        >
          <BookOpen size={14} /> 导入结局图鉴
        </button>
        <div className="flex gap-3">
          <button 
           className="flex-1 py-3.5 px-4 bg-transparent border border-brand text-brand hover:bg-bg-card rounded-full font-semibold text-xs tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
           onClick={() => alert("长按卡片即可保存图片分享！(仅模拟)")}
          >
            <Download size={14} /> 保存卡片
          </button>
          <button 
           className="flex-1 py-3.5 px-4 bg-transparent border border-brand text-brand hover:bg-bg-card rounded-full font-semibold text-xs tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
           onClick={onRestart}
          >
            <RefreshCcw size={14} /> 再飞一次
          </button>
        </div>
        <button 
           onClick={onSelectAnother}
           className="w-full py-2 text-muted font-medium text-xs hover:text-brand transition-colors"
        >
          换一只鸟试试
        </button>
      </motion.div>

    </div>
  );
}
