import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { AppShell, NAV } from "@/components/AppShell";
import { SystemsLearning } from "@/components/SystemsLearning";
import { Disclaimer } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI EZROME ARTIST BOT" },
      {
        name: "description",
        content: "AI FOOTBALL ASSISTANT",
      },
      { property: "og:title", content: "AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "AI FOOTBALL ASSISTANT",
      },
    ],
  }),
  component: Index,
});

const STATS = [
  { label: "AI tools", value: "5" },
  { label: "Tones supported", value: "6" },
  { label: "Editable outputs", value: "100%" },
];

function Index() {
  const tools = NAV.filter((n) => n.to !== "/");

  return (
    <AppShell>
      <section className="overflow-hidden rounded-3xl bg-brand-gradient text-primary-foreground shadow-panel sm:grid sm:grid-cols-[1fr_19rem]">
        <div className="p-8 sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-medium">
            <img
              src="/manus-storage/ezrome-ai-productivity-logo_96eaed8a.png"
              alt=""
              className="size-4 object-contain"
            />{" "}
            AI Workplace Productivity Assistant
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
            Built around the signal of EZROME
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
            Automate the busywork. Keep the judgement.
          </h1>
          <p className="mt-3 max-w-xl text-sm/relaxed opacity-90">
            Draft emails, summarise meetings, plan your week, research any topic and think out loud
            with an AI coworker — every output structured, editable and reviewed by you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Open the chatbot <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-lg border border-background/40 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-background/10"
            >
              Write an email
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-wide opacity-75">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative min-h-72 overflow-hidden border-t border-background/15 sm:min-h-full sm:border-l sm:border-t-0">
          <img
            src="/assets/ezrome-founder-portrait.webp"
            alt="EZROME, founder of the AI productivity workspace"
            className="absolute inset-0 size-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081f38] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-background/20 bg-[#081f38]/70 p-3 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#67e8f9]">
              Founder / operator
            </p>
            <p className="mt-1 text-sm font-semibold">EZROME</p>
            <p className="mt-1 text-xs text-primary-foreground/70">
              Human-led tools for focused work.
            </p>
          </div>
        </div>
      </section>

      <h2 className="mt-10 text-lg font-semibold">Your toolkit</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group rounded-2xl border border-border bg-card p-5 shadow-panel transition-colors hover:border-primary/50"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <t.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{t.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open{" "}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <SystemsLearning />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-panel">
          <Zap className="size-5 text-primary" />
          <h3 className="mt-3 text-base font-semibold">Structured prompt engineering</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Every tool sends a purpose-built system prompt with a fixed output contract, so results
            arrive in a consistent, scannable format instead of a wall of text.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-panel">
          <ShieldCheck className="size-5 text-primary" />
          <h3 className="mt-3 text-base font-semibold">Human in the loop</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Outputs are editable inline, unknown details are flagged as [TO CONFIRM], and the
            assistant states its uncertainty rather than inventing facts.
          </p>
        </div>
      </div>

      <Disclaimer />
    </AppShell>
  );
}
