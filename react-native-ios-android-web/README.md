# Coin Watch

React Native Expo iOS and Android apps. And React Next.js front end app. 
Virtually all code is shared amongst all three platforms. Uses Tamagui UIKit,
Tanstack Query, Zustand.

## 🏁 Run

### Web (Next.js)
- `yarn web` run web dev build
- `yarn web:prod` build prod build
- `yarn web:prod:server` serve prod build

### Native (Android & iOS)
- `yarn navive` run expo dev (s to switch to expo build)
- `yarn android` run expo android build
- `yarn ios` run expo iOS build


## 🗂 Folder layout

The main apps are:

- `expo` (native)
- `next` (web)

- `packages` shared packages across apps
  - `ui` includes your custom UI kit that will be optimized by Tamagui
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)


## 📋 TODO

- [ ] Optimize layout
- [ ] Optimize search
- [ ] Switch to different chart lib
