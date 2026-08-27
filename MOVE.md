Me:
I want to build some advanced frontend project that improve build senior-level skills. What is the best way to go about this? Should I follow some blog or just try to read docs and do it myself, or use AI help?

Claude:
Short version: the method matters less than what you actually build and how honestly you build it. But since you asked, here's how I'd think about it.
The trap with blogs and tutorials is that they let you feel productive while doing something closer to transcription than engineering. You follow along, it works, and you've absorbed almost none of the decision-making that separates senior from mid-level. Senior skill isn't "I know how to wire up React Query" — it's "I know when this pattern is worth the complexity and when it isn't." Tutorials hand you the answers and hide the tradeoffs, which is exactly the part you need to practice.
So my honest recommendation is a blend, weighted heavily toward doing it yourself:
Pick a project that's genuinely hard in the ways senior work is hard — not just visually impressive. That usually means something with real state complexity, real data, and real edge cases. A collaborative editor, a dashboard with live data and optimistic updates, an offline-capable app with sync, a design-system + component library with proper accessibility. The goal is to hit problems that force architectural decisions, not to add another CRUD to-do app to your portfolio.
Use docs as your primary reference, not blogs. Reading official docs well is itself a senior skill. Blogs are fine for a specific "how do people usually structure X" survey, but treat them as opinions to evaluate, not instructions to follow.
Use AI deliberately, and mostly not for the code. Where AI genuinely helps at your level: as a sounding board for architecture ("here's how I'm thinking of structuring state, what breaks at scale?"), as a code reviewer after you've written something, as a way to surface tradeoffs you didn't consider, and to explain unfamiliar patterns you encounter. Where it hurts: letting it write the hard parts for you. If AI solves the exact problem that would have grown your judgment, you paid for the solution and skipped the learning. A good rule: struggle with a problem first, form a hypothesis, then check it against AI or docs.
The thing that actually pushes you to senior level is the reflection loop most people skip: after you build something, ask why you made each significant choice, what you'd do differently, and where it would fall apart under load or with a team of ten touching it. Try deliberately breaking your own architecture — add a feature that your current design makes painful — because feeling that pain is how you learn to anticipate it next time.
If you tell me your current level and what stack you work in, I can suggest a couple of specific projects pitched at the right difficulty, plus what "the hard part" of each one is so you know where to concentrate.

Me:
I have been a full-stack and I reached mid-level towards higher end. But I've grown to enjoy frontend a lot more. I feel like I have a better sense for it than other average full-stacks. I been building backoffice tools at work. However, while I've learned a lot of theoretical knowledge, I feel like I don't have the practical knowledge.
When I start to build something with the intent of learning, I often get stuck very quickly not knowing what the next step would be, always questioning myself whether what I am doing is the correct way.

Claude:
What you're describing isn't really a knowledge gap. It's a working-style problem, and it's incredibly common for exactly your profile — strong theory, mid-to-senior instincts, but most of your reps have come inside an existing codebase with existing patterns and someone else defining the requirements.
Here's what I think is actually happening when you get stuck:
At work, backoffice tools come with scaffolding you don't even notice. There's a repo with conventions, a ticket telling you what to build, a design or at least a data model. So you never face a blank canvas — you face a well-constrained problem. When you sit down to "build something to learn," you strip all of that away at once. Now every micro-decision is open: folder structure, state approach, component boundaries, naming. Each one feels load-bearing, so you freeze. The stuck-ness feels technical ("what's the next step?") but a lot of it is actually product ambiguity — you haven't decided in enough detail what you're building, so of course you don't know the next step. There isn't one yet.
And the "is this correct?" loop is the other half. The uncomfortable truth is that most of those decisions don't have a correct answer — they have several reasonable answers that are all fine and all reversible. Senior devs aren't more certain than you here; they're more comfortable making a defensible call and moving on, because they've learned that correctness reveals itself through use, not through deliberation. You find out your state structure was wrong when a feature becomes painful to add — and then you refactor, and that's the learning. The second-guessing is you trying to get that feedback up front, before writing code, where it isn't available.
So two changes would help you more than any blog or course:
Clone instead of invent. Pick a real product you admire — Linear, Notion, a Trello board, the Spotify web UI, a Stripe-style dashboard — and rebuild a slice of it. This is the single best fix for your exact symptom, because the reference is the spec. You're never wondering "what should this do?" — only "how do I build it?", which is the practical muscle you actually want to train. All your uncertainty gets pointed at engineering instead of product.
Build vertically and ugly first. Resist setting up the "correct" architecture before you've written anything. Get one feature working end to end — hardcoded, messy, no abstractions — and only then extract structure from the working code. Premature structure is a huge source of paralysis, because you're trying to organize code that doesn't exist yet. Working code you can see is easy to refactor; imaginary code is impossible to architect.
A concrete habit to break the anxiety loop: when you hit a decision, give yourself two minutes, pick the reasonable option, drop a // revisit if this gets painful comment, and keep moving. The whole skill you're missing — the thing that separates you from senior — is make a call and continue, then let the code tell you if you were wrong.
On AI, tied to your specific problem: be careful. Someone who already second-guesses every decision can easily start asking AI at every fork, and then you never build your own calibration — you just transfer the anxiety to a prompt. Use it as a reviewer after you've committed to something: "here's what I built and why, tear it apart." That gives you the correctness feedback you're craving without stealing the decision that would have grown your judgment.
If you tell me your stack and roughly how much time you've got, I'll name a specific thing to clone and point out where the genuinely hard parts are — so you know which struggles are the valuable ones worth sitting in.

Me:
My stack is Vite + React. Let me know if I have to specify something more. Is backend needed?
One thing I don't know is that how are all these complex systems built? Do they also use some framework or are they vanilla Js?

Claude:
Vite + React is enough to start — I'll ask about state management and a couple of other things only when the specific project calls for it. Let me take your two real questions in turn, because the second one is more important than it looks.
Do you need a backend?
Not to train the skills you're missing. Your gap is frontend architecture — state, component boundaries, data flow, handling complexity — and you can hit every one of those hard problems without writing a server. A few ways to get "real data" behavior without a backend:
You can start fully in-memory with your data in React state, which is fine for a first vertical slice and lets you focus entirely on the UI logic. When you want persistence and the feel of a real API, drop in a mock layer — MSW (Mock Service Worker) intercepts fetch calls and returns fake data, so your app is written exactly as if a backend existed, which means you practice loading states, errors, optimistic updates, and cache invalidation for real. For persistence across refreshes, IndexedDB (via a wrapper like Dexie) or even localStorage covers a surprising amount.
The reason I'd steer you away from building a backend right now: as a full-stack dev, the backend is your comfort zone. The moment you get stuck on something frontend-hard, you'll feel a pull to go "fix" it by moving logic server-side — and you'll have dodged the exact practice you came for. Keep the backend fake until a project genuinely demands one (real auth, real multi-user sync), so all your struggle stays pointed at frontend.
How are complex systems actually built — framework or vanilla?
This is the more valuable question, and the answer probably isn't what you expect. Linear, Notion, Figma, VS Code — these are not vanilla JS, but they're also not "just React and a UI library." The senior insight is that the framework is the least interesting part of how they're built. What actually makes them work is a layer of custom architecture the framework doesn't give you:
A real data layer. Big apps don't scatter useState everywhere. They have a client-side model of their domain — often a normalized store (think a mini in-memory database of entities by ID), with the UI as a pure function of that store. Linear is famous for this: a local store that syncs to the server in the background, which is why it feels instant. The React components are almost the last thing in the system; the interesting engineering is the store, the sync, and the reactivity.
Custom engines for the hard core. Figma's canvas is WebGL/WebAssembly, not DOM — React only drives the panels and toolbars around it. VS Code's editor (Monaco) is a hand-built text engine. Notion has a custom document model. The pattern: React (or any framework) manages the shell; the genuinely hard part gets a purpose-built engine underneath.
Composition over libraries. They lean less on big component libraries than you'd guess, because at that scale a design system built in-house gives more control. The framework renders; the architecture is theirs.
So the honest answer to "do they use a framework or vanilla?" is: they use a framework to render, and then they build a real application architecture on top of it that most tutorials never mention. That architecture — normalized state, a clear data-flow model, separating your domain logic from your view — is exactly the senior-level thing you can't get from cloning a UI shell alone. It's stack-agnostic; it's why a senior can move between React, Vue, and Svelte without much friction. The framework is a rendering detail. The architecture is the skill.
That reframes your learning target nicely. The goal isn't "build a pretty Linear clone." It's "build a Linear clone where the data lives in a normalized store, the components are a pure view of that store, and you added an MSW mock API with optimistic updates." Same visible result, but now you're practicing the thing that's actually senior.
Want me to sketch what that store-plus-view architecture looks like for a specific clone (a Linear-style issue tracker is a great one for this), so you can see concretely where the framework ends and the real engineering begins?

Me:
Sure, that would paint a picture for me what does it mean "a real application architecture on top". The thing is I haven't used linear and don't really know what it does.

Claude:
Good — not knowing Linear is actually fine, because the architecture is the point, not the product. Let me give you a one-line picture of it and then build the real thing underneath.
What Linear is, minimally: a keyboard-driven issue tracker for software teams. Think a list of issues (little cards: title, description, a status like "Todo / In Progress / Done", an assignee, a priority, some labels), grouped into projects. You create issues, drag them between status columns, filter and reassign them. That's it. Visually it's a fancy to-do list. The reason it's the classic architecture example is entirely how it's built, not what it does.
So imagine we're building a slice of that: a board with issues you can create, move between statuses, and assign to people.
Let me show you the two ways to build it, because the gap between them is the senior lesson.
The naive way (what a tutorial gives you)
You'd hold issues in component state, probably as a nested array, and each issue carries its assignee and labels inline:

js
const [issues, setIssues] = useState([
{ id: 1, title: "Fix login", status: "todo",
assignee: { id: 7, name: "Ada", avatar: "..." },
labels: [{ id: 2, name: "bug", color: "red" }] },
// ...
])

This works for a demo and falls apart the moment the app gets real. Ada is assigned to 40 issues, so her name is copied 40 times — she changes her avatar and you're hunting through arrays to update all 40. A component deep in the tree needs to reassign an issue, so you're threading setIssues down through five layers of props. You want to show the same issue in a list and a sidebar detail panel, and now you have two copies that drift out of sync. Every one of these pains is a data modeling problem wearing a UI costume. This is the ceiling most mid-level frontend work never breaks through.
The real way: a normalized store
The core move is to stop storing data the shape the UI happens to display it, and instead store it the way a database would — every entity type in its own table, keyed by id, and relationships expressed as id references rather than nested objects:

js
const store = {
issues: {
"i1": { id: "i1", title: "Fix login", status: "todo",
assigneeId: "u7", labelIds: ["l2"] },
"i2": { id: "i2", title: "Dark mode", status: "in_progress",
assigneeId: "u7", labelIds: [] },
},
users: {
"u7": { id: "u7", name: "Ada", avatar: "..." },
},
labels: {
"l2": { id: "l2", name: "bug", color: "red" },
},
}

Now Ada exists exactly once. Update users.u7 and every issue assigned to her reflects it instantly, because they never held her data — just a pointer to it. There's a single source of truth for every entity. This is the same normalization idea you already know from relational database design — you're just applying it on the client, in memory. Your backend brain already has this muscle; the insight is that the frontend needs it too, and tutorials never tell you that.
Selectors: the UI reads through a lens
Components don't reach into that raw store. They ask selectors — small functions that assemble the denormalized shape a given view needs:

js
function selectBoardColumn(store, status) {
return Object.values(store.issues)
.filter(issue => issue.status === status)
.map(issue => ({
...issue,
assignee: store.users[issue.assigneeId],
labels: issue.labelIds.map(id => store.labels[id]),
}))
}

The store stays lean and normalized; the view gets the rich, nested object it wants to render — rebuilt fresh from the single source of truth each time. The component becomes a pure function of store state: same store in, same UI out. No local copies to drift.
Actions: the only way to change anything
Mutations don't happen inline in a click handler. They go through named actions, so every change to your domain flows through one describable place:

js
function moveIssue(store, issueId, newStatus) {
return {
...store,
issues: {
...store.issues,
[issueId]: { ...store.issues[issueId], status: newStatus },
},
}
}

Whether you build this with useReducer, Zustand, Redux Toolkit, or Jotai is a detail — pick one, they all express this same shape. The pattern is what matters: state changes are a small, named vocabulary of actions, not scattered setState calls.
Here's the whole loop, which is the picture you're after:
Here's the whole loop as one picture — this is the "architecture on top" made literal. Data flows one direction around the ring:
Read it clockwise: the store holds the truth, selectors turn it into what components render, a user clicks something, that dispatches a named action, the action updates the store (optionally round-tripping through the mock API first), and because components are a pure function of the store, the UI re-renders automatically. You never manually "update the UI" — you update the store and the view follows. That single rule, enforced everywhere, is what keeps a big app from turning to spaghetti.
Now here's why this is the right learning target rather than just trivia:
Almost every senior-level frontend problem lives at one of those arrows, and building the clone makes you feel each one:
The store shape is where you learn data modeling on the client. Get it wrong and everything downstream hurts — which is a good lesson to feel once.
The selector layer is where performance lives. When your board re-renders too much, the fix is here (memoizing selectors, narrowing what each component subscribes to). You can't learn that from a tutorial; you have to make it slow first.
The action layer is where the interesting async lives: optimistic updates (change the store immediately, fire the API in the background, roll back if it fails). That "roll back on failure" logic is genuinely senior work, and the MSW mock lets you practice it — including making the fake API randomly fail so you're forced to handle it.
So a concrete first target, sized to actually finish: a single board with three columns (Todo / In Progress / Done), issues you can create and drag between columns, each with an assignee picked from a small list of users. Build it in this order — and this order is the lesson:
Hardcode two issues in a normalized store, render the three columns reading through a selector. No creating, no dragging yet. Just prove the store→view path works.
Add "create issue" as an action. Now you've done the write path.
Add drag-to-move as another action. Now you're mutating existing entities.
Only now add MSW so create/move hit a fake API, and add optimistic updates with rollback. This is the part that teaches the most.
Notice you don't touch drag-and-drop libraries, styling, or any of the "fun" stuff until the architecture is proven. That ordering — spine first, features second — is itself the senior habit you're trying to build.
If you want, I can write out the actual starter store, one selector, and one action as real code you can drop into a Vite + React project to get past the blank-canvas freeze — just the skeleton for step 1, so you hit the ground with the hard decisions already made and can feel the pattern before extending it.

Me:
Ok so should I create a vite and react app and we'll move to my IntelliJ?

That's exactly the right move. Set it up on your side and I'll give you the step-1 skeleton to drop in.

Quick setup, run these in your terminal wherever you keep projects:

bash
pnpm create vite@latest landrian -- --template react-ts

Two small notes:
I'd suggest picking Zustand for the store on this project — npm install zustand. It's the lightest way to express the store-plus-actions pattern from the diagram without the boilerplate of Redux, and it won't hide the concepts from you the way a heavier setup might. You'll write the store, the selectors, and the actions by hand, which is the point. (You could do step 1 with plain useReducer and no library at all — also fine, and arguably even more transparent — but Zustand will pay off once we add the async/optimistic stuff in step 4, so may as well start there.)
Don't install any drag-and-drop or UI library yet. We're deliberately building the spine first, and every extra dependency now is one more thing that can distract you from the architecture.
Once you've got the dev server running and the default Vite page showing, tell me and I'll hand you the step-1 skeleton: the normalized store with two hardcoded issues, one selector that builds the columns, and the components that render them. Then you'll have the pattern in front of you in real code and we extend from there.
Go set it up — I'll be here.
