import type { LivePlatformData, PlatformFetcher } from "./_types";

const LC_GQL = "https://leetcode.com/graphql";
const LC_HEADERS = { "Content-Type": "application/json", Referer: "https://leetcode.com" };

const QUERY = `
  query lcData($username: String!) {
    matchedUser(username: $username) {
      submitStats { acSubmissionNum { difficulty count } }
      contestBadge { name }
    }
    userContestRanking(username: $username) {
      rating
      attendedContestsCount
    }
    userContestRankingHistory(username: $username) {
      attended
      rating
    }
  }
`;

export const fetchLeetCode: PlatformFetcher = async (handle) => {
  const res = await fetch(LC_GQL, {
    method: "POST",
    headers: LC_HEADERS,
    body: JSON.stringify({ operationName: "lcData", variables: { username: handle }, query: QUERY }),
    next: { revalidate: 21600 },
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    data?: {
      matchedUser?: {
        submitStats?: { acSubmissionNum: Array<{ difficulty: string; count: number }> };
        contestBadge?: { name: string } | null;
      } | null;
      userContestRanking?: { rating: number; attendedContestsCount: number } | null;
      userContestRankingHistory?: Array<{ attended: boolean; rating: number }> | null;
    };
  };

  const user = json.data?.matchedUser;
  const ranking = json.data?.userContestRanking;
  const history = json.data?.userContestRankingHistory;

  if (!user || !ranking) return null;

  const totalSolved =
    user.submitStats?.acSubmissionNum.find((s) => s.difficulty === "All")?.count;

  const attendedRatings = history?.filter((h) => h.attended).map((h) => h.rating) ?? [];
  const maxRating = attendedRatings.length > 0 ? Math.floor(Math.max(...attendedRatings)) : undefined;
  const currentRating = Math.floor(ranking.rating);

  const data: LivePlatformData = {
    currentRating,
    maxRating,
    rank: user.contestBadge?.name ?? undefined,
    maxRank: user.contestBadge?.name ?? undefined,
    problemsSolved: totalSolved,
    contestsParticipated: ranking.attendedContestsCount,
  };
  return data;
};
