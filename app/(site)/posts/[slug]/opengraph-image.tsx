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
                    background: "#0f0e0c",
                    color: "#f1ede4",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "4px solid #f1ede4", paddingBottom: 16, fontSize: 26, fontWeight: 800, letterSpacing: 6 }}>
                    <div style={{ display: "flex" }}>INDREHUS<span style={{ color: "#ff5a26" }}>.</span></div>
                    <div style={{ display: "flex", color: "#ff5a26" }}>POSTS</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
                        {post?.title ?? "Post"}
                    </div>
                    {post && post.tags.length > 0 && (
                        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#9b958a" }}>
                            {post.tags.slice(0, 4).map((tag) => (
                                <div key={tag} style={{ display: "flex" }}>#{tag}</div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9b958a" }}>
                    <div style={{ display: "flex" }}>Kjetil Indrehus</div>
                    {post && <div style={{ display: "flex" }}>{formatDate(post.date)} · {post.readingTime}</div>}
                </div>
            </div>
        ),
        size
    );
}
