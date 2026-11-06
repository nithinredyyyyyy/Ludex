# CORE Esports

CORE Esports is a responsive React + TypeScript app built with Vite and React Router. The interface is optimized for mobile iOS and Android, with a desktop sidebar and multi-column dashboard. Favorites are saved in local browser storage.

## Esports data

The app includes a local snapshot of 2026 tournament dates and results, BGMI KIE standings, teams, and esports stories. Standings were last updated Oct 18, 2026, and the season dataset was reviewed Nov 5, 2026. Data is bundled with the app and does not refresh live; replace it with a backend/API in the next data integration phase. Fields that have not been announced are labeled accordingly rather than estimated.

## Requirements

- Node.js 22 or newer and npm
- Android builds: Android Studio 2025.2.1 or newer, Android SDK, and an emulator or USB-debugging device
- iOS builds: macOS, Xcode 26 or newer, and an iOS simulator or signed device (Capacitor 8 uses Swift Package Manager by default; CocoaPods is optional)
- Capacitor native projects can be generated with Capacitor CLI; Flutter and Dart are not used

## Web development

```sh
npm install
npm run dev
```

Vite prints the local development URL, typically `http://localhost:5173`.

Create a production web build:

```sh
npm run build
npm run preview
```

## Deploy the web app

The production build is written to `dist/`. Deploy that directory to a static hosting provider. SPA fallback rules are included for Vercel (`vercel.json`) and Netlify (`public/_redirects`), so refreshing a nested route such as `/tournaments/pmgc-2026` serves the React app instead of returning a host-level 404.

For Vercel, import this project, set the build command to `npm run build`, and the output directory to `dist`. For Netlify, set the build command to `npm run build` and publish directory to `dist`. No environment variables are currently required. After deployment, verify the home page, a nested tournament URL, the custom in-app 404 route, mobile layout, and external links on the deployed domain.

This deploys the web app only. Android and iOS apps require separate native builds and signing through Android Studio/Gradle and Xcode, respectively.

## Capacitor: Android and iOS

The Android and iOS Capacitor projects are included in this workspace. From the project root, install dependencies and sync the web app to the native shells:

```sh
npm install
npm run build
npx cap sync
```

You can also open the projects in their native IDEs:

```sh
npx cap open android
npx cap open ios
```

To build and run from the CLI after adding and syncing platforms:

```sh
npm run android
npm run ios
```

After changing the web app, run `npm run build` and `npx cap sync` again before launching the native project. `npm run android` needs Android Studio and the Android SDK on a supported desktop system. `npm run ios` needs macOS with Xcode; the iOS scaffold can be opened from another OS, but it cannot be built or run there.

## Screens and routes

- `/` Home dashboard
- `/tournaments` Tournaments and `/tournaments/:id` details
- `/teams` Teams and `/teams/:id` profiles
- `/rankings` Standings
- `/news` Stories and `/news/:id` article details
- `/calendar` Event calendar
- `/search` Search across tournaments, teams and stories
- `/favorites` Saved tournaments

The responsive UI uses a mobile bottom navigation and a desktop sidebar. Live feeds, accounts, notifications, and backend services are not connected.
