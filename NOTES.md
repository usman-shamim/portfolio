# Notes

## User Preferences
- **Time**: weekend-only bursts (5–10 hrs in one sitting). Each milestone must be one weekend's work.
- **Media**: no video. Prefers reading code and hands-on building.
- **Prior knowledge**: basic JS, basic HTML/CSS, a little Laravel/PHP. Not a blank slate.
- **Goal**: build + sell small-business landing pages with AI as a co-pilot.
- **AI workflow**: full loop — scaffold, build, debug, refine with prompts.
- **Reference curriculum**: grounded in Next.js Learn (React Foundations + Dashboard/App Router), filtered to landing-page needs. No video; learn by building real artifacts.

## Weekend Curriculum (mapped to Learn)

**Weekend 1 — Component model + live**
- Lesson 1: Build first component (Hero: components, JSX, props, state) — runs locally
- Lesson 2: Deploy live to Vercel (public URL)

**Weekend 2 — Full landing page**
- Lesson 3: Multiple reusable components (Hero, Features, Pricing, CTA)
- Lesson 4: Style with Tailwind (professional, sellable look)

**Weekend 3 — Ship-ready & SEO**
- Lesson 5: SEO metadata + optimized images (Meta tags, <Next/image>, Open Graph)

**Weekend 4 — AI-assisted workflow**
- Lesson 6: Prompt patterns — scaffold, fix, and extend with an AI co-pilot

**Weekend 5 — Package & sell**
- Lesson 7: Templates vs custom sites, pricing, positioning, where to sell

## Mental Model to Build
- Next.js = React + routing + styling + deployment, all in one. Each page/route is a `page.tsx` React component (like a Laravel view, but in React functions).
- TypeScript = safety net over JS. Catch typos before the client sees a crash.
- Components = reusable UI boxes. Props = inputs (like function args). State = memory that re-renders.
- AI = pair programmer. We prompt it to write components, then learn enough to fix what it gets wrong.

## Decisions
- **Styling**: Tailwind (Lesson 4), not plain CSS — it's the fastest path for AI-assisted builds and professional-looking templates.
- **Data layer**: none. Static site with a static contact form (Formspree/Buttondown) — keeps scope to landing pages.
- **Glossary**: created when the user *demonstrates* understanding, per SKILL.md rules — terms added lazily as lessons progress.
- **Vercel AI SDK / Agent Stack (2026 "Agent Stack")**: NOT a learning vehicle. It's an abstraction that hides components/props/state — exactly what you need to fix broken AI output. Learn fundamentals first (Weekend 1–3), then use the SDK as a premium upsell. Slot an "AI-powered landing page" lesson into Weekend 4 (after Lesson 6 on raw AI prompting), so the user can embed a chatbot/AI copy as a sellable feature.
- **Curriculum addition**: Weekend 4 → Lesson 6 (AI prompting) + Lesson 6b (embed AI SDK chatbot into the landing template). Weekend 5 → Lesson 7 (package + sell).
