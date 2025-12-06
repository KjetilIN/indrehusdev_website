interface Props {
    title: string;
    authors: string[];
    venue: string;
    year: string;
    abstract: string;
    pdfLink?: string;
    doiLink?: string;
    codeLink?: string;
    conferenceLocation?: string;
    type: 'conference' | 'workshop' | 'proceedings' | 'thesis';
}

export default function Publication({ title, authors, venue, year, abstract, pdfLink, doiLink, codeLink, conferenceLocation, type }: Props) {
    const getTypeColor = () => {
        switch (type) {
            case 'conference':
                return 'bg-blue-900/40 text-blue-300 border-blue-800/50';
            case 'workshop':
                return 'bg-purple-900/40 text-purple-300 border-purple-800/50';
            case 'proceedings':
                return 'bg-green-900/40 text-green-300 border-green-800/50';
            case 'thesis':
                return 'bg-amber-900/40 text-amber-300 border-amber-800/50';
        }
    };

    const getTypeLabel = () => {
        switch (type) {
            case 'conference':
                return 'Conference Paper';
            case 'workshop':
                return 'Workshop Paper';
            case 'proceedings':
                return 'Proceedings';
            case 'thesis':
                return 'B.Sc. Thesis';
        }
    };

    return (
        <div className="group relative p-8 rounded-xl bg-gradient-to-br from-neutral-950/95 to-neutral-900/80 border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/5 to-neutral-700/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
                {/* Type Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-semibold inline-flex items-center px-3 py-1 rounded-md border ${getTypeColor()}`}>
                        {getTypeLabel()}
                    </span>
                    <span className="bg-neutral-800/40 text-neutral-400 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
                        {year}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold leading-tight text-white mb-3 group-hover:text-neutral-100 transition-colors">
                    {title}
                </h3>

                {/* Authors */}
                <p className="text-sm font-medium text-neutral-400 mb-2">
                    {authors.join(', ')}
                </p>

                {/* Venue */}
                <p className="text-sm text-neutral-500 mb-4">
                    {venue}
                    {conferenceLocation && <span className="ml-2">• {conferenceLocation}</span>}
                </p>

                {/* Abstract */}
                <p className="text-base font-normal text-neutral-400 leading-relaxed mb-6">
                    {abstract}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                    {pdfLink && (
                        <a
                            href={pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-neutral-800 hover:bg-neutral-700 inline-flex items-center focus:ring-4 focus:outline-none focus:ring-neutral-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200 border border-neutral-700/50 hover:border-neutral-600"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            PDF
                        </a>
                    )}

                    {doiLink && (
                        <a
                            href={doiLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-300 bg-neutral-900/50 hover:bg-neutral-800 inline-flex items-center focus:ring-4 focus:outline-none focus:ring-neutral-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200 border border-neutral-700/50 hover:border-neutral-600"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            DOI
                        </a>
                    )}

                    {codeLink && (
                        <a
                            href={codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-300 bg-neutral-900/50 hover:bg-neutral-800 inline-flex items-center focus:ring-4 focus:outline-none focus:ring-neutral-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200 border border-neutral-700/50 hover:border-neutral-600"
                        >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
