import { NextResponse } from "next/server";
import { getProblemSolvingData } from "@/lib/cp-data";

export const revalidate = 21600;

export async function GET() {
  const data = await getProblemSolvingData();
  return NextResponse.json(
    { platforms: data.platforms, overview: data.overview },
    { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=43200" } }
  );
}
