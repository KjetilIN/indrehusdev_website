import SocialLinks from "./SocialLinks";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-border/60">
            <div className="mx-auto flex max-w-5xl flex-col-reverse items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
                <p className="font-mono text-sm text-neutral-500">
                    © {new Date().getFullYear()} Kjetil Indrehus
                </p>
                <SocialLinks showLabels={false} />
            </div>
        </footer>
    );
}
