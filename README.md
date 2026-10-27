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

The races on `/endurance` live in `lib/races.ts`. Mark a race `done`, `next`, `planned` or `goal`. The `date` on the `next` race drives the weeks-to-go countdown (on the home page too).

## Strava stats

`/endurance` shows a training log from Strava: last run, longest run and kilometres per week over the last 12 weeks, recent runs, and year-to-date totals. The home page shows a small version. Without the env vars below, those stats are just hidden.

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

Counts are all-time pageviews per post, rounded up (`1.3K views`), refreshed at most once an hour. Without the key, view counts are hidden and the home page shows the latest posts instead.

## Mock stats for previews

Set `MOCK_STATS=1` in `.env.local` (or on a Vercel Preview) to fill in fake view counts and a fake marathon-build training log while the real keys are missing. Real keys always win over the mock. Never set it for Production.
