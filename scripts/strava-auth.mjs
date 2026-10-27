// One-time helper to get a Strava refresh token for the intro page.
//
// 1. Create an app at https://www.strava.com/settings/api with "Authorization Callback Domain" = localhost
// 2. STRAVA_CLIENT_ID=... STRAVA_CLIENT_SECRET=... node scripts/strava-auth.mjs
// 3. Open the printed URL, approve, and copy the printed env vars into .env.local and Vercel.

import http from "node:http";

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } = process.env;
if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) {
    console.error("Set STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET first.");
    process.exit(1);
}

const PORT = 8723;
const redirectUri = `http://localhost:${PORT}/callback`;
const authorizeUrl = new URL("https://www.strava.com/oauth/authorize");
authorizeUrl.search = new URLSearchParams({
    client_id: STRAVA_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    approval_prompt: "force",
    scope: "read,activity:read",
}).toString();

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, redirectUri);
    if (url.pathname !== "/callback") {
        res.writeHead(404).end();
        return;
    }

    const code = url.searchParams.get("code");
    if (!code) {
        res.writeHead(400).end(`Authorization failed: ${url.searchParams.get("error") ?? "no code"}`);
        server.close();
        return;
    }

    const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
        }),
    });
    const body = await response.json();

    if (!response.ok) {
        res.writeHead(500).end("Token exchange failed, see the terminal.");
        console.error(body);
    } else {
        res.writeHead(200, { "Content-Type": "text/plain" }).end("Done! You can close this tab.");
        console.log(`\nAuthorized as ${body.athlete?.firstname ?? "athlete"}. Add these env vars:\n`);
        console.log(`STRAVA_CLIENT_ID=${STRAVA_CLIENT_ID}`);
        console.log(`STRAVA_CLIENT_SECRET=${STRAVA_CLIENT_SECRET}`);
        console.log(`STRAVA_REFRESH_TOKEN=${body.refresh_token}\n`);
    }
    server.close();
});

server.listen(PORT, () => {
    console.log(`Open this URL to authorize:\n\n${authorizeUrl}\n`);
});
