import type { TocItem } from "@/lib/posts";

function TocLinks({ items }: { items: TocItem[] }) {
    return (
        <ul className="space-y-2 text-sm">
            {items.map((item) => (
                <li key={item.id} className={item.depth === 3 ? "pl-4" : undefined}>
                    <a href={`#${item.id}`} className="text-muted transition hover:text-accent">
                        {item.text}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export function TocSidebar({ items }: { items: TocItem[] }) {
    if (items.length === 0) return null;
    return (
        <nav aria-label="Table of contents" className="sticky top-24">
            <p className="mb-3 border-t-2 border-paper pt-3 text-xs font-extrabold tracking-[0.25em] text-accent uppercase">On this page</p>
            <TocLinks items={items} />
        </nav>
    );
}

export function TocMobile({ items }: { items: TocItem[] }) {
    if (items.length === 0) return null;
    return (
        <details className="mb-8 rounded-lg border border-border bg-surface/60 px-4 py-3 lg:hidden">
            <summary className="cursor-pointer font-mono text-xs uppercase tracking-wider text-neutral-400">
                On this page
            </summary>
            <div className="mt-3">
                <TocLinks items={items} />
            </div>
        </details>
    );
}
