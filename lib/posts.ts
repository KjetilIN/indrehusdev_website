import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger, { slug } from "github-slugger";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    updated?: string;
    tags: string[];
    draft: boolean;
    readingTime: string;
}

export interface Post extends PostMeta {
    content: string;
}

export interface TocItem {
    id: string;
    text: string;
    depth: 2 | 3;
}

function readPost(fileName: string): Post {
    const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
    const { data, content } = matter(raw);

    return {
        slug: fileName.replace(/\.mdx?$/, ""),
        title: data.title,
        description: data.description ?? "",
        date: new Date(data.date).toISOString(),
        updated: data.updated ? new Date(data.updated).toISOString() : undefined,
        tags: data.tags ?? [],
        draft: data.draft === true,
        readingTime: readingTime(content).text,
        content,
    };
}

// Drafts are visible in development so they can be previewed locally.
function isPublished(post: PostMeta) {
    return !post.draft || process.env.NODE_ENV === "development";
}

export function getAllPosts(): Post[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    return fs
        .readdirSync(POSTS_DIR)
        .filter((file) => /\.mdx?$/.test(file))
        .map(readPost)
        .filter(isPublished)
        .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(postSlug: string): Post | undefined {
    return getAllPosts().find((post) => post.slug === postSlug);
}

export function tagSlug(tag: string) {
    return slug(tag);
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const post of getAllPosts()) {
        for (const tag of post.tags) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        }
    }

    return [...counts.entries()]
        .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(slugToMatch: string): Post[] {
    return getAllPosts().filter((post) =>
        post.tags.some((tag) => tagSlug(tag) === slugToMatch)
    );
}

// Mirrors rehype-slug (which also uses github-slugger) so TOC links match heading ids.
export function extractToc(source: string): TocItem[] {
    const slugger = new GithubSlugger();
    const withoutCode = source.replace(/```[\s\S]*?```/g, "");
    const toc: TocItem[] = [];

    for (const match of withoutCode.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
        const text = match[2]
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/[`*_~]/g, "")
            .trim();
        toc.push({
            id: slugger.slug(text),
            text,
            depth: match[1].length as 2 | 3,
        });
    }

    return toc;
}

export function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
