import { unstable_cache } from "next/cache";
import type { PlatformProfile, ProblemSolvingData, PlatformConfig } from "@/types";
import { fetcherRegistry } from "./cp-fetchers";
import { platformConfigs, problemSolvingStatic } from "@/data/problem-solving";

async function resolvePlatforms(configs: PlatformConfig[]): Promise<PlatformProfile[]> {
  return Promise.all(
    configs.map(async (config) => {
      const fetcher = fetcherRegistry[config.id];
      const live = fetcher ? await fetcher(config.handle).catch(() => null) : null;

      const profile: PlatformProfile = {
        id: config.id,
        platform: config.platform,
        handle: config.handle,
        profileUrl: config.profileUrl,
        brandColor: config.brandColor,
        featured: config.featured,
        activeSince: config.activeSince,
        note: config.note,
        currentRating: live?.currentRating ?? config.fallback.currentRating,
        maxRating: live?.maxRating ?? config.fallback.maxRating,
        rank: live?.rank ?? config.fallback.rank,
        maxRank: live?.maxRank ?? config.fallback.maxRank,
        problemsSolved: live?.problemsSolved ?? config.fallback.problemsSolved,
        contestsParticipated: live?.contestsParticipated ?? config.fallback.contestsParticipated,
      };
      return profile;
    })
  );
}

export const getProblemSolvingData = unstable_cache(
  async (): Promise<ProblemSolvingData> => {
    const platforms = await resolvePlatforms(platformConfigs);
    return { ...problemSolvingStatic, platforms };
  },
  ["problem-solving-data"],
  { revalidate: 21600 }
);
