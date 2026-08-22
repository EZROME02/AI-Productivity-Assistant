/* Software Systems learning module: practical, lawful, defensive, and source-linked. */
import { useMemo, useState } from "react";
import {
  Binary,
  BookOpen,
  Database,
  FileKey2,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

const modules = [
  {
    icon: ShieldCheck,
    title: "Security foundations",
    summary: "Protect confidentiality, integrity, and availability with layered controls.",
    points: [
      "Use threat modelling to identify assets, actors, entry points, impact, and mitigations.",
      "Apply least privilege, strong authentication, secure defaults, patching, backups, and logging.",
      "Treat security as a lifecycle concern: design, build, test, deploy, monitor, respond, and learn.",
    ],
  },
  {
    icon: FileKey2,
    title: "Copyright & software licensing",
    summary: "Use software lawfully and respect the rights of creators and maintainers.",
    points: [
      "Software is generally protected by copyright; check the license before copying, modifying, or distributing it.",
      "Prefer official stores, vendor downloads, open-source licenses, and documented enterprise agreements.",
      "Do not use cracks, keygens, unauthorized copies, license bypasses, or piracy sources. Choose a legal alternative instead.",
    ],
  },
  {
    icon: Database,
    title: "Data protection",
    summary:
      "Collect less, explain why, restrict access, and protect data throughout its lifecycle.",
    points: [
      "Classify data, minimize collection, define a purpose, set retention rules, and delete what is no longer needed.",
      "Use encryption in transit and at rest, access reviews, audit logs, backups, and an incident-response plan.",
      "South African POPIA, GDPR, and other laws can differ by context; this module is general education, not legal advice.",
    ],
  },
  {
    icon: TriangleAlert,
    title: "Malware & computer viruses",
    summary: "Recognize malicious behavior and respond defensively without executing unknown code.",
    points: [
      "Malware includes viruses, worms, trojans, ransomware, spyware, and unwanted software; phishing is a common delivery route.",
      "Keep systems patched, use reputable security tools, verify downloads, use MFA, and maintain tested offline backups.",
      "If compromise is suspected: disconnect safely, preserve evidence, report through the approved channel, and use qualified incident-response help.",
    ],
  },
  {
    icon: GitBranch,
    title: "Software systems development",
    summary: "Move from a problem statement to a maintainable system with evidence at every stage.",
    points: [
      "Work through requirements, user journeys, architecture, data models, interfaces, implementation, testing, deployment, and monitoring.",
      "Prefer small, reversible changes with version control, code review, automated checks, and documented decisions.",
      "Design for accessibility, reliability, observability, privacy, security, and recovery—not just the happy path.",
    ],
  },
  {
    icon: BookOpen,
    title: "Data representation",
    summary: "Understand how systems encode numbers, text, images, and instructions.",
    points: [
      "A bit stores 0 or 1; eight bits form a byte. Larger values use agreed binary, hexadecimal, and decimal representations.",
      "Text depends on encodings such as Unicode; images are represented by pixels and colour channels; files add structure and metadata.",
      "Representation choices affect storage, transmission, interoperability, validation, and security boundaries.",
    ],
  },
];

function toEightBit(value: number) {
  return value.toString(2).padStart(8, "0");
}

export function SystemsLearning() {
  const [decimal, setDecimal] = useState("42");
  const numeric = Math.min(255, Math.max(0, Number.parseInt(decimal || "0", 10) || 0));
  const bits = toEightBit(numeric).split("");
  const powers = useMemo(() => [128, 64, 32, 16, 8, 4, 2, 1], []);

  return (
    <section className="mt-10 space-y-6" aria-labelledby="systems-heading">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-primary-foreground">
          <Binary className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Software systems
          </p>
          <h2 id="systems-heading" className="mt-1 text-2xl font-semibold sm:text-3xl">
            Build safely. Understand the signal.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            A practical learning layer for the AI project. It covers defensive security, lawful
            software use, data responsibility, systems thinking, and the foundations underneath
            digital tools.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map(({ icon: Icon, title, summary, points }) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-card p-5 shadow-panel"
          >
            <Icon className="size-5 text-primary" aria-hidden="true" />
            <h3 className="mt-3 text-base font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{summary}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/85">
              {points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="grid gap-6 rounded-2xl border border-border bg-card p-5 shadow-panel lg:grid-cols-[0.8fr_1.2fr] lg:p-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <LockKeyhole className="size-4 text-primary" /> Binary numbering lab
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Enter a whole number from 0 to 255 and see its 8-bit representation. The powers-of-two
            row shows how the value is assembled.
          </p>
          <label className="mt-4 block text-xs font-medium" htmlFor="decimal-value">
            Decimal value
          </label>
          <input
            id="decimal-value"
            type="number"
            min="0"
            max="255"
            value={decimal}
            onChange={(event) => setDecimal(event.target.value)}
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="rounded-xl bg-muted/50 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">8-bit output</p>
          <div className="mt-3 grid grid-cols-8 gap-2">
            {bits.map((bit, index) => (
              <div
                key={`${bit}-${index}`}
                className="rounded-lg border border-border bg-background p-2 text-center"
              >
                <strong className="font-mono text-lg">{bit}</strong>
                <span className="mt-1 block text-[10px] text-muted-foreground">
                  {powers[index]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-sm text-primary">
            {numeric}₁₀ = {bits.join("")}₂
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Binary uses powers of two. A 1 means that power is included; a 0 means it is not.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Learning boundary.</strong> This content supports
        lawful, defensive learning. It does not provide malware creation, credential theft, license
        bypass, evasion, unauthorized access, or instructions for harming systems. For legal
        decisions, consult a qualified professional and the applicable regulator or rights holder.
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-[0.14em] text-foreground">
          Official starting points
        </span>
        <a
          className="text-primary underline-offset-2 hover:underline"
          href="https://inforegulator.org.za/"
          target="_blank"
          rel="noreferrer"
        >
          Information Regulator
        </a>
        <a
          className="text-primary underline-offset-2 hover:underline"
          href="https://www.wipo.int/en/web/copyright/activities/software"
          target="_blank"
          rel="noreferrer"
        >
          WIPO software copyright
        </a>
        <a
          className="text-primary underline-offset-2 hover:underline"
          href="https://www.cisa.gov/topics/cyber-threats-and-advisories/malware-phishing-and-ransomware"
          target="_blank"
          rel="noreferrer"
        >
          CISA malware guidance
        </a>
      </div>
    </section>
  );
}
