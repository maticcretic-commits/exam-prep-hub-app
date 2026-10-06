# Exam Prep Hub — mobile app

Native Expo (React Native) shell for the [Exam Prep Hub](https://maticcretic-commits.github.io/exam-prep-hub/):
a 21-course picker on the home screen; each course opens its **live** hub page in an
in-app WebView — so the twice-daily content refreshes reach the app with no update.

## Run it

```bash
npm install
npx expo install --fix   # aligns native deps with your Expo SDK
npx expo start           # scan the QR with Expo Go
```

## Build it (EAS)

```bash
npm install -g eas-cli
eas init                 # creates the EAS project, fills in app.json's projectId
eas build -p android --profile preview   # installable APK for testing
eas build -p android --profile production # AAB for the Play Store
```

## Notes
- No login, no sign-up. "Continue where you left off" uses on-device storage only.
- Offline courses show a friendly offline page with retry.
- Play Store publishing still needs the Play Console identity verification retry.
- This repo is also importable into Ideavo (ideavo.ai) for visual iteration — connect
  the repo and keep building by chat.
