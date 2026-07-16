# V Krishnan — Portfolio

Personal portfolio site built with Next.js 16, Tailwind CSS v4, and Framer Motion.

**Live:** https://portfolio-gold-psi-chyh7xfwkc.vercel.app

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Content:** MDX (blog posts)
- **Contact form:** Resend
- **Deployment:** Vercel

## Local Setup

```bash
npm install
```

Copy `.env.local` and fill in the values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=your@email.com
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Content

| What | Where |
|---|---|
| Profile photo | Drop `/public/profile.jpg` (square, min 400×400px) |
| Projects | `data/projects.ts` |
| Experience | `data/experience.ts` |
| Blog posts | `content/blog/*.mdx` |
| CP stats | `data/problem-solving.ts` |
| Skills | `data/skills.ts` |
