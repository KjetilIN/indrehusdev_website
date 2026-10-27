import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import SocialLinks from "@/components/SocialLinks";
import Internships from "@/components/internships/internships";
import Publications from "@/components/publications/publications";

export const metadata: Metadata = {
    title: "About",
    description: "Education, experience and publications of Kjetil Indrehus.",
    alternates: { canonical: "/about" },
};

const education = [
    {
        degree: "M.Sc. Informatics: Programming and System Architecture",
        school: "University of Oslo (UiO)",
        period: "June 2026",
    },
    {
        degree: "B.Sc. Computer Engineering",
        school: "NTNU Gjøvik",
        period: "2024",
    },
];

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 pt-12 pb-12 sm:pt-16">
            <header className="mb-16">
                <h1 className="font-mono text-3xl font-bold text-neutral-100">About</h1>
                <p className="mt-4 text-lg leading-relaxed text-neutral-400">
                    I&apos;m Kjetil, a software developer from Norway, working full time at Bekk since August 2026.
                    I finished my M.Sc. in Informatics: Programming and System Architecture at UiO in June 2026,
                    after a B.Sc. in Computer Engineering from NTNU Gjøvik. I enjoy systems programming,
                    distributed systems and applied NLP, and I spend most of my free time running.
                </p>
                <div className="mt-6">
                    <SocialLinks />
                </div>
            </header>

            <section className="mb-16">
                <SectionHeading eyebrow="Work" title="Now" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-xl border border-border bg-surface/60 px-5 py-4">
                    <div>
                        <p className="font-medium text-neutral-100">Software Developer</p>
                        <p className="text-sm text-muted">Bekk Consulting AS · Full time</p>
                    </div>
                    <span className="font-mono text-xs text-muted">Aug 2026 – present</span>
                </div>
            </section>

            <section className="mb-16">
                <SectionHeading eyebrow="Education" title="Studies" />
                <ul className="divide-y divide-border rounded-xl border border-border bg-surface/60">
                    {education.map((item) => (
                        <li key={item.degree} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-4">
                            <div>
                                <p className="font-medium text-neutral-100">{item.degree}</p>
                                <p className="text-sm text-muted">{item.school}</p>
                            </div>
                            <span className="font-mono text-xs text-muted">{item.period}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-16">
                <SectionHeading eyebrow="Experience" title="Earlier experience" />
                <Internships />
            </section>

            <section>
                <SectionHeading
                    eyebrow="Research"
                    title="Publications"
                    description="Research contributions in artificial intelligence and natural language processing."
                />
                <Publications />
            </section>
        </main>
    );
}
