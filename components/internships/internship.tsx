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
        <div className="relative flex gap-8 group">
            {/* Timeline line and dot */}
            <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-neutral-700 border-2 border-neutral-600 group-hover:bg-neutral-500 group-hover:border-neutral-400 transition-all duration-300 shadow-lg"></div>
                {!isLast && (
                    <div className="w-0.5 h-full bg-neutral-800 mt-2"></div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-12">
                <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <span className="bg-neutral-800/60 text-neutral-300 text-xs font-semibold inline-flex items-center px-3 py-1 rounded-md border border-neutral-700/50">
                                {company}
                            </span>
                            <h3 className="text-xl font-bold leading-tight text-white mt-3 group-hover:text-neutral-100 transition-colors">
                                {role}
                            </h3>
                        </div>
                        <span className="text-sm text-neutral-500 font-mono whitespace-nowrap">
                            {period}
                        </span>
                    </div>

                    <p className="text-base font-normal text-neutral-400 leading-relaxed">
                        {description}
                    </p>

                    {technologies && technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="bg-neutral-800/40 text-neutral-400 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
