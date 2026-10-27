import Credits from "@/components/home/Credits";
import EnduranceSide from "@/components/home/EnduranceSide";
import Hero from "@/components/home/Hero";
import WorkSide from "@/components/home/WorkSide";
import { formatStrava } from "@/components/home/strava-format";
import { getAllPosts } from "@/lib/posts";
import { getRunningSummary } from "@/lib/strava";
import { getPostViews } from "@/lib/views";

// Strava numbers and view counts are refreshed at most once an hour.
export const revalidate = 3600;

export default async function Home() {
  const [summary, views] = await Promise.all([getRunningSummary(), getPostViews()]);

  return (
    <main>
      <Hero />
      <div className="mx-auto max-w-5xl px-6">
        <Credits className="mt-3" />
        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-12">
          <WorkSide posts={getAllPosts()} views={views} />
          <EnduranceSide strava={summary ? formatStrava(summary) : null} />
        </div>
      </div>
    </main>
  );
}
