import type { PlatformFetcher } from "./_types";

// CodeChef does not expose a stable public JSON API — fallback only.
export const fetchCodeChef: PlatformFetcher = async () => null;
