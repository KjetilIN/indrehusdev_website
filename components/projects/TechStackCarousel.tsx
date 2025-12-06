"use client"

import Image from "next/image";

interface TechItem {
    name: string;
    logo: string; // URL to logo from a CDN
}

export default function TechStackCarousel() {
    const techStack: TechItem[] = [
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
        { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
        { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
        { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    ];

    // Duplicate the array for seamless infinite scroll
    const duplicatedStack = [...techStack, ...techStack];

    return (
        <div className="w-full overflow-hidden py-8 mb-12">
            <div className="relative">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling container */}
                <div className="flex animate-scroll items-center">
                    {duplicatedStack.map((tech, index) => (
                        <div
                            key={`${tech.name}-${index}`}
                            className="flex-shrink-0 mx-3"
                        >
                            <div
                                className="group relative p-5 rounded-lg bg-white/10 hover:bg-white/15 transition-all duration-300 backdrop-blur-sm hover:scale-110"
                                title={tech.name}
                            >
                                <div className="w-14 h-14 relative flex items-center justify-center">
                                    <img
                                        src={tech.logo}
                                        alt={`${tech.name} logo`}
                                        className="w-full h-full object-contain filter brightness-100 contrast-125 group-hover:brightness-110 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
