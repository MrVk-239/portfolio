import type { LivePlatformData, PlatformFetcher } from "./_types";

function cap(s: string | undefined): string | undefined {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

export const fetchCodeforces: PlatformFetcher = async (handle) => {
  const [infoRes, ratingRes] = await Promise.allSettled([
    fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
      next: { revalidate: 21600 },
    }),
    fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, {
      next: { revalidate: 21600 },
    }),
  ]);

  if (infoRes.status !== "fulfilled" || !infoRes.value.ok) return null;
  const infoJson = (await infoRes.value.json()) as {
    status: string;
    result: Array<{ rating?: number; maxRating?: number; rank?: string; maxRank?: string }>;
  };
  if (infoJson.status !== "OK" || !infoJson.result[0]) return null;
  const user = infoJson.result[0];

  let contestsParticipated: number | undefined;
  if (ratingRes.status === "fulfilled" && ratingRes.value.ok) {
    const ratingJson = (await ratingRes.value.json()) as { status: string; result: unknown[] };
    if (ratingJson.status === "OK") contestsParticipated = ratingJson.result.length;
  }

  const data: LivePlatformData = {
    currentRating: user.rating,
    maxRating: user.maxRating,
    rank: cap(user.rank),
    maxRank: cap(user.maxRank),
    contestsParticipated,
  };
  return data;
};
