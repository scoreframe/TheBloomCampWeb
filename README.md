# Camp Bloom — Web

Read-only family-tree viewer at [family.bloomcamp.com](https://family.bloomcamp.com).

Mirrors the chart you see in the iOS / Android Camp Bloom apps. Sign in with the same Google account you use on mobile and your camp's tree shows up automatically.

## How it works

- Static HTML, no build step. Firebase JS SDK loaded from `gstatic` CDN.
- Auth: Google sign-in via Firebase Web SDK against the existing `the-bloom-camp` project.
- Data: subscribes to `camps/{campId}/people` and `camps/{campId}/relationships` directly. Existing Firestore security rules (per-camp membership) gate access — no backend changes were needed for the web client.
- Layout + relationship-label algorithms ported to vanilla JS in `index.html`. Source-of-truth implementations live in the iOS / Android apps; if the algorithm there changes, mirror it here.

## Hosted

GitHub Pages with a `CNAME` pointing at `family.bloomcamp.com`. Same approach as ScoreFrameWeb.

## Local dev

Just open `index.html` in a browser. The page must be served from `localhost` (or one of the authorized domains) for Google sign-in to work — `python3 -m http.server` is enough.
