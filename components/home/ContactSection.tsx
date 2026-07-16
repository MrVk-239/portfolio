import { siteConfig } from "@/data/site";
import { platformConfigs } from "@/data/problem-solving";
import { ContactSectionUI, type ContactPlatform } from "./ContactSectionUI";

// AtCoder not included in the contact section — list only the six profiles below.
const CONTACT_PLATFORM_IDS = [
  "codolio",
  "leetcode",
  "codeforces",
  "codechef",
  "geeksforgeeks",
  "hackerrank",
] as const;

export function ContactSection() {
  const github = siteConfig.social.find((s) => s.name === "GitHub");
  const linkedin = siteConfig.social.find((s) => s.name === "LinkedIn");

  const platforms: ContactPlatform[] = platformConfigs
    .filter((p) => (CONTACT_PLATFORM_IDS as readonly string[]).includes(p.id))
    .map((p) => ({
      id: p.id,
      platform: p.platform,
      handle: p.handle,
      profileUrl: p.profileUrl,
    }));

  return (
    <ContactSectionUI
      email={siteConfig.email}
      resumeUrl={siteConfig.resumeUrl}
      githubUrl={github?.url}
      linkedinUrl={linkedin?.url}
      platforms={platforms}
    />
  );
}
