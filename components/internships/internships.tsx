"use client"

import Internship from "./internship";

export default function InternshipsSection() {
    const internships = [
        {
            company: "Bekk Consulting AS",
            role: "Software Development Intern",
            period: "Summer 2025",
            description: "Worked on web development projects using Vite. Contributed to client projects and gained experience with modern development workflows.",
            technologies: ["React", "TypeScript", "Vite", "SQL"]
        },
        {
            company: "Fjord1",
            role: "Software Development Intern",
            period: "Summer 2024",
            description: "Developed Azure Functions using Python. Worked on cloud-based solutions and serverless architecture.",
            technologies: ["Python", "Azure Functions", "SQL"]
        },
        {
            company: "Bekk Consulting AS",
            role: "Software Development Intern",
            period: "Summer 2023",
            description: "Worked on web development with Remix. Gained experience in full-stack development and agile methodologies.",
            technologies: ["React", "Remix", "TypeScript"]
        }
    ];

    return (
        <section className="bg-transparent mt-20 antialiased w-full mb-20">
            <div className="min-w-full px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                        Internship Experience
                    </h2>
                    <p className="mt-6 text-lg font-normal text-neutral-400 sm:text-xl">
                        Professional experience gained through internships in software development and IT.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {internships.map((internship, index) => (
                        <Internship
                            key={index}
                            company={internship.company}
                            role={internship.role}
                            period={internship.period}
                            description={internship.description}
                            technologies={internship.technologies}
                            isLast={index === internships.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
