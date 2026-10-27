"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/posts", label: "Posts" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-md">
            <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6" aria-label="Main">
                <Link href="/" className="font-mono text-base font-semibold text-neutral-100">
                    IndrehusDev <span className="text-accent">&lt;/&gt;</span>
                </Link>

                <ul className="hidden items-center gap-1 sm:flex">
                    {NAV_LINKS.map((link) => {
                        const active = isActive(pathname, link.href);
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`rounded-md px-3 py-1.5 text-sm transition ${
                                        active
                                            ? "bg-surface text-accent"
                                            : "text-neutral-400 hover:text-neutral-100"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <button
                    type="button"
                    className="-mr-2 rounded-md p-2 text-neutral-300 hover:text-neutral-100 sm:hidden"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((value) => !value)}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                        )}
                    </svg>
                </button>
            </nav>

            <ul id="mobile-menu" hidden={!open} className="border-t border-border/60 px-6 py-3 sm:hidden">
                {NAV_LINKS.map((link) => {
                    const active = isActive(pathname, link.href);
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setOpen(false)}
                                className={`block py-2.5 font-mono text-sm ${active ? "text-accent" : "text-neutral-300"}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </header>
    );
}
