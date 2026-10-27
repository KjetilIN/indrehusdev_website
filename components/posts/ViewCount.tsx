import { formatViews } from "@/lib/views";

export default function ViewCount({ views }: { views: number }) {
    return (
        <span className="inline-flex items-center gap-1 text-paper/80">
            <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
            {formatViews(views)}
        </span>
    );
}
