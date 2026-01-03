import { Post, PostType } from "./types";

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    type: PostType.TEXT,
    content: "Feeling overwhelmed with finals. It's tough but I'm trying to push through.",
    timestamp: '2h ago',
    mood: '😓',
    isMyPost: false,
  },
  {
    id: '2',
    type: PostType.TEXT,
    content: "Just saw the prettiest sunset today. Reminded me that there's beauty everywhere.",
    timestamp: '3h ago',
    mood: '🌅',
    isMyPost: false,
  },
  {
    id: '3',
    type: PostType.VOICE,
    duration: '0:42',
    timestamp: '5h ago',
    mood: '🎤',
    isMyPost: false,
  },
  {
    id: '4',
    type: PostType.TEXT,
    content: "Not sure what to do after graduation. Kinda scary but also exciting to think about the possibilities.",
    timestamp: '8h ago',
    mood: '🤔',
    isMyPost: false,
  },
];

export const MY_POSTS_INIT: Post[] = [
  {
    id: '101',
    type: PostType.TEXT,
    content: "Feeling a bit overwhelmed today, just needed to get this out...",
    timestamp: '2 hours ago',
    mood: '😓',
    isMyPost: true,
  },
  {
    id: '102',
    type: PostType.VOICE,
    duration: '0:15',
    timestamp: 'Yesterday',
    mood: '🎤',
    isMyPost: true,
  },
   {
    id: '103',
    type: PostType.TEXT,
    content: "Thinking about the future. It's scary but also exciting.",
    timestamp: '3 days ago',
    mood: '🤔',
    isMyPost: true,
  },
];
