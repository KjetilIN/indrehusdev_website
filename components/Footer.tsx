import SocialLinks from "./SocialLinks";

export default function Footer() {
    return (
        <footer className="mx-auto mt-24 w-full max-w-5xl px-6">
            <div className="flex flex-col-reverse items-start justify-between gap-6 border-t-2 border-paper py-8 sm:flex-row sm:items-center">
                <p className="text-xs font-extrabold tracking-[0.25em] text-neutral-500 uppercase">
                    © {new Date().getFullYear()} Kjetil Indrehus
                </p>
                <SocialLinks showLabels={false} />
            </div>
        </footer>
    );
}
