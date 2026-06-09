import { motion } from 'motion/react';
import { Play, BookOpen } from 'lucide-react';
import { cn } from '../utils';
import { Typewriter } from '../components/Typewriter';

interface LandingViewProps {
  onStart: () => void;
  onViewGallery: () => void;
}

export function LandingView({ onStart, onViewGallery }: LandingViewProps) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-between p-6 relative overflow-hidden max-w-lg mx-auto bg-bg-base">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-soft/30 to-bg-base/0 z-0" />

      {/* Hero Illustration Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex-1 flex flex-col items-center justify-center relative mt-12 z-10"
      >
        <div className="relative w-64 h-64 z-10 bg-white rounded-[40px] shadow-2xl border-[6px] border-white ring-1 ring-black/5 overflow-hidden">
          <img 
            src="/pigeon.jpg" 
            alt="City view with bird" 
            className="w-full h-full object-contain"
          />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-bg-base text-brand"
          >
            {/* Minimal SVG bird icon */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full text-center z-10 mb-12"
      >
        <div className="w-12 h-1 bg-brand/30 mx-auto mb-6 rounded-full"></div>
        <Typewriter 
          as="h1" 
          text={["今天，", "先做一只鸟"]} 
          speed={100} 
          delay={400}
          className="text-3xl font-serif italic text-brand mb-4 leading-normal font-medium" 
        />
        <Typewriter 
          as="p" 
          text={[
            "飞过城市、树梢、窗台和灯光。",
            "选一只鸟，走进它的一天。",
            "你的每一次选择，都会带你飞向不同的结局。"
          ]} 
          speed={45} 
          delay={1800}
          className="text-sm opacity-70 mb-8 leading-relaxed px-4 font-normal tracking-wide space-y-2" 
        />

        <div className="flex flex-col gap-3">
          <button 
            onClick={onStart}
            className="w-full py-4 px-6 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold tracking-wider text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md animate-pulse"
          >
            <span>开始飞行</span>
            <Play size={14} fill="currentColor" />
          </button>
          <button 
            onClick={onViewGallery}
            className="w-full py-3.5 px-6 bg-transparent border border-brand text-brand hover:bg-bg-card rounded-full font-semibold tracking-wider text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm bg-white"
          >
            <BookOpen size={14} />
            <span>查看我的结局图鉴</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
