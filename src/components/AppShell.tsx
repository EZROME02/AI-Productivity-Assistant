import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  Briefcase,
  CalendarRange,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Menu,
  NotebookPen,
  Search,
  Star,
  Trophy,
  Binary,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, desc: "Overview of your AI workspace" },
  {
    to: "/portfolio",
    label: "Portfolio",
    icon: Briefcase,
    desc: "EZROME RATED OPINIONZ BOT showcase",
  },
  { to: "/email", label: "Email Generator", icon: Mail, desc: "Professional emails in any tone" },
  {
    to: "/notes",
    label: "Notes Summarizer",
    icon: NotebookPen,
    desc: "Decisions, actions, deadlines",
  },
  {
    to: "/planner",
    label: "Task Planner",
    icon: CalendarRange,
    desc: "Prioritised daily & weekly plans",
  },
  {
    to: "/research",
    label: "Research Assistant",
    icon: Search,
    desc: "Briefings and recommendations",
  },
  {
    to: "/systems",
    label: "Systems Learning",
    icon: Binary,
    desc: "Security, data, software systems & binary",
  },
  { to: "/football", label: "Football News", icon: Trophy, desc: "FIFA, AFCON & global trends" },
  { to: "/coach", label: "Coach Academy", icon: GraduationCap, desc: "Team growth & sponsorships" },
  { to: "/player", label: "Player Lab", icon: Star, desc: "Analysis & career pathways" },
  { to: "/chat", label: "AI Chatbot", icon: Bot, desc: "Ask Aria anything about work" },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon className={cn("size-4", active && "text-sidebar-primary")} />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-2 py-1">
        <span className="grid size-9 place-items-center overflow-hidden rounded-xl bg-brand-gradient">
          <img
            src="/manus-storage/ezrome-ai-productivity-logo_96eaed8a.png"
            alt="EZROME AI logo"
            className="size-7 object-contain"
          />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-semibold text-sidebar-accent-foreground">
            AI EZROME
          </span>
          <span className="block text-xs text-sidebar-foreground/60">ARTIST BOT</span>
        </span>
      </Link>
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto overflow-hidden rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40">
        <img
          src="/assets/ezrome-founder-portrait.webp"
          alt="EZROME, founder of the AI productivity workspace"
          className="h-28 w-full object-cover object-top"
        />
        <div className="p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sidebar-primary">
            Founder signal
          </p>
          <p className="mt-1 font-semibold text-sidebar-accent-foreground">EZROME</p>
          <p className="mt-1 text-xs leading-relaxed text-sidebar-foreground/70">
            Human-led productivity, research, and learning in one workspace.
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3 text-xs leading-relaxed text-sidebar-foreground/75">
        <p className="mb-1 font-semibold text-sidebar-accent-foreground">Responsible AI</p>
        AI output can be inaccurate or incomplete. Review and edit every draft before sending,
        sharing or acting on it, and never paste confidential personal data.
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="sticky top-0 hidden h-screen bg-sidebar lg:block">
        <SidebarInner />
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="flex items-center gap-2 font-display text-sm font-semibold">
          <span className="grid size-7 place-items-center overflow-hidden rounded-lg bg-brand-gradient">
            <img
              src="/manus-storage/ezrome-ai-productivity-logo_96eaed8a.png"
              alt="EZROME AI logo"
              className="size-5 object-contain"
            />
          </span>
          AI EZROME ARTIST BOT
        </span>
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 text-foreground"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 top-[57px] z-30 bg-sidebar lg:hidden">
          <SidebarInner onNavigate={() => setOpen(false)} />
        </div>
      )}

      <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-10">{children}</main>
    </div>
  );
}
