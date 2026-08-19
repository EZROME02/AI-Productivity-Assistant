import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, MapPin, Menu, Send, ShieldCheck, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "EZROME RATED OPINIONZ BOT — Football Intelligence Portfolio" },
      {
        name: "description",
        content:
          "A high-demand football intelligence brand: rated match opinionz, player analysis, and global tournament briefings in black, white, and nations colors.",
      },
      {
        property: "og:title",
        content: "EZROME RATED OPINIONZ BOT — Football Intelligence Portfolio",
      },
      {
        property: "og:description",
        content:
          "Rated match opinionz, player analysis, and global tournament briefings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const NAV = [
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Launch App", href: "/" },
];

const PROJECTS = [
  {
    title: "Match Intelligence",
    tag: "Analysis",
    color: "nations-gold",
    desc: "Tactical breakdowns of FIFA, AFCON, UEFA and domestic fixtures — formations, momentum shifts and decisive moments rated in real time.",
  },
  {
    title: "Player Ratings",
    tag: "Scouting",
    color: "nations-green",
    desc: "Data-led player profiles with strengths, weaknesses, form trajectory and career pathway recommendations for young talent.",
  },
  {
    title: "Transfer Opinionz",
    tag: "Market",
    color: "nations-red",
    desc: "Rumour-filtered transfer briefings: value estimates, fit analysis, and the stories that actually matter in the window.",
  },
  {
    title: "Tournament Briefings",
    tag: "Global",
    color: "nations-blue",
    desc: "World Cup-style group-stage and knockout briefings with nation-by-nation strengths, dark horses and verified facts only.",
  },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-chalk-white/10 bg-pitch-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/portfolio" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded bg-nations-gold text-pitch-black">
            <Trophy className="size-4" />
          </span>
          <span className="font-display-alt text-xl tracking-wide text-chalk-white">
            EZROME
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-chalk-white/70 transition-colors hover:text-chalk-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-chalk-white/70 transition-colors hover:text-chalk-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded p-2 text-chalk-white md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-b border-chalk-white/10 px-6 pb-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-chalk-white/80"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-chalk-white/80"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-chalk-white/10 bg-pitch-black px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-nations-gold/30 bg-nations-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-nations-gold">
            <ShieldCheck className="size-3.5" /> Verified Football Intelligence
          </span>
          <h1 className="mt-6 font-display-alt text-6xl leading-[0.9] tracking-wide text-chalk-white md:text-7xl lg:text-8xl">
            RATED.<br />
            OPINIONATED.<br />
            UNSTOPPABLE.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-chalk-white/70">
            EZROME RATED OPINIONZ BOT delivers structured football analysis for fans,
            coaches, players and scouts — every claim verified, every bias flagged.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded bg-nations-gold px-5 py-3 text-sm font-semibold text-pitch-black transition-opacity hover:opacity-90"
            >
              Explore the work <ArrowRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded border border-chalk-white/20 px-5 py-3 text-sm font-semibold text-chalk-white transition-colors hover:bg-chalk-white/5"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-2xl border border-chalk-white/10 bg-gradient-to-br from-chalk-white/10 to-transparent p-8 md:aspect-[4/5]">
            <div className="grid h-full grid-cols-2 gap-4">
              {[
                { value: "5", label: "AI Tools" },
                { value: "200+", label: "Nations Covered" },
                { value: "100%", label: "Editable Outputs" },
                { value: "24/7", label: "Match Insights" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-center rounded-xl border border-chalk-white/10 bg-pitch-black/60 p-5"
                >
                  <span className="font-display-alt text-4xl text-nations-gold md:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-chalk-white/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-full border-4 border-nations-gold bg-pitch-black md:block" />
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-pitch-black px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="font-display-alt text-5xl tracking-wide text-chalk-white md:text-6xl">
              SELECTED WORK
            </h2>
            <p className="mt-4 max-w-md text-chalk-white/60">
              Four ways EZROME turns raw football data into clear, actionable opinionz.
            </p>
          </div>
          <div className="hidden md:block md:text-right">
            <span className="text-sm font-semibold uppercase tracking-wider text-nations-gold">
              World Cup Style Intelligence
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group rounded-2xl border border-chalk-white/10 bg-pitch-black p-6 transition-colors hover:border-chalk-white/20 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "rounded px-2 py-1 text-xs font-semibold uppercase tracking-wider text-pitch-black",
                    project.color === "nations-gold" && "bg-nations-gold",
                    project.color === "nations-green" && "bg-nations-green",
                    project.color === "nations-red" && "bg-nations-red",
                    project.color === "nations-blue" && "bg-nations-blue",
                  )}
                >
                  {project.tag}
                </span>
                <ArrowRight className="size-5 text-chalk-white/30 transition-colors group-hover:text-nations-gold" />
              </div>
              <h3 className="mt-6 font-display-alt text-3xl tracking-wide text-chalk-white">
                {project.title}
              </h3>
              <p className="mt-3 leading-relaxed text-chalk-white/60">
                {project.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section id="contact" className="border-t border-chalk-white/10 bg-pitch-black px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <h2 className="font-display-alt text-5xl tracking-wide text-chalk-white md:text-6xl">
            LET&apos;S TALK FOOTBALL
          </h2>
          <p className="mt-4 max-w-md text-chalk-white/60">
            Partnerships, media enquiries, or custom analysis — send a message and the
            EZROME team will reply within 24 hours.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-chalk-white/70">
              <Mail className="size-5 text-nations-gold" />
              <span className="text-sm">hello@ezrome-opinionz.bot</span>
            </div>
            <div className="flex items-center gap-3 text-chalk-white/70">
              <MapPin className="size-5 text-nations-gold" />
              <span className="text-sm">Global — Built for every nation</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-chalk-white/10 bg-pitch-black p-6 md:p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <Trophy className="size-10 text-nations-gold" />
              <h3 className="mt-4 font-display-alt text-2xl tracking-wide text-chalk-white">
                MESSAGE SENT
              </h3>
              <p className="mt-2 text-sm text-chalk-white/60">
                We&apos;ll be in touch soon. Keep watching the beautiful game.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-chalk-white/60">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-2 w-full rounded border border-chalk-white/10 bg-chalk-white/5 px-4 py-3 text-sm text-chalk-white placeholder:text-chalk-white/30 focus:border-nations-gold focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-chalk-white/60">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-2 w-full rounded border border-chalk-white/10 bg-chalk-white/5 px-4 py-3 text-sm text-chalk-white placeholder:text-chalk-white/30 focus:border-nations-gold focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-chalk-white/60">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="mt-2 w-full rounded border border-chalk-white/10 bg-chalk-white/5 px-4 py-3 text-sm text-chalk-white placeholder:text-chalk-white/30 focus:border-nations-gold focus:outline-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-nations-gold px-5 py-3 text-sm font-semibold text-pitch-black transition-opacity hover:opacity-90"
              >
                Send message <Send className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-chalk-white/10 bg-pitch-black px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-display-alt text-lg tracking-wide text-chalk-white">
          EZROME RATED OPINIONZ BOT
        </span>
        <p className="text-center text-xs text-chalk-white/40 md:text-right">
          Built for football. Black, white, and every nation&apos;s colors.
          <br className="md:hidden" /> AI-generated content is verified where possible — review before sharing.
        </p>
      </div>
    </footer>
  );
}

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-pitch-black text-chalk-white">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
