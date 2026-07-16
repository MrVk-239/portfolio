export interface LivePlatformData {
  currentRating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  problemsSolved?: number;
  contestsParticipated?: number;
}

export type PlatformFetcher = (handle: string) => Promise<LivePlatformData | null>;
