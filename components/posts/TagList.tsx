import Link from "next/link";
import { tagSlug } from "@/lib/posts";

export function TagChip({
    label,
    href,
    active = false,
    count,
}: {
    label: string;
    href: string;
    active?: boolean;
    count?: number;
}) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-sm border px-2 py-0.5 font-mono text-xs transition ${
                active
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-border text-muted hover:border-accent/40 hover:text-neutral-200"
            }`}
        >
            {label}
            {count !== undefined && <span className="ml-1.5 opacity-60">{count}</span>}
        </Link>
    );
}

export default function TagList({ tags }: { tags: string[] }) {
    return (
        <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <li key={tag}>
                    <TagChip label={`#${tag}`} href={`/posts/tags/${tagSlug(tag)}`} />
                </li>
            ))}
        </ul>
    );
}
