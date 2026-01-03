export enum ScreenName {
  SPLASH = 'SPLASH',
  WELCOME = 'WELCOME',
  DISCLAIMER = 'DISCLAIMER',
  HOME = 'HOME',
  CREATE_TEXT = 'CREATE_TEXT',
  CREATE_VOICE = 'CREATE_VOICE',
  MY_CURHAT = 'MY_CURHAT',
}

export enum PostType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
}

export interface Post {
  id: string;
  type: PostType;
  content?: string;
  duration?: string; // For voice
  timestamp: string;
  mood: string;
  isMyPost?: boolean;
}

export interface Mood {
  emoji: string;
  label: string;
}

export const MOODS: Mood[] = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🤔', label: 'Thinking' },
  { emoji: '❤️‍🩹', label: 'Healing' },
];
