/* Software Systems learning module: practical, lawful, defensive, and source-linked. */
import { useEffect, useMemo, useState } from "react";
import {
  Binary,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  Database,
  FileKey2,
  GitBranch,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  TriangleAlert,
  Trophy,
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

const quizQuestions = [
  {
    question: "Which control best reflects least privilege?",
    options: [
      "Give every user administrator access",
      "Give each user only the access needed for their task",
      "Disable audit logs",
      "Share one team password",
    ],
    answer: 1,
    explanation:
      "Least privilege limits access to what a person or process needs, reducing the impact of mistakes or compromise.",
  },
  {
    question: "What is the safest default when software comes from an unknown source?",
    options: [
      "Run it as administrator",
      "Disable security tools",
      "Do not execute it; verify the source first",
      "Share it with colleagues",
    ],
    answer: 2,
    explanation:
      "Verification, scanning, and trusted distribution channels reduce the chance of executing malicious or tampered code.",
  },
  {
    question: "What does data minimization mean?",
    options: [
      "Collect all possible data",
      "Collect only what is necessary for a stated purpose",
      "Keep data forever",
      "Avoid access controls",
    ],
    answer: 1,
    explanation:
      "Data minimization reduces privacy risk by limiting collection to what is necessary for a clear purpose.",
  },
  {
    question: "What is the binary representation of decimal 5 in four bits?",
    options: ["0011", "0101", "0110", "1001"],
    answer: 1,
    explanation: "5 is 4 + 1, so the 4 and 1 positions are active: 0101₂.",
  },
  {
    question: "What should a project use before redistributing third-party code?",
    options: [
      "A license check and attribution review",
      "A random filename",
      "A copied secret key",
      "A license bypass",
    ],
    answer: 0,
    explanation:
      "Review the license and required notices before copying, modifying, or distributing third-party code.",
  },
];

const PROGRESS_KEY = "systems-learning-progress-v1";

type Progress = { completed: number; bestScore: number; lastScore: number | null };

function toEightBit(value: number) {
  return value.toString(2).padStart(8, "0");
}

export function SystemsLearning() {
  const [decimal, setDecimal] = useState("42");
  const [progress, setProgress] = useState<Progress>({
    completed: 0,
    bestScore: 0,
    lastScore: null,
  });
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const numeric = Math.min(255, Math.max(0, Number.parseInt(decimal || "0", 10) || 0));
  const bits = toEightBit(numeric).split("");
  const powers = useMemo(() => [128, 64, 32, 16, 8, 4, 2, 1], []);
  const currentQuestion = quizQuestions[quizIndex];
  const isCorrect = selected === currentQuestion.answer;
  const progressPercent = Math.round((progress.completed / quizQuestions.length) * 100);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PROGRESS_KEY);
      if (saved) setProgress(JSON.parse(saved) as Progress);
    } catch {
      // Local progress is optional; the learning flow remains usable if storage is unavailable.
    }
  }, []);

  function persistProgress(next: Progress) {
    setProgress(next);
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch {
      // Keep the session usable when browser storage is blocked.
    }
  }

  function submitAnswer() {
    if (selected === null || submitted) return;
    setSubmitted(true);
    if (isCorrect) setScore((value) => value + 1);
  }

  function nextQuestion() {
    if (!submitted) return;
    const nextScore = score;
    if (quizIndex === quizQuestions.length - 1) {
      const finalScore = nextScore;
      const nextProgress = {
        completed: Math.min(quizQuestions.length, progress.completed + 1),
        bestScore: Math.max(progress.bestScore, finalScore),
        lastScore: finalScore,
      };
      persistProgress(nextProgress);
      setQuizIndex(0);
      setSelected(null);
      setSubmitted(false);
      setScore(0);
      return;
    }
    setQuizIndex((value) => value + 1);
    setSelected(null);
    setSubmitted(false);
  }

  function resetProgress() {
    persistProgress({ completed: 0, bestScore: 0, lastScore: null });
    setQuizIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
  }

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

      <section
        className="rounded-2xl border border-primary/30 bg-primary/5 p-5 shadow-panel lg:p-6"
        aria-labelledby="quiz-heading"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CircleHelp className="size-4 text-primary" /> Knowledge check
            </div>
            <h3 id="quiz-heading" className="mt-2 text-xl font-semibold">
              Five questions, one practical signal.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Progress is stored only in this browser. No quiz answers are sent to a server.
            </p>
          </div>
          <button
            type="button"
            onClick={resetProgress}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:border-primary"
          >
            <RotateCcw className="size-3.5" /> Reset progress
          </button>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_15rem]">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Question {quizIndex + 1} of {quizQuestions.length}
              </span>
              <span>{progressPercent}% completed</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-5 text-base font-semibold">{currentQuestion.question}</p>
            <div className="mt-4 grid gap-2">
              {currentQuestion.options.map((option, index) => {
                const optionState =
                  submitted && index === currentQuestion.answer
                    ? "border-emerald-500 bg-emerald-500/10"
                    : submitted && index === selected
                      ? "border-destructive bg-destructive/10"
                      : selected === index
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background";
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => !submitted && setSelected(index)}
                    className={`rounded-xl border p-3 text-left text-sm transition-colors ${optionState}`}
                    aria-pressed={selected === index}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div
                className={`mt-4 rounded-xl border p-3 text-sm ${isCorrect ? "border-emerald-500/50 bg-emerald-500/10" : "border-destructive/50 bg-destructive/10"}`}
                role="status"
              >
                <div className="flex items-center gap-2 font-semibold">
                  {isCorrect ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : (
                    <TriangleAlert className="size-4 text-destructive" />
                  )}
                  {isCorrect ? "Correct" : "Not quite"}
                </div>
                <p className="mt-1 text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}
            <button
              type="button"
              onClick={submitted ? nextQuestion : submitAnswer}
              disabled={selected === null}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitted ? "Next question" : "Check answer"}
            </button>
          </div>
          <aside className="rounded-xl border border-border bg-card p-4">
            <Trophy className="size-5 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
              Local progress
            </p>
            <p className="mt-1 text-3xl font-semibold">
              {progress.completed}
              <span className="text-base text-muted-foreground"> / {quizQuestions.length}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Completed rounds</p>
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">Best score</p>
              <p className="mt-1 font-mono text-lg text-primary">
                {progress.bestScore} / {quizQuestions.length}
              </p>
            </div>
            {progress.lastScore !== null && (
              <p className="mt-3 text-xs text-muted-foreground">
                Last score:{" "}
                <strong className="text-foreground">
                  {progress.lastScore} / {quizQuestions.length}
                </strong>
              </p>
            )}
          </aside>
        </div>
      </section>

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
