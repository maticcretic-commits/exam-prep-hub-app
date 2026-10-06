# Exam Prep Hub — app launch checklist

## Build & test (mine / automated)
- [x] Expo scaffold pushed: picker + WebView + search + onboarding + offline fallback
- [x] Icon + splash generated
- [ ] EAS preview APK built and installed on a real phone
- [ ] All 21 course pages load in-app; search + continue-where-you-left-off verified

## Play Store (needs Nitesh)
- [ ] Play Console identity verification retry — bank statement / utility bill matching the profile address + sharp ID
- [ ] Production AAB via `eas build -p android --profile production`
- [ ] Store listing: title, short + full description, screenshots (5+), feature graphic, icon
- [ ] Content rating questionnaire + privacy policy URL
- [ ] Rollout: internal test → closed → production

## Post-launch
- [ ] PostHog mobile SDK for in-app analytics (needs PostHog account — Batch 2)
- [ ] Play listing link added to the hub's app.html download section
- [ ] Announce on Daily Current Affairs channels
