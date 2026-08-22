# AI-Productivity-Assistant

A modern, responsive AI Workplace Productivity Assistant that helps professionals automate everyday
workplace tasks — drafting emails, summarising meetings, planning work, researching topics and
thinking out loud with an AI coworker.

## Project overview

The app is a SaaS-style dashboard with sidebar navigation. Each tool has a clear input panel and an
AI output panel; every AI response is structured Markdown that the user can preview, edit inline,
copy or download. All model calls run server-side, so no API key is ever exposed to the browser.

## Features

1. **Smart Email Generator** (`/email`) — professional email drafts with a subject line, body and
   rationale. Six tones (formal, friendly, persuasive, concise, apologetic, enthusiastic) and three
   length settings.
2. **Meeting Notes Summarizer** (`/notes`) — turns raw notes or transcripts into a summary,
   decisions taken, an action-item table (task / owner / deadline / priority) and open risks.
3. **AI Task Planner** (`/planner`) — Eisenhower-style priority ranking plus a time-blocked daily or
   weekly schedule that respects working hours, breaks and buffer time.
4. **AI Research Assistant** (`/research`) — audience-tuned executive briefing: TL;DR, key points,
   insights, recommendations, and an explicit confidence-and-gaps section.
5. **AI Chatbot (Aria)** (`/chat`) — interactive workplace assistant with conversation memory,
   Markdown rendering and suggested starters.

Shared across the app: dashboard layout, sidebar navigation, mobile + desktop responsive design,
editable AI outputs, copy/download, toast error handling and a Responsible AI disclaimer on every
page.

## Prompt engineering

Each tool has a dedicated system prompt in `src/lib/ai-prompts.ts` defining role, a fixed output
contract (exact headings/tables), style limits, and a shared Responsible AI block that forbids
invented facts, requires `[TO CONFIRM]` placeholders for missing details, and blocks legal/medical/
financial advice. User-selected controls (tone, length, period, audience) are injected as structured
key-value context rather than free text.

## Responsible AI practices

- Persistent disclaimer on every page and in the sidebar.
- Model instructed to state uncertainty and never fabricate names, numbers, dates or citations.
- All outputs editable before use — human in the loop by design.
- Users are advised not to enter confidential or personal data.

## Tools used

- React 19 + TypeScript
- TanStack Start & TanStack Router (file-based routing, server functions)
- Vite 8
- Tailwind CSS v4 with a semantic design-token system
- shadcn/ui + Radix primitives, lucide-react icons, sonner toasts
- react-markdown + remark-gfm
- Lovable AI Gateway (`google/gemini-3.7-flash`)

## Setup instructions

```bash
bun install     # or: npm install
bun run dev     # starts the dev server on http://localhost:8080
```

The AI gateway key (`LOVABLE_API_KEY`) is provided automatically by the Lovable environment and is
read server-side only, inside `src/lib/ai.functions.ts`. To build for production: `bun run build`.

## Project structure

```text
src/
  components/AppShell.tsx      dashboard layout + sidebar navigation
  components/ToolWorkspace.tsx shared input/output panels, editing, disclaimer
  lib/ai-prompts.ts            system prompts per tool
  lib/ai.functions.ts          server function calling the AI gateway
  routes/                      index, email, notes, planner, research, chat
```

## Team members

- _Add your team members here._

---

## Lovable project info

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Software Systems Learning

The dashboard now includes a Systems Learning module covering security foundations, copyright and software licensing, software piracy avoidance, data protection, malware and computer-virus awareness, software systems development, data representation, and binary numbering. The binary lab converts decimal values from 0–255 into 8-bit binary. The content is defensive and educational; it does not provide malware creation, license bypass, credential theft, unauthorized access, or evasion instructions. Legal and regulatory decisions require qualified advice and the applicable authority.

Official starting points used by the module include the [South African Information Regulator](https://inforegulator.org.za/), [WIPO software copyright guidance](https://www.wipo.int/en/web/copyright/activities/software), [WIPO copyright basics](https://www.wipo.int/en/web/copyright/protection), and [CISA malware, phishing, and ransomware guidance](https://www.cisa.gov/topics/cyber-threats-and-advisories/malware-phishing-and-ransomware).

## Live worldwide web search

The Research Assistant now has an optional server-side live-search panel. It uses Tavily for retrieval and the existing AI gateway for synthesis. Search results are shown as source links, and retrieved pages are treated as untrusted reference material rather than instructions. To enable it, configure `TAVILY_API_KEY` in the server environment. Keep both `TAVILY_API_KEY` and `LOVABLE_API_KEY` server-side; never put them in browser code or commit them to Git.

Without `TAVILY_API_KEY`, pasted-text research continues to work and live search displays a configuration message instead of silently pretending that it has internet access.

## Keep the app running while you build

For a local production-like process, run:

```bash
npm run ops:run
```

This starts the development server with HMR on port 4173 and runs a health check, which is useful while you continue building other things. To check an already-running operational server, use `npm run ops:check`. For a normal interactive development session, use `npm run dev`. Production builds still run with `npm run build`; deploy the generated app through the project’s supported hosting path rather than relying on this local runner. A local process only remains available while its machine remains online. For independent 24/7 availability, use the project’s managed hosting or another always-on host and configure the same server-only secrets there.
