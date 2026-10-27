import { FOOTAGE } from "@/lib/footage";

export default function Credits({ showStrava, className = "" }: { showStrava: boolean; className?: string }) {
    return (
        <p className={`text-[10px] leading-relaxed opacity-60 ${className}`}>
            <a href={FOOTAGE.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:underline">
                {FOOTAGE.credit}
            </a>{" "}
            ·{" "}
            <a href={FOOTAGE.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {FOOTAGE.license}
            </a>
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
