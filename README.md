
Curhat Anonim — Expo migration notes

Quick start (Expo):

1. Install dependencies:

```bash
npm install
```

2. Start Expo:

```bash
npm run start
```

Notes:
- This repo originally targeted web (Vite + React). I added Expo config and a minimal `App.tsx` stub so `expo start` can run.
- Screens and components under `screens/` and `components/` currently use web DOM (`div`, `className`, etc.) and must be converted to React Native (`View`, `Text`, `StyleSheet`) before the full app works in Expo.
- Next steps: port `Icon`, `BottomNav`, and core screens to React Native primitives and replace Tailwind classes with RN styles or a tailwind RN library.

If you want, I can start converting individual screens (beginning with `SplashScreen` and `WelcomeScreen`).

