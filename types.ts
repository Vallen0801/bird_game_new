export type ViewState = 'landing' | 'select' | 'takeoff' | 'story' | 'ending' | 'gallery';

export type EndingType = 'Funny Ending' | 'True Ending' | 'Care Ending' | 'Normal Ending' | 'Bad Ending';

export interface Choice {
  id: string;
  text: string;
  scores: Record<string, number>;
  feedbackImage?: string;
  feedbackText?: string[];
}

export interface StoryNode {
  id: number;
  title: string;
  sceneText: string[];
  imageUrl?: string;
  choices: Choice[];
}

export interface Ending {
  id: string;
  name: string;
  type: EndingType;
  text: string[];
  achievement: string;
  careMessage?: string;
}

export interface SavedEnding {
  id: string; // Unique instance id
  birdId: string;
  endingId: string;
  savedAt: string;
}

export interface BirdData {
  id: string;
  name: string;
  quote: string;
  description: string;
  takeoffText: string[];
  nodes: StoryNode[];
  endings: Ending[];
  evaluateEnding: (scores: Record<string, number>, history: string[], endings: Ending[]) => Ending;
  isPlayable: boolean;
}
