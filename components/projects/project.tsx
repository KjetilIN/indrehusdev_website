interface Props{
    company: string,
    projectTitle: string,
    description: string,
    link: string,
    language?: string,
    stars?: number
}

export default function Project({company, projectTitle, description, link, language, stars}:Props) {
    return (
    <div className="group relative flex flex-col p-8 rounded-xl bg-gradient-to-br from-neutral-950/95 to-neutral-900/80 border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/5 to-neutral-700/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col flex-1">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-neutral-800/60 text-neutral-300 text-xs font-semibold inline-flex items-center px-3 py-1 rounded-md border border-neutral-700/50">
                    {company}
                </span>
                {language && (
                    <span className="bg-neutral-800/40 text-neutral-400 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
                        {language}
                    </span>
                )}
                {stars !== undefined && stars > 0 && (
                    <span className="text-yellow-500/80 text-xs inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        {stars}
                    </span>
                )}
            </div>

            <h3 className="text-2xl font-bold leading-tight text-white mt-4 group-hover:text-neutral-100 transition-colors">
                {projectTitle}
            </h3>

            <p className="text-base font-normal text-neutral-400 mt-3 leading-relaxed flex-1">
                {description}
            </p>

            <a href={link} title="" target="_blank" rel="noopener noreferrer"
                className="mt-6 text-white bg-neutral-800 hover:bg-neutral-700 inline-flex items-center justify-center focus:ring-4 focus:outline-none focus:ring-neutral-800 font-semibold rounded-lg text-sm px-6 py-3 text-center transition-all duration-200 border border-neutral-700/50 hover:border-neutral-600"
                role="button">
                View Project
                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd" />
                </svg>
            </a>
        </div>
    </div>);
}