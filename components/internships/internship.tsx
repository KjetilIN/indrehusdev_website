interface Props {
    company: string,
    role: string,
    period: string,
    description: string,
    technologies?: string[],
    isLast?: boolean
}

export default function Internship({ company, role, period, description, technologies, isLast }: Props) {
    return (
        <li className="group relative flex gap-6">
            {/* Timeline line and dot */}
            <div className="flex flex-col items-center pt-1.5">
                <div className="h-3 w-3 shrink-0 rounded-full border-2 border-accent/60 bg-bg transition group-hover:bg-accent" />
                {!isLast && <div className="mt-2 w-px flex-1 bg-border" />}
            </div>

            <div className="flex-1 pb-10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold text-neutral-100">
                        {role} <span className="text-muted">· {company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted">{period}</span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{description}</p>

                {technologies && technologies.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                            <li key={tech} className="rounded-md bg-surface px-2 py-0.5 font-mono text-xs text-neutral-400">
                                {tech}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );
}
