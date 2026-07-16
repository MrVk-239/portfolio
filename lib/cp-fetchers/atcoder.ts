import type { PlatformFetcher } from "./_types";

// AtCoder has an unofficial API but requires additional parsing — fallback for now.
export const fetchAtCoder: PlatformFetcher = async () => null;
