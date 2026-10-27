import Image from "next/image";

interface TechItem {
    name: string;
    logo: string; // URL to logo from a CDN
    invert?: boolean; // Black logos that need flipping on the dark background
}

const techStack: TechItem[] = [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", invert: true },
    { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
];

export default function TechStackCarousel() {
    // Duplicate the array for seamless infinite scroll
    const duplicatedStack = [...techStack, ...techStack];

    return (
        <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <ul className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
                {duplicatedStack.map((tech, index) => (
                    <li
                        key={`${tech.name}-${index}`}
                        className="mx-2 shrink-0 rounded-lg border border-border bg-surface/60 p-4"
                        title={tech.name}
                        aria-hidden={index >= techStack.length}
                    >
                        <Image src={tech.logo} alt={tech.name} width={40} height={40} unoptimized className={`h-10 w-10 object-contain ${tech.invert ? "invert" : ""}`} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
