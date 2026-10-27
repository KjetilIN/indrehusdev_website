import Internship from "./internship";

export default function Internships() {
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
        <ol>
            {internships.map((internship, index) => (
                <Internship
                    key={`${internship.company}-${internship.period}`}
                    {...internship}
                    isLast={index === internships.length - 1}
                />
            ))}
        </ol>
    );
}
