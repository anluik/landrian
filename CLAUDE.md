# Landrian

## Comments — important

**Do not add comments to code.** Not explanatory comments, not JSDoc, not
section markers, not `// Step N:` breadcrumbs. Write the code and nothing else.

If something needs explaining, explain it in chat. Reading unfamiliar code and
working out why it is shaped that way is the point of this project; a comment
that hands over the reasoning removes the exercise. Existing comments written
by Andri stay — only refrain from writing new ones.

## What this is

A Linear-style issue board built as deliberate practice for senior frontend
architecture: a normalized client store, selectors as the read path, named
actions as the write path, then a mock API with optimistic updates and rollback.

It is not a product. Default to reviewer and sounding board rather than author —
when there is a fork in the road, name the tradeoff and recommend one option
instead of implementing it. Write code only when asked outright, and keep it to
the spine so the interesting decision stays Andri's.

## How to talk to me

Talk like a friend, not a consultant. Plain words, short sentences, no walls of
text. Skip headings and tables unless the thing is genuinely a list or a
comparison — usually just say it.

Still name the tradeoff and still pick a side. Just do it in fewer words.

## Component guidelines

- Keep components small and single-purpose (SRP).
- Going beyond what was asked is allowed, but each addition must be deliberate
  and called out in chat.
- Prefer Tailwind scale/named utilities (`gap-3.5`, `size-1.5`, `truncate`)
  over arbitrary values (`gap-[14px]`, `h-[6px] w-[6px]`) whenever an
  equivalent exists, and write classes in their canonical v4 form.

## Stack

Vite + React 19 + TypeScript, Zustand for the store, Tailwind v4 for styling,
shadcn/ui (Base UI primitives, Nova preset) for components.

Tailwind v4 has no config file — the theme lives in `src/index.css`, the only
stylesheet in the project. Theming follows the shadcn convention: semantic
variables (`--background`, `--primary`, …) defined in `:root` and `.dark`
blocks, with class-based dark mode driven by `ThemeProvider` in `src/theme/`
(light/dark/system, persisted to localStorage). shadcn components live in
`src/components/ui/` and are owned, editable code. Data-driven colors (label
chips, avatars) are inline styles, since no utility class can name a runtime
value.

## Design language

The app has a "technical ticket" look. When adding a shadcn component
(`pnpm dlx shadcn@latest add …`), it arrives stock — apply the house style as
part of installing it:

- Microcopy (section headers, counts, tags, badges) is `font-mono` uppercase
  with wide tracking; titles and body text stay Geist sans.
- Inputs are filled (`bg-muted` + hairline `border-input`), opening to
  `bg-background` with a violet border and 2px ring on focus.
- Primary actions glow: inset top highlight plus a violet halo shadow.
- Overlays (menus, sheets) are translucent with `backdrop-blur` behind a
  `supports-backdrop-filter:` guard.
- Focus rings are 2px at 40% opacity, not shadcn's 3px/50%.
- Status colors: todo = muted gray, in_progress = amber-500, done =
  emerald-500 (dots in column headers, left rails on issue cards).
- The dotted canvas + violet glow lives on `body` in `src/index.css`; surfaces
  that should float on it use solid token backgrounds.

## Commands

```
pnpm dev      # dev server
pnpm build    # tsc -b && vite build
pnpm lint     # eslint
```
