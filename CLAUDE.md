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

## Stack

Vite + React 19 + TypeScript, Zustand for the store, Tailwind v4 for styling.

Tailwind v4 has no config file — the theme lives in `@theme` in `src/index.css`,
which is the only stylesheet in the project. Colors are defined with
`light-dark()`, so there are no `dark:` variants anywhere. Data-driven colors
(label chips) are inline styles, since no utility class can name a runtime value.

## Commands

```
pnpm dev      # dev server
pnpm build    # tsc -b && vite build
pnpm lint     # eslint
```
