import { getAllPosts, generateRSS } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vkrishnan.vercel.app";

export function GET() {
  const posts = getAllPosts();
  const rss = generateRSS(posts, SITE_URL);

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
