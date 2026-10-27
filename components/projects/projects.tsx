import type { Repo } from "@/lib/github";
import Project from "./project";

export default function ProjectGrid({ repos }: { repos: Repo[] }) {
    if (repos.length === 0) {
        return (
            <p className="text-muted">
                Couldn&apos;t load projects right now. See them on{" "}
                <a href="https://github.com/KjetilIN" className="text-accent hover:underline">GitHub</a>.
            </p>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
                <Project key={repo.name} repo={repo} />
            ))}
        </div>
    );
}
