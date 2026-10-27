import type { ReactNode } from "react";

// Magazine-style page masthead: a hard rule, a small label and a heavy title.
export default function PageHeader({
    label,
    title,
    children,
}: {
    label: string;
    title: ReactNode;
    children?: ReactNode;
}) {
    return (
        <header className="mb-12 border-t-2 border-paper pt-3">
            <p className="text-xs font-extrabold tracking-[0.25em] text-accent uppercase">{label}</p>
            <h1 className="mt-6 font-archivo text-5xl leading-[0.9] font-black tracking-[-0.03em] text-paper uppercase sm:text-7xl">
                {title}
            </h1>
            {children && <div className="mt-5 max-w-2xl text-lg text-neutral-400">{children}</div>}
        </header>
    );
}
