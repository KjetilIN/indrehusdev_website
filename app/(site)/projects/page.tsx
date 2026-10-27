import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
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
            <PageHeader label="03 · Projects" title="Projects">
                Open source projects, mostly in Rust, Python and TypeScript. Pinned from my GitHub.
            </PageHeader>

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
