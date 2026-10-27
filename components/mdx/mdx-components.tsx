import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
    if (href.startsWith("/") || href.startsWith("#")) {
        return <Link href={href} {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function MdxImage({ src, alt = "", width, height }: ComponentPropsWithoutRef<"img">) {
    if (typeof src !== "string") return null;
    return (
        <Image
            src={src}
            alt={alt}
            width={Number(width) || 1200}
            height={Number(height) || 675}
            className="rounded-lg border border-border"
        />
    );
}

const calloutStyles = {
    note: "border-accent/40 bg-accent/5",
    warning: "border-amber-500/40 bg-amber-500/5",
};

function Callout({
    type = "note",
    children,
}: {
    type?: keyof typeof calloutStyles;
    children: ReactNode;
}) {
    return (
        <div className={`not-prose my-6 rounded-lg border px-4 py-3 text-sm leading-relaxed text-neutral-300 ${calloutStyles[type]}`}>
            {children}
        </div>
    );
}

export const mdxComponents = {
    a: MdxLink,
    img: MdxImage,
    Callout,
};
