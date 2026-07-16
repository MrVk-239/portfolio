import type { PlatformConfig } from "@/types";
import type {
  IICPCResult,
  ContestEntry,
  CPAward,
  CPCertificate,
  CPTimelineEntry,
  CPSubmission,
} from "@/types";

// ---------------------------------------------------------------------------
// Platform configs — identity + fallback stats.
// Live stats (rating, rank, contests, problems) are fetched automatically
// from each platform's API and merged by lib/cp-data.ts at request time.
// The fallback values below are used when the API is unavailable.
// ---------------------------------------------------------------------------

export const platformConfigs: PlatformConfig[] = [
  {
    id: "codolio",
    platform: "Codolio",
    handle: "MrVk_239",
    profileUrl: "https://codolio.com/profile/MrVk_239",
    brandColor: "#8B5CF6",
    featured: false,
    fallback: {},
  },
  {
    id: "leetcode",
    platform: "LeetCode",
    handle: "MrVk_239",
    profileUrl: "https://leetcode.com/u/MrVk_239/",
    brandColor: "#FFA116",
    featured: true,
    note: "Top 3.81% globally",
    fallback: {
      currentRating: 1929,
      maxRating: 1936,
      rank: "Knight",
      maxRank: "Knight",
      problemsSolved: 1066,
      contestsParticipated: 27,
    },
  },
  {
    id: "codeforces",
    platform: "Codeforces",
    handle: "MrVk_239",
    profileUrl: "https://codeforces.com/profile/MrVk_239",
    brandColor: "#1890ff",
    featured: true,
    activeSince: "2024",
    fallback: {
      currentRating: 1440,
      maxRating: 1440,
      rank: "Specialist",
      maxRank: "Specialist",
      contestsParticipated: 17,
    },
  },
  {
    id: "codechef",
    platform: "CodeChef",
    handle: "mrvk_239",
    profileUrl: "https://www.codechef.com/users/mrvk_239",
    brandColor: "#5B4638",
    featured: true,
    fallback: {
      currentRating: 1758,
      maxRating: 1758,
      rank: "3★",
      maxRank: "3★",
    },
  },
  {
    id: "geeksforgeeks",
    platform: "GeeksforGeeks",
    handle: "mrvk239",
    profileUrl: "https://www.geeksforgeeks.org/user/mrvk239/",
    brandColor: "#2F8D46",
    featured: false,
    fallback: {},
  },
  {
    id: "hackerrank",
    platform: "HackerRank",
    handle: "vkrishnan2309",
    profileUrl: "https://www.hackerrank.com/profile/vkrishnan2309",
    brandColor: "#00EA64",
    featured: false,
    fallback: {},
  },
  {
    id: "atcoder",
    platform: "AtCoder",
    handle: "MrVk_239",
    profileUrl: "https://atcoder.jp/users/MrVk_239",
    brandColor: "#955D7A",
    featured: false,
    fallback: {
      currentRating: 731,
      maxRating: 731,
      rank: "7 Kyu",
      maxRank: "7 Kyu",
    },
  },
];

// ---------------------------------------------------------------------------
// Static data — manually maintained. The UI and lib/cp-data.ts merge this
// with the live platform stats above to form the full ProblemSolvingData.
// ---------------------------------------------------------------------------

export const problemSolvingStatic = {
  overview: {
    totalProblemsSolved: 2000,
    // No Codolio API available — update this manually as contest count grows
    contestsParticipated: 66,
    tagline:
      "2000+ problems solved across CF, LC, CC, GFG. IICPC™ CodeFest Regionalist. Codeforces Specialist.",
    activeSince: "2024",
  },

  iicpc: [
    {
      id: "iicpc-2026-codefest",
      year: "2026",
      stage: "CodeFest",
      rank: 342,
      totalParticipants: 13000,
      description:
        "Ranked 342 out of 13,000+ participants in the national CodeFest organized by IICPC™ (InterCollegiate Informatic and Competitive Programming Camp Pvt Ltd).",
      url: "https://www.linkedin.com/posts/v-krishnan-307136344_competitiveprogramming-iicpc-codefest2026-share-7425131275490902016-aAYk/",
    },
  ] satisfies IICPCResult[],

  contests: [] satisfies ContestEntry[],

  awards: [
    {
      id: "iicpc-codefest-regionalist",
      title: "CodeFest Regionalist",
      event: "IICPC™ CodeFest",
      date: "2026",
      rank: "342 / 13,000+",
      description:
        "Ranked 342 out of 13,000+ participants in the IICPC™ (InterCollegiate Informatic and Competitive Programming Camp Pvt Ltd) CodeFest.",
      highlight: true,
    },
    {
      id: "algou-accelerator",
      title: "AlgoU Accelerator Camp — Top 1.4%",
      event: "AlgoUniversity Accelerator Camp",
      rank: "Top 1.4% of 40,000",
      description:
        "Ranked in the top 1.4% of 40,000 participants, mentored by engineers from Google, Apple, ByteDance, Grab, and Alphagrep.",
      highlight: true,
    },
  ] satisfies CPAward[],

  certificates: [] satisfies CPCertificate[],

  timeline: [
    {
      date: "2026",
      event: "IICPC™ CodeFest Regionalist — Rank 342 / 13,000+",
      platform: "IICPC",
      highlight: true,
    },
    {
      date: "2025",
      event: "Achieved LeetCode Knight — max rating 1936 (top 3.81% globally)",
      platform: "LeetCode",
      highlight: true,
    },
    {
      date: "2025",
      event: "Achieved Codeforces Specialist — max rating 1440",
      platform: "Codeforces",
      highlight: false,
    },
    {
      date: "2025",
      event: "Achieved CodeChef 3★ — max rating 1758",
      platform: "CodeChef",
      highlight: false,
    },
  ] satisfies CPTimelineEntry[],

  // Notable problem solutions — add entries here; rendered automatically on /problem-solving
  submissions: [] satisfies CPSubmission[],
};
