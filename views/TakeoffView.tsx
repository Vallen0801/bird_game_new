import { motion } from 'motion/react';
import { BirdData } from '../types';
import { birdImages } from '../assets';
import { Play } from 'lucide-react';
import { Typewriter } from '../components/Typewriter';

interface TakeoffViewProps {
  bird: BirdData;
  onStartFlying: () => void;
  onBack: () => void;
}

export function TakeoffView({ bird, onStartFlying, onBack }: TakeoffViewProps) {
  return (
    <div className="min-h-dvh flex flex-col p-6 max-w-lg mx-auto bg-bg-base relative">
      {/* Preload story images in background to prevent flickering */
      bird.nodes.map((node, idx) => (
        <div key={`preload-${idx}`} className="hidden" aria-hidden="true">
          <img src={node.imageUrl || birdImages[bird.id]} alt="" />
          {node.choices.map(c => c.feedbackImage && <img key={c.id} src={c.feedbackImage} alt="" />)}
        </div>
      ))}
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-muted hover:text-brand z-20 text-xs font-semibold tracking-wider uppercase"
      >
        ← 换一只鸟 / Back
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full aspect-[4/3] mt-16 rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-black/5 relative bg-white"
      >
        <img 
          src={birdImages[bird.id]} 
          alt={bird.name}
          className="w-full h-full object-contain bg-white"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Typewriter 
          as="h2"
          text={["你现在是一只", `${bird.name}。`]}
          speed={100}
          delay={250}
          className="absolute bottom-6 left-6 text-white text-3xl font-serif italic tracking-tight font-medium"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 flex-1"
      >
        <div className="space-y-4 text-text-base opacity-80 leading-relaxed text-sm px-2 font-medium">
          {bird.isPlayable ? (
            <Typewriter 
              text={bird.takeoffText} 
              speed={40} 
              delay={800} 
              className="space-y-3"
            />
          ) : (
            <p className="text-brand font-medium border-l-2 border-brand pl-4">这只小鸟还在打盹，剧情尚未加载... 先选别的小鸟体验吧！</p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-auto pt-8 pb-4"
      >
        <button 
          onClick={onStartFlying}
          disabled={!bird.isPlayable}
          className="w-full py-4 px-6 bg-brand disabled:bg-border-light disabled:text-muted disabled:cursor-not-allowed hover:bg-brand-hover text-white rounded-full font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
        >
          <span>开始今天的飞行</span>
          {bird.isPlayable && <Play size={16} fill="currentColor" />}
        </button>
      </motion.div>
    </div>
  );
}
