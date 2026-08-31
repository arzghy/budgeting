# Graph Report - budgeting  (2026-08-31)

## Corpus Check
- 45 files · ~9,761 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 257 nodes · 380 edges · 21 communities (15 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- graphify-out/graph.json
- dbConnect
- dependencies
- compilerOptions
- devDependencies
- ItemsPage
- NeedsPage
- WhaleScene.tsx
- dashboard/layout.tsx
- WishlistPage
- app/layout.tsx
- ExpensesPage
- Whale Budgeting
- SavePage
- Requirements - Website Budgeting
- next.config.mjs
- next-env.d.ts
- tailwind.config.ts

## God Nodes (most connected - your core abstractions)
1. `dbConnect()` - 32 edges
2. `auth()` - 30 edges
3. `compilerOptions` - 16 edges
4. `WishlistPage()` - 9 edges
5. `Whale Budgeting` - 9 edges
6. `NeedsPage()` - 8 edges
7. `ItemsPage()` - 8 edges
8. `ExpensesPage()` - 7 edges
9. `Expense` - 7 edges
10. `NeedRow()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `PUT()` --calls--> `dbConnect()`  [EXTRACTED]
  app/api/expenses/[id]/route.ts → lib/mongodb.ts
- `DELETE()` --calls--> `dbConnect()`  [EXTRACTED]
  app/api/expenses/[id]/route.ts → lib/mongodb.ts
- `GET()` --calls--> `dbConnect()`  [EXTRACTED]
  app/api/expenses/route.ts → lib/mongodb.ts
- `POST()` --calls--> `dbConnect()`  [EXTRACTED]
  app/api/expenses/route.ts → lib/mongodb.ts
- `PUT()` --calls--> `dbConnect()`  [EXTRACTED]
  app/api/items/[id]/route.ts → lib/mongodb.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **post-edit graph maintenance workflow** — graphify_update, graphify_out_graph_json, claude_md_graphify [EXTRACTED 0.85]
- **graphify codebase question workflow** — claude_md_graphify, graphify_query, graphify_out_graph_json, graphify_out_wiki_index [EXTRACTED 0.85]

## Communities (21 total, 3 thin omitted)

### Community 0 - "graphify-out/graph.json"
Cohesion: 0.39
Nodes (8): graphify project knowledge graph, graphify explain, graphify-out/graph.json, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md, graphify path, graphify query, graphify update .

### Community 1 - "dbConnect"
Cohesion: 0.11
Nodes (36): handler, auth(), authOptions, DELETE(), PUT(), GET(), POST(), DELETE() (+28 more)

### Community 2 - "dependencies"
Cohesion: 0.06
Nodes (31): @auth/mongodb-adapter, @gsap/react, lenis, lottie-react, mongodb, mongoose, next-auth, dependencies (+23 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 4 - "devDependencies"
Cohesion: 0.08
Nodes (25): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/node, @types/react, @types/react-dom (+17 more)

### Community 5 - "ItemsPage"
Cohesion: 0.24
Nodes (6): Item, ItemsPage(), load(), remove(), reset(), submit()

### Community 6 - "NeedsPage"
Cohesion: 0.29
Nodes (11): DIVISIONS, formatRp(), Need, NeedsPage(), load(), NeedRow(), remove(), reset() (+3 more)

### Community 7 - "WhaleScene.tsx"
Cohesion: 0.18
Nodes (4): features, Icon, steps, WhaleScene

### Community 8 - "dashboard/layout.tsx"
Cohesion: 0.24
Nodes (3): links, Navbar(), Whale()

### Community 9 - "WishlistPage"
Cohesion: 0.29
Nodes (9): formatRp(), Wish, WishlistPage(), load(), purchase(), remove(), reset(), submit() (+1 more)

### Community 10 - "app/layout.tsx"
Cohesion: 0.22
Nodes (5): fredoka, metadata, nunito, LenisProvider(), Providers()

### Community 11 - "ExpensesPage"
Cohesion: 0.27
Nodes (7): DIVISIONS, Expense, ExpensesPage(), load(), remove(), submit(), formatRp()

### Community 12 - "Whale Budgeting"
Cohesion: 0.20
Nodes (9): Catatan, Deploy ke Vercel, Fitur, Setup Google OAuth, Setup Lokal, Setup MongoDB, Stack, Struktur (+1 more)

### Community 13 - "SavePage"
Cohesion: 0.36
Nodes (7): formatRp(), SavePage(), load(), remove(), submit(), Saving, Wish

### Community 14 - "Requirements - Website Budgeting"
Cohesion: 0.50
Nodes (3): Fitur, Requirements - Website Budgeting, Tujuan

## Knowledge Gaps
- **86 isolated node(s):** `handler`, `DIVISIONS`, `Expense`, `Need`, `DIVISIONS` (+81 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 114 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `handler`, `DIVISIONS`, `Expense` to the rest of the system?**
  _86 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dbConnect` be split into smaller, more focused modules?**
  _Cohesion score 0.1063973063973064 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._