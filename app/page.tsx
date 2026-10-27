import Intro from "@/components/intro/Intro";
import { formatStrava } from "@/components/intro/strava-format";
import { getRunningSummary } from "@/lib/strava";

// Strava numbers are refreshed at most once an hour.
export const revalidate = 3600;

export default async function Home() {
  const summary = await getRunningSummary();

  return <Intro strava={summary ? formatStrava(summary) : null} />;
}
