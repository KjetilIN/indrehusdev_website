import { FOOTAGE } from "@/lib/footage";

export default function Credits({ showStrava, className = "" }: { showStrava: boolean; className?: string }) {
    return (
        <p className={`text-[10px] leading-relaxed opacity-60 ${className}`}>
            Footage:{" "}
            {FOOTAGE.sources.map((source, index) => (
                <span key={source.url}>
                    {index > 0 && ", "}
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {source.title}
                    </a>{" "}
                    by {source.author} (
                    <a href={source.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {source.license}
                    </a>
                    )
                </span>
            ))}
            {showStrava && (
                <>
                    {" "}
                    ·{" "}
                    <a href="https://www.strava.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Powered by Strava
                    </a>
                </>
            )}
        </p>
    );
}
