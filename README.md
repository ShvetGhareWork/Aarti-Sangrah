# Aarti Sangrah 🪔

A text-only, offline-capable React Native (Expo) app for reading Marathi aarti lyrics during pooja. No audio, no ads, no internet required — just clean, legible devotional text organized by deity.

## Features

- Browse aartis by deity (Ganesh, Vitthal, Shankar, Krishna, Ram, and more)
- Search by aarti title or deity name
- Adjustable font size for comfortable reading during an active pooja
- Favorites and recently-viewed, saved locally
- Light and dark theme
- Fully offline — all content is bundled with the app, no server or connection needed

## Tech Stack

- **Expo** (React Native, TypeScript)
- **Expo Router** — file-based navigation
- **Zustand** — state management (favorites, recents, settings)
- **AsyncStorage** — local persistence
- **expo-font** / `@expo-google-fonts` — Poppins (UI) and Noto Serif Devanagari (aarti text)

## Project Structure

```
app/                    # Screens (Expo Router file-based routes)
  (tabs)/               # Home, Categories, Search, Favorites, Settings
  category/[deityId].tsx
  aarti/[aartiId].tsx
assets/
  fonts/
  icons/
  illustrations/
src/
  theme/                # Colors, typography, spacing tokens
  data/                 # aartis.json, deities.json
  store/                # Zustand stores
  components/           # Shared UI components
  hooks/
  utils/
```

## Getting Started (Development)

### Prerequisites

- [Node.js](https://nodejs.org/) — latest LTS version (v20.19.4 or newer)
- npm (comes with Node.js)
- An Android device or emulator for testing

### Setup

```bash
git clone <your-repo-url>
cd Aarti-Sangrah
npm install
```

### Run in development (Expo Go)

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app (Android/iOS) to preview the app on your phone. Note: this requires your phone and computer to be on the same network, and it is *not* a standalone offline build — it's for quick testing only.

## Building an Offline, Standalone APK

To get an app that installs and runs fully offline on your phone (no computer, no Expo Go needed afterward), you have two options:

### Option A — EAS Build (cloud, recommended)

```bash
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

Ensure your `eas.json` preview profile is set to output an `.apk`:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

Once the cloud build finishes, download the `.apk` link on your phone and install it (you'll need to allow "install from unknown sources" the first time).

### Option B — Local build (Android Studio / IntelliJ IDEA)

1. Install Android Studio or IntelliJ IDEA with the Android plugin, and the Android SDK.
2. Set the `ANDROID_HOME` environment variable to your SDK path, and add `platform-tools` to your system `PATH`.
3. Generate the native project:
   ```bash
   npx expo prebuild --platform android
   ```
4. Build the release APK from the `android` folder:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleRelease
   ```
5. The signed/unsigned APK will be at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```
6. Transfer it to your phone (USB, email, or cloud drive) and install.

> **Note on signing:** a release build needs a signing key to be installable. Generate one with `keytool -genkeypair -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias` and configure it in `android/app/build.gradle` under `signingConfigs`, or sign the APK afterward with `apksigner`.

## Troubleshooting

**`ENOTEMPTY` error clearing Metro cache**
Usually caused by antivirus locking files mid-write. Close all Metro/Expo processes, delete `%TEMP%\metro-cache` manually, and add your project folder + temp cache to your antivirus exclusions.

**`[CXX5304] This version only understands SDK XML versions up to 3...`**
Your installed NDK/CMake tooling is out of sync with your SDK Command-line Tools.
1. In Android Studio/IntelliJ → SDK Manager → SDK Tools tab, update **NDK (Side by side)** and **CMake** to the latest.
2. Clear stale CMake cache: delete every `.cxx` folder under `android/app` and any native module directories, then `./gradlew clean`.
3. Confirm `android/local.properties` (`sdk.dir=...`) points to the same SDK path you updated in the IDE.

**Node.js version warning during build**
Update to the latest Node.js LTS from [nodejs.org](https://nodejs.org/).

## Content Source

Aarti lyrics are traditional Marathi devotional compositions, compiled for personal/offline reading use. If you're distributing this app publicly, double-check the text against a trusted printed source for accuracy.

## License

Personal project — add a license of your choice if you plan to publish this.
