import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import GitHubStats from "@/components/projects/GitHubStats";
import ProjectGrid from "@/components/projects/projects";
import TechStackCarousel from "@/components/projects/TechStackCarousel";
import { getGitHubSummary } from "@/lib/github";

export const metadata: Metadata = {
    title: "Projects",
    description: "Open source projects by Kjetil Indrehus.",
    alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
    const github = await getGitHubSummary();

    return (
        <main className="mx-auto max-w-5xl px-6 pt-12 pb-12 sm:pt-16">
            <header className="mb-10">
                <h1 className="font-mono text-3xl font-bold text-neutral-100">Projects</h1>
                <p className="mt-3 max-w-2xl text-neutral-400">
                    Open source projects, mostly in Rust, Python and TypeScript. Pinned from my GitHub.
                </p>
            </header>

            {github && (
                <div className="mb-12">
                    <GitHubStats totalRepos={github.totalRepos} totalStars={github.totalStars} />
                </div>
            )}

            <section className="mb-16">
                <ProjectGrid repos={github?.repos ?? []} />
            </section>

            <section>
                <SectionHeading eyebrow="Toolbox" title="Tech I work with" />
                <TechStackCarousel />
            </section>
        </main>
    );
}
