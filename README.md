# IndrehusDev </>

Personal site of Kjetil Indrehus, built with [Next.js](https://nextjs.org/) and deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Writing posts

Add an `.mdx` file to `content/posts/`. Set `track: code` or `track: endurance` in the frontmatter to file it under Code or Endurance. See `content/posts/hello-world.mdx` for the frontmatter and what's supported. Posts with `draft: true` show up in `npm run dev` but not in production.

## Intro video

The home page plays a looping background video from `public/video/`. To swap it:

```bash
# One or more file:start:duration segments, joined with crossfades
scripts/encode-intro-video.sh marathon.webm:12:6 swim.webm:3:5
```

Then update `sources` in `lib/footage.ts`, so every clip is credited with its license, and the `chapters` time ranges that drive the hero caption.

## Race calendar

The races on the home and About pages live in `lib/races.ts`. Mark a race `done`, `next`, `planned` or `goal`.

## Strava stats

The intro shows your latest run and year-to-date running totals from Strava. Without the env vars below, those stats are just hidden.

1. Create an API app at [strava.com/settings/api](https://www.strava.com/settings/api). Set **Authorization Callback Domain** to `localhost`.
2. Get a refresh token. The script prints an authorize URL; open it, approve, and it prints the env vars:
   ```bash
   STRAVA_CLIENT_ID=... STRAVA_CLIENT_SECRET=... node scripts/strava-auth.mjs
   ```
3. Put `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET` and `STRAVA_REFRESH_TOKEN` in `.env.local`. Add them in Vercel too, under Project → Settings → Environment Variables, for Production and Preview.

The app only requests `read,activity:read`, so private activities stay private. It only shows distance, pace and dates, never maps. Data is refreshed at most once an hour. If the stats disappear later, Strava may have rotated the refresh token, so rerun step 2.

## Analytics and view counts

Page views are tracked with [Plausible](https://plausible.io). The script loads only in production, through the `/stats` proxy in `next.config.js`.

To show view counts on posts and the "Most read" list on the home page:

1. Add the site `indrehusdev.no` at [plausible.io](https://plausible.io).
2. Create a Stats API key: Account settings → API Keys → New API key → Stats API.
3. Add `PLAUSIBLE_API_KEY` to `.env.local` and in Vercel (Production and Preview).

Counts are all-time pageviews per post, refreshed at most once an hour. Without the key, view counts are hidden and the home page shows the latest posts instead.
