import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewState, BirdData, Ending } from './types';
import { birdsConfig } from './data';
import { LandingView } from './views/LandingView';
import { SelectionView } from './views/SelectionView';
import { TakeoffView } from './views/TakeoffView';
import { StoryView } from './views/StoryView';
import { EndingView } from './views/EndingView';
import { GalleryView } from './views/GalleryView';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedBird, setSelectedBird] = useState<BirdData | null>(null);
  const [ending, setEnding] = useState<Ending | null>(null);

  const handleStart = () => {
    setView('select');
  };

  const handleBirdSelect = (birdId: string) => {
    const bird = birdsConfig.find(b => b.id === birdId);
    if (bird) {
      setSelectedBird(bird);
      setView('takeoff');
    }
  };

  const clearSelection = () => {
    setSelectedBird(null);
    setView('select');
  };

  const handleStartFlying = () => {
    setView('story');
  };

  const handleStoryFinish = (scores: Record<string, number>, history: string[]) => {
    if (selectedBird) {
      const finalEnding = selectedBird.evaluateEnding(scores, history, selectedBird.endings);
      setEnding(finalEnding);
      setView('ending');
    }
  };

  const handleRestart = () => {
    setEnding(null);
    setView('takeoff');
  };

  const handleImportToGallery = (birdId: string, endingId: string) => {
    const loaded = localStorage.getItem('bird_endings_gallery');
    let savedList: any[] = [];
    if (loaded) {
      try {
        savedList = JSON.parse(loaded);
      } catch (e) {
        console.error(e);
      }
    }
    const exists = savedList.some((item: any) => item.birdId === birdId && item.endingId === endingId);
    if (!exists) {
      const newEntry = {
        id: `${birdId}-${endingId}-${Date.now()}`,
        birdId,
        endingId,
        savedAt: new Date().toISOString()
      };
      savedList.push(newEntry);
      localStorage.setItem('bird_endings_gallery', JSON.stringify(savedList));
    }
    setView('gallery');
  };

  const handleLiveAgain = (birdId: string) => {
    const bird = birdsConfig.find(b => b.id === birdId);
    if (bird) {
      setSelectedBird(bird);
      setEnding(null);
      setView('takeoff');
    }
  };

  return (
    <main className="min-h-dvh font-sans text-text-base antialiased selection:bg-brand selection:text-white bg-bg-base overflow-hidden relative">
      <AnimatePresence>
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 bg-bg-base overflow-y-auto">
            <LandingView onStart={handleStart} onViewGallery={() => setView('gallery')} />
          </motion.div>
        )}
        
        {view === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 bg-bg-base overflow-y-auto">
            <SelectionView onSelect={handleBirdSelect} />
          </motion.div>
        )}
        
        {view === 'takeoff' && selectedBird && (
          <motion.div key="takeoff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 bg-bg-base overflow-y-auto">
            <TakeoffView 
              bird={selectedBird} 
              onStartFlying={handleStartFlying} 
              onBack={clearSelection} 
            />
          </motion.div>
        )}
        
        {view === 'story' && selectedBird && (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 bg-bg-base overflow-y-auto">
            <StoryView 
              bird={selectedBird} 
              onFinish={handleStoryFinish} 
            />
          </motion.div>
        )}
        
        {view === 'ending' && selectedBird && ending && (
          <motion.div key="ending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 bg-bg-base overflow-y-auto">
            <EndingView 
              bird={selectedBird} 
              ending={ending} 
              onRestart={handleRestart}
              onSelectAnother={clearSelection}
              onImportToGallery={() => handleImportToGallery(selectedBird.id, ending.id)}
            />
          </motion.div>
        )}

        {view === 'gallery' && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 bg-bg-base overflow-y-auto">
            <GalleryView 
              onBack={() => setView('landing')} 
              onLiveAgain={handleLiveAgain} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
