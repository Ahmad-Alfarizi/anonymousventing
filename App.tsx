import React, { useState } from 'react';
import { ScreenName, Post } from './types';
import { MOCK_POSTS, MY_POSTS_INIT } from './constants';
import { SplashScreen } from './screens/SplashScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { DisclaimerScreen } from './screens/DisclaimerScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CreateCurhatScreen } from './screens/CreateCurhatScreen';
import { CreateVoiceCurhatScreen } from './screens/CreateVoiceCurhatScreen';
import { MyCurhatScreen } from './screens/MyCurhatScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(ScreenName.SPLASH);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [myPosts, setMyPosts] = useState<Post[]>(MY_POSTS_INIT);

  const handleNavigate = (screen: ScreenName) => {
    setCurrentScreen(screen);
  };

  const handleCreatePost = (newPost: Post) => {
    // Add to my posts
    setMyPosts([newPost, ...myPosts]);
    // Add to global feed (simulated)
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id: string) => {
    setMyPosts(myPosts.filter(p => p.id !== id));
    setPosts(posts.filter(p => p.id !== id));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenName.SPLASH:
        return <SplashScreen onNavigate={handleNavigate} />;
      case ScreenName.WELCOME:
        return <WelcomeScreen onNavigate={handleNavigate} />;
      case ScreenName.DISCLAIMER:
        return <DisclaimerScreen onNavigate={handleNavigate} />;
      case ScreenName.HOME:
        return <HomeScreen posts={posts} onNavigate={handleNavigate} />;
      case ScreenName.CREATE_TEXT:
        return <CreateCurhatScreen onNavigate={handleNavigate} onPost={handleCreatePost} />;
      case ScreenName.CREATE_VOICE:
        return <CreateVoiceCurhatScreen onNavigate={handleNavigate} onPost={handleCreatePost} />;
      case ScreenName.MY_CURHAT:
        return <MyCurhatScreen myPosts={myPosts} onNavigate={handleNavigate} onDelete={handleDeletePost} />;
      default:
        return <HomeScreen posts={posts} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 py-0 sm:py-8">
      {/* Mobile Frame Container */}
      <div className="relative h-[100dvh] w-full max-w-md overflow-hidden bg-background-dark sm:h-[844px] sm:rounded-[3rem] sm:border-[8px] sm:border-[#121212] sm:shadow-2xl">
        {/* iOS Dynamic Island / Notch Placeholder (Visible only on desktop frame) */}
        <div className="absolute left-1/2 top-0 z-50 h-7 w-32 -translate-x-1/2 rounded-b-2xl bg-[#121212] hidden sm:block pointer-events-none"></div>
        
        {/* iOS Home Indicator */}
        <div className="absolute bottom-2 left-1/2 z-50 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20 hidden sm:block pointer-events-none"></div>

        {renderScreen()}
      </div>
    </div>
  );
}
