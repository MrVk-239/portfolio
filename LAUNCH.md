# Launch Checklist

Single source of truth for everything required before the portfolio goes live.
Updated after every completed section.

---

## Assets

| Item | Status | Notes |
|---|---|---|
| Profile photo (`/public/profile.jpg`) | ☐ Pending | Hero section shows "VK" monogram placeholder until added. No code change needed — just drop the file in. |
| Resume | ✅ Done | Google Drive link live in `siteConfig.resumeUrl`. Opens in new tab from navbar, hero, mobile menu. |

---

## Competitive Programming Data

| Item | Status | Notes |
|---|---|---|
| GFG stats (coding score, institute rank, solved count) | ☐ Pending | Card renders with logo + handle. Add to `data/problem-solving.ts` → `geeksforgeeks.fallback`. |
| HackerRank stats (badges, solved count) | ☐ Pending | Card renders with logo + handle. Add to `data/problem-solving.ts` → `hackerrank.fallback`. |
| Contest screenshots | ☐ Pending | Add `screenshotUrl` to entries in `contests[]` in `data/problem-solving.ts`. |
| Certificates | ☐ Pending | Add entries to `certificates[]` in `data/problem-solving.ts`. Optional `imageUrl` per cert. |

---

## Project Assets

| Item | Status | Notes |
|---|---|---|
| Project screenshots | ☐ Pending | Add to `images[]` in `data/projects.ts` per project. Place files in `/public/projects/<slug>/`. |
| Benchmark graphs (cryptography) | ☐ Pending | Add to `images[]` on `cryptography-research` entry. 61 PNGs available in the GitHub repo. |
| Architecture diagrams | ☐ Pending | Add to `architectureDiagram` field per project if desired. |

---

## Homepage Sections

| Section | Status |
|---|---|
| Hero | ✅ Built |
| About | ✅ Built |
| Experience | ✅ Built |
| Featured Projects | ✅ Built |
| Problem Solving | ✅ Built |
| Skills | ✅ Built |
| Writing | ✅ Built |
| Contact | ✅ Built |

---

## Pages

| Page | Status |
|---|---|
| `/` (homepage) | ✅ Complete |
| `/projects` | ✅ Built |
| `/projects/[slug]` | ✅ Built |
| `/problem-solving` | ✅ Built |
| `/blog` | ✅ Built |
| `/blog/[slug]` | ✅ Built |

---

## Infrastructure

| Item | Status | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` env var | ☐ Pending | Set in Vercel dashboard before deploy. Affects sitemap, RSS feed, OG URLs. Fallback: `https://vkrishnan.vercel.app`. |
| `RESEND_API_KEY` env var | ☐ Pending | Get from resend.com → set in Vercel env vars. Without it, the contact form returns a 503 with a fallback message pointing to the direct email. |
| `CONTACT_EMAIL` env var | ✅ Set | `vkrishnan2309@gmail.com` — already in `.env.local`; add to Vercel env vars before deploy. |
| Resend from-address | ☐ Optional | Currently `onboarding@resend.dev`. To use a custom from-address (e.g. `contact@yourdomain.com`), verify the domain on Resend and update `app/api/contact/route.ts`. |
| Vercel deployment | ☐ Pending | |
| Custom domain | ☐ Optional | |

---

## SEO / Meta

| Item | Status |
|---|---|
| Sitemap (`/sitemap.xml`) | ✅ Auto-generated |
| Robots (`/robots.txt`) | ✅ Present |
| OG image (1200×630) | ✅ Generated via `app/opengraph-image.tsx` |
| Twitter/X card | ✅ Present |
| RSS feed | ✅ Present |
| Security headers | ✅ `next.config.ts` |
| Favicon | ✅ `app/icon.tsx` |

---

## Pre-launch Verification

- [ ] Run `npm run build` — zero errors, zero warnings
- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO
- [ ] All nav links resolve correctly (especially `/#skills`, `/#experience`, `/#contact` once built)
- [ ] Resume link opens Google Drive in new tab
- [ ] Contact email renders and is correct (`vkrishnan2309@gmail.com`)
- [ ] OG image previews correctly (use [opengraph.xyz](https://www.opengraph.xyz) or similar)
- [ ] Sitemap includes all projects and blog posts
- [ ] No broken internal links

---

*Last updated: 2026-07-17 — All homepage sections complete. Contact form (Resend + Zod + honeypot), links panel, and API route built. Ready for production audit.*
