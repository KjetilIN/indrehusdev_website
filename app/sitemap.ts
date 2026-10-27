import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts().filter((post) => !post.draft);

    return [
        { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/posts`, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
        ...posts.map((post) => ({
            url: `${SITE_URL}/posts/${post.slug}`,
            lastModified: post.updated ?? post.date,
            priority: 0.7,
        })),
        ...getAllTags().map(({ slug }) => ({
            url: `${SITE_URL}/posts/tags/${slug}`,
            priority: 0.3,
        })),
    ];
}
