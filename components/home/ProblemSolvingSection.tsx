import { getProblemSolvingData } from "@/lib/cp-data";
import { ProblemSolvingSectionUI } from "./ProblemSolvingSectionUI";

export async function ProblemSolvingSection() {
  const data = await getProblemSolvingData();
  return <ProblemSolvingSectionUI data={data} />;
}
