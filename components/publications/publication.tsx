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

const typeLabels: Record<Props['type'], string> = {
    conference: 'Conference paper',
    workshop: 'Workshop paper',
    proceedings: 'Proceedings',
    thesis: 'B.Sc. thesis',
};

function PublicationLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-neutral-300 transition hover:border-accent/40 hover:text-accent"
        >
            {label} ↗
        </a>
    );
}

export default function Publication({ title, authors, venue, year, abstract, pdfLink, doiLink, codeLink, conferenceLocation, type }: Props) {
    return (
        <article className="border border-border bg-surface/60 p-6 transition hover:border-accent/30">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                <span className="rounded-sm border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-accent">
                    {typeLabels[type]}
                </span>
                <span className="text-muted">{year}</span>
                {conferenceLocation && <span className="text-muted">· {conferenceLocation}</span>}
            </div>

            <h3 className="mt-4 text-lg font-semibold leading-snug text-neutral-100">{title}</h3>
            <p className="mt-2 text-sm text-neutral-400">{authors.join(', ')}</p>
            <p className="mt-1 text-sm italic text-neutral-500">{venue}</p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-400">{abstract}</p>

            <div className="mt-5 flex flex-wrap gap-2">
                {pdfLink && <PublicationLink href={pdfLink} label="PDF" />}
                {doiLink && <PublicationLink href={doiLink} label="DOI" />}
                {codeLink && <PublicationLink href={codeLink} label="Code" />}
            </div>
        </article>
    );
}
