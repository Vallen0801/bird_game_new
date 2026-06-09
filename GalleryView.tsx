import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Share2, RotateCcw, Trash2, ChevronLeft, Award, Sparkles, Check, Heart, HelpCircle } from 'lucide-react';
import { BirdData, Ending, SavedEnding } from '../types';
import { birdsConfig } from '../data';
import { birdImages } from '../assets';
import { cn } from '../utils';

interface GalleryViewProps {
  onBack: () => void;
  onLiveAgain: (birdId: string) => void;
}

export function GalleryView({ onBack, onLiveAgain }: GalleryViewProps) {
  const [savedEndings, setSavedEndings] = useState<SavedEnding[]>([]);
  const [activeTab, setActiveTab] = useState<'memories' | 'guide'>('memories');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const loaded = localStorage.getItem('bird_endings_gallery');
    if (loaded) {
      try {
        setSavedEndings(JSON.parse(loaded));
      } catch (e) {
        console.error('Failed to parse saved endings', e);
      }
    }
  }, []);

  // Save to localStorage
  const updateSaved = (newSaved: SavedEnding[]) => {
    setSavedEndings(newSaved);
    localStorage.setItem('bird_endings_gallery', JSON.stringify(newSaved));
  };

  // Helper to trigger toast notifications
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Delete a memory
  const handleDelete = (id: string, name: string) => {
    const nextSaved = savedEndings.filter(item => item.id !== id);
    updateSaved(nextSaved);
    showToast(`已将《${name}》从您的鸟类记忆库中移除`);
  };

  // Share / Copy content
  const handleShare = (bird: BirdData, ending: Ending) => {
    const textToCopy = `「今天，先做一只鸟」我的飞行印卷：
🕊️ 我化身为【${bird.name}】，经历了不同的决择，最终达成了【${ending.name}】！
✨ 【${ending.type}】：${ending.text[0] || ''}
🏆 达成成就：${ending.achievement}
💬 “${ending.careMessage ? ending.careMessage : '在天空中，我学会了以风的角度看世界。'}”
来试着选一只鸟，走进它的一天吧！🍂 https://ai.studio/build`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        showToast('结局文案已复制，快去分享给朋友吧！');
      })
      .catch(() => {
        showToast('分享文案复制失败，请重试');
      });
  };

  // Calculate generic achievements and progress
  // Let's count how many total possible bird/ending combinations there are
  const playableBirds = birdsConfig.filter(b => b.isPlayable);
  const totalPossibleEndings = playableBirds.reduce((sum, b) => sum + b.endings.length, 0);
  
  // Count unique endings unlocked in the saved localStorage
  // A unique ending is identified by (birdId + endingId)
  const unlockedKeys = new Set(savedEndings.map(item => `${item.birdId}:${item.endingId}`));
  const uniqueUnlockedCount = unlockedKeys.size;
  const completionPercent = totalPossibleEndings > 0 
    ? Math.round((uniqueUnlockedCount / totalPossibleEndings) * 100) 
    : 0;

  return (
    <div className="min-h-dvh flex flex-col p-6 max-w-lg mx-auto bg-bg-base relative pb-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-6 left-6 right-6 z-50 bg-brand text-white py-3 px-5 rounded-2xl shadow-xl text-center text-xs font-semibold backdrop-blur-md bg-opacity-95 flex items-center justify-center gap-2 border border-white/10"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between pt-4 mb-6">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-border-light text-brand hover:bg-bg-card active:scale-90 transition-transform"
          id="gallery-back-btn"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center flex-1 pr-10">
          <h2 className="text-xl font-serif italic text-brand font-bold">结局图鉴</h2>
          <p className="text-[9px] text-muted uppercase tracking-wider">Bird Resonance Memory Repository</p>
        </div>
      </div>

      {/* Summary collection card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-5 border border-border-light shadow-sm mb-6 flex items-center gap-4 relative overflow-hidden"
      >
        <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
          <BookOpen size={28} />
        </div>
        <div className="flex-1">
          <div className="text-[10px] text-muted tracking-widest uppercase font-bold mb-1">天空探索档案</div>
          <h3 className="font-serif italic font-bold text-base text-text-base">
            已探索 <span className="text-brand text-lg">{uniqueUnlockedCount}</span> / {totalPossibleEndings} 个结局
          </h3>
          <div className="w-full bg-border-light h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-brand h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.max(3, completionPercent)}%` }}
            />
          </div>
          <div className="text-[9px] text-muted mt-1.5 text-right font-medium">
            全图鉴解锁率 {completionPercent}%
          </div>
        </div>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex bg-white/70 p-1.5 rounded-full border border-border-light mb-6">
        <button
          onClick={() => setActiveTab('memories')}
          className={cn(
            "flex-1 py-2.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5",
            activeTab === 'memories' 
              ? "bg-brand text-white shadow-sm" 
              : "text-muted hover:text-brand"
          )}
        >
          <BookOpen size={13} />
          <span>记忆档案 ({savedEndings.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={cn(
            "flex-1 py-2.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5",
            activeTab === 'guide' 
              ? "bg-brand text-white shadow-sm" 
              : "text-muted hover:text-brand"
          )}
        >
          <Award size={13} />
          <span>全收集清单</span>
        </button>
      </div>

      {/* Active Tab View */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'memories' ? (
            <motion.div
              key="memories"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              {savedEndings.length === 0 ? (
                <div className="text-center py-16 px-6 bg-white/50 rounded-3xl border border-dashed border-muted/20 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-border-light text-muted opacity-60 mb-4">
                    <Heart size={24} className="stroke-[1.5]" />
                  </div>
                  <h4 className="font-bold text-xs text-text-base mb-1.5 font-serif">图鉴中暂无飞行的痕迹</h4>
                  <p className="text-[11px] text-muted leading-relaxed max-w-xs mb-6">
                    你还未曾将任何飞行结局收集进您的记忆。在每次通关生成结局卡片后，点击“导入结局图鉴”即可保存。
                  </p>
                  <button
                    onClick={onBack}
                    className="py-3 px-6 bg-brand hover:bg-brand-hover text-white rounded-full text-xs font-semibold tracking-wider shadow-md transition-all active:scale-95"
                  >
                    去天空中飞飞看
                  </button>
                </div>
              ) : (
                [...savedEndings].reverse().map((savedItem, index) => {
                  const bird = birdsConfig.find(b => b.id === savedItem.birdId);
                  const ending = bird?.endings.find(e => e.id === savedItem.endingId);
                  
                  if (!bird || !ending) return null;

                  return (
                    <motion.div
                      key={savedItem.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="bg-white rounded-3xl border border-border-light shadow-sm p-5 relative overflow-hidden"
                    >
                      {/* Top ribbon: Title, Date, Delete button */}
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-[9px] font-bold text-muted uppercase tracking-wider block mb-0.5">
                            {new Date(savedItem.savedAt).toLocaleDateString()} 保存的瞬间
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold bg-brand/10 text-brand gap-1">
                            <Sparkles size={8} /> {ending.type}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDelete(savedItem.id, ending.name)}
                          className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-red-500 hover:bg-red-50 active:scale-90 transition-transform"
                          title="删除记忆"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Main card body with ending name and excerpts */}
                      <div className="flex gap-4 mb-4">
                        <div className="w-14 h-14 bg-bg-base border border-border-light rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center relative">
                          <img 
                            src={birdImages[bird.id]} 
                            alt={bird.name}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-[11px] font-bold text-muted flex items-center gap-1.5">
                            <span>化身为 {bird.name}</span>
                          </div>
                          <h4 className="font-serif italic font-bold text-base text-brand mt-0.5">{ending.name}</h4>
                          <p className="text-[11px] text-muted font-medium mt-1 leading-normal line-clamp-2">
                             “{ending.text[0] || ''}”
                          </p>
                        </div>
                      </div>

                      {/* Achievements section */}
                      <div className="bg-bg-base/50 border border-border-light rounded-2xl p-3 mb-4">
                        <div className="flex items-center gap-1.5 text-brand">
                          <Award size={12} className="stroke-[2.5]" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">达成成就</span>
                        </div>
                        <p className="text-[11px] text-text-base opacity-80 font-medium ml-4 mt-0.5">{ending.achievement}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3 pt-1">
                        <button
                          onClick={() => handleShare(bird, ending)}
                          className="flex-1 py-2.5 text-[11px] font-bold tracking-wider text-brand hover:bg-bg-card border border-brand/20 bg-transparent rounded-full flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                        >
                          <Share2 size={12} />
                          <span>转发分享</span>
                        </button>
                        <button
                          onClick={() => onLiveAgain(bird.id)}
                          className="flex-1 py-2.5 text-[11px] font-bold tracking-wider text-white bg-brand hover:bg-brand-hover rounded-full flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-sm"
                        >
                          <RotateCcw size={12} />
                          <span>再活一次</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          ) : (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              {playableBirds.map(bird => {
                return (
                  <div 
                    key={bird.id}
                    className="bg-white rounded-3xl border border-border-light shadow-sm p-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 border-b border-border-light pb-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-bg-base flex items-center justify-center border border-border-light p-0.5">
                        <img 
                          src={birdImages[bird.id]} 
                          alt={bird.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-text-base">{bird.name}</h4>
                        <p className="text-[9px] text-muted italic font-medium">{bird.quote}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {bird.endings.map(ending => {
                        const isUnlocked = savedEndings.some(
                          item => item.birdId === bird.id && item.endingId === ending.id
                        );

                        return (
                          <div 
                            key={ending.id}
                            className={cn(
                              "flex items-center justify-between p-2 rounded-2xl border text-xs gap-3 transition-colors",
                              isUnlocked 
                                ? "bg-bg-card border-brand/10 text-text-base" 
                                : "bg-bg-base/30 border-dashed border-muted/20 text-muted"
                            )}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "text-[8px] px-1.5 py-0.5 rounded-full font-bold",
                                  isUnlocked 
                                    ? "bg-brand/10 text-brand" 
                                    : "bg-muted/10 text-muted"
                                )}>
                                  {ending.type}
                                </span>
                                <span className={cn("font-bold text-[11px] truncate", isUnlocked ? "text-brand" : "text-muted")}>
                                  {isUnlocked ? ending.name : "？？？"}
                                </span>
                              </div>
                              <p className="text-[9px] opacity-75 truncate mt-0.5 pl-1">
                                {isUnlocked ? `🏆 ${ending.achievement}` : "解锁以获得该成就密码"}
                              </p>
                            </div>
                            <div>
                              {isUnlocked ? (
                                <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                                  <Check size={12} className="stroke-[3]" />
                                </div>
                              ) : (
                                <button
                                  onClick={() => onLiveAgain(bird.id)}
                                  className="py-1 px-2.5 rounded-full bg-white border border-border-light text-[9px] font-bold text-muted hover:text-brand hover:border-brand/40 active:scale-90 transition-transform"
                                >
                                  去解锁
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
