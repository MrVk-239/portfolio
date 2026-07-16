import type { PlatformFetcher } from "./_types";
import { fetchCodeforces } from "./codeforces";
import { fetchLeetCode } from "./leetcode";
import { fetchCodeChef } from "./codechef";
import { fetchAtCoder } from "./atcoder";

export const fetcherRegistry: Record<string, PlatformFetcher> = {
  codeforces: fetchCodeforces,
  leetcode: fetchLeetCode,
  codechef: fetchCodeChef,
  atcoder: fetchAtCoder,
};
