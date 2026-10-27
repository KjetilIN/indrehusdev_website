import { ImageResponse } from "next/og";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

export const alt = "IndrehusDev post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPost(slug);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 72,
                    background: "radial-gradient(circle at 85% 0%, #0f3b3a 0%, #0a0a0f 55%)",
                    color: "#f4f4f6",
                    fontFamily: "monospace",
                }}
            >
                <div style={{ display: "flex", fontSize: 30, color: "#2dd4bf" }}>IndrehusDev &lt;/&gt;</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
                        {post?.title ?? "Post"}
                    </div>
                    {post && post.tags.length > 0 && (
                        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#8b8b96" }}>
                            {post.tags.slice(0, 4).map((tag) => (
                                <div key={tag} style={{ display: "flex" }}>#{tag}</div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8b8b96" }}>
                    <div style={{ display: "flex" }}>Kjetil Indrehus</div>
                    {post && <div style={{ display: "flex" }}>{formatDate(post.date)} · {post.readingTime}</div>}
                </div>
            </div>
        ),
        size
    );
}
