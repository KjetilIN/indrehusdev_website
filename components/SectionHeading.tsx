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
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t-2 border-paper pt-3">
            <div>
                {eyebrow && (
                    <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-accent uppercase">{eyebrow}</p>
                )}
                <h2 className="font-archivo text-3xl leading-none font-black tracking-[-0.02em] text-paper uppercase sm:text-4xl">{title}</h2>
                {description && <p className="mt-2 max-w-2xl text-neutral-400">{description}</p>}
            </div>
            {link && (
                <Link href={link.href} className="text-xs font-bold tracking-[0.2em] text-muted uppercase transition hover:text-accent">
                    {link.label} →
                </Link>
            )}
        </div>
    );
}
