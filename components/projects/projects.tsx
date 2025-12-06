"use client"

import { useEffect, useState } from "react";
import Project from "./project";
import AnimatedCounter from "./AnimatedCounter";

interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    updated_at: string;
    fork: boolean;
}

export default function ProjectsSection() {
    const [projects, setProjects] = useState<GitHubRepo[]>([]);
    const [totalPublicRepos, setTotalPublicRepos] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch all repos to count non-forked ones
                const allReposResponse = await fetch('https://api.github.com/users/KjetilIN/repos?per_page=100');
                const allRepos = await allReposResponse.json();

                // Count non-forked repositories
                const nonForkedCount = allRepos.filter((repo: GitHubRepo) => !repo.fork).length;
                setTotalPublicRepos(nonForkedCount);

                // Fetch top 6 updated repos for display
                const response = await fetch('https://api.github.com/users/KjetilIN/repos?sort=updated&per_page=6');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (<section className="bg-transparent mt-40 antialiased w-full">
        <div className="min-w-full px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                    My Projects
                </h2>
                <p className="mt-6 text-lg font-normal text-neutral-400 sm:text-xl">
                    {totalPublicRepos > 0 ? (
                        <>
                            <AnimatedCounter target={totalPublicRepos} /> public projects on GitHub. Showing the most recently updated below.
                        </>
                    ) : (
                        "Loading projects..."
                    )}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center mt-12 sm:mt-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 mt-12 text-left sm:mt-16 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {projects.map((project) => (
                        <Project
                            key={project.name}
                            company="GitHub"
                            description={project.description || "No description available"}
                            link={project.html_url}
                            projectTitle={project.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            language={project.language}
                            stars={project.stargazers_count}
                        />
                    ))}
                </div>
            )}
        </div>
    </section>);
}