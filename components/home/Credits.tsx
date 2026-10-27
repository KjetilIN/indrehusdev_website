import { FOOTAGE } from "@/lib/footage";

export default function Credits({ className = "" }: { className?: string }) {
    return (
        <p className={`text-[10px] leading-relaxed text-muted ${className}`}>
            Footage:{" "}
            {FOOTAGE.sources.map((source, index) => (
                <span key={source.url}>
                    {index > 0 && ", "}
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-paper hover:underline">
                        {source.title}
                    </a>{" "}
                    by {source.author} (
                    <a href={source.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper hover:underline">
                        {source.license}
                    </a>
                    )
                </span>
            ))}
        </p>
    );
}
