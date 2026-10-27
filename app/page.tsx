import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";
import PostCard from "@/components/posts/PostCard";
import ProjectGrid from "@/components/projects/projects";
import { getGitHubSummary } from "@/lib/github";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = getAllPosts().slice(0, 3);
  const github = await getGitHubSummary();

  return (
    <main className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="pt-20 pb-8 sm:pt-28 sm:pb-12">
        <p className="font-mono text-sm text-accent">Hi, I&apos;m</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-50 sm:text-6xl">
          Kjetil Indrehus
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
          Software developer and M.Sc. student in Programming and System Architecture at UiO.
          I write about systems, Rust, machine learning and whatever I&apos;m building at the moment.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/posts"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent/90"
          >
            Read the blog
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-accent/40 hover:text-accent"
          >
            About me
          </Link>
        </div>

        <div className="mt-10">
          <SocialLinks />
        </div>
      </section>

      {posts.length > 0 && (
        <section className="py-12">
          <SectionHeading eyebrow="Writing" title="Latest posts" link={{ href: "/posts", label: "All posts" }} />
          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="py-12">
        <SectionHeading eyebrow="Building" title="Featured projects" link={{ href: "/projects", label: "All projects" }} />
        <ProjectGrid repos={github?.repos.slice(0, 3) ?? []} />
      </section>
    </main>
  );
}
