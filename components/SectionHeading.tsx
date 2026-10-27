import Link from "next/link";

export default function SectionHeading({
    eyebrow,
    title,
    description,
    link,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    link?: { href: string; label: string };
}) {
    return (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
                {eyebrow && (
                    <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
                )}
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-50 sm:text-3xl">{title}</h2>
                {description && <p className="mt-2 max-w-2xl text-neutral-400">{description}</p>}
            </div>
            {link && (
                <Link href={link.href} className="font-mono text-sm text-muted transition hover:text-accent">
                    {link.label} →
                </Link>
            )}
        </div>
    );
}
