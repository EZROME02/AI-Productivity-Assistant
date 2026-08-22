/* Internet & World Wide Web quiz generator: source-grounded, practical, and safe-use focused. */
import { useMemo, useState } from "react";
import { CheckCircle2, Globe2, RefreshCw, ShieldCheck, TriangleAlert } from "lucide-react";

type Question = {
  topic: string;
  difficulty: "Starter" | "Core" | "Applied";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questionBank: Question[] = [
  {
    topic: "Connectivity",
    difficulty: "Starter",
    question: "What does an internet connection allow a device to do?",
    options: [
      "Exchange data with other connected systems",
      "Remove the need for a browser",
      "Guarantee every website is safe",
      "Turn every file into an image",
    ],
    answer: 0,
    explanation:
      "A connection allows systems to exchange data using agreed protocols; it does not guarantee safety or remove the need for applications.",
  },
  {
    topic: "Connectivity",
    difficulty: "Core",
    question: "In a client-server exchange, which system usually requests a resource?",
    options: ["The client", "The server only", "The DNS cache only", "The printer driver"],
    answer: 0,
    explanation:
      "The client typically requests a resource or service, and the server responds. Real systems can use more complex peer and distributed patterns.",
  },
  {
    topic: "TCP/IP",
    difficulty: "Core",
    question: "What is the main role of IP in the TCP/IP family?",
    options: [
      "Addressing and routing packets between networks",
      "Formatting a word-processing document",
      "Storing browser bookmarks",
      "Encrypting every website automatically",
    ],
    answer: 0,
    explanation:
      "IP provides addressing and routing. Other protocols and application-layer systems provide additional reliability, encryption, or content behavior.",
  },
  {
    topic: "TCP/IP",
    difficulty: "Applied",
    question: "Why is HTTPS preferred for web browsing?",
    options: [
      "It helps protect data in transit between browser and site",
      "It makes a site impossible to compromise",
      "It removes the need to verify downloads",
      "It hides the website from all network operators",
    ],
    answer: 0,
    explanation:
      "HTTPS uses TLS to help protect the connection in transit. It does not make a site or download automatically trustworthy.",
  },
  {
    topic: "URLs",
    difficulty: "Starter",
    question: "What is a URL?",
    options: [
      "An address that identifies a resource on a network",
      "A type of computer virus",
      "A browser password",
      "A spreadsheet formula",
    ],
    answer: 0,
    explanation:
      "A URL identifies where a resource can be found and how it should be accessed, such as through HTTPS.",
  },
  {
    topic: "URLs",
    difficulty: "Applied",
    question: "What should you check before opening a sign-in link received unexpectedly?",
    options: [
      "The domain, context, and whether the request is expected",
      "Only the colour of the button",
      "Whether it uses a short URL",
      "Whether the message demands immediate action",
    ],
    answer: 0,
    explanation:
      "Verify the domain and context using an independent route. Urgency, unfamiliar short links, and unexpected requests are warning signs.",
  },
  {
    topic: "Browsers",
    difficulty: "Starter",
    question: "What do Back and Forward buttons usually control?",
    options: [
      "Movement through the current browsing history",
      "The computer's binary settings",
      "The website's source code",
      "The email address book",
    ],
    answer: 0,
    explanation:
      "Back and Forward navigate through the browser's history for the current tab or window.",
  },
  {
    topic: "Browsers",
    difficulty: "Core",
    question: "What is a bookmark or favourite?",
    options: [
      "A saved shortcut to a web address",
      "A copy of a website's private database",
      "A replacement for a password manager",
      "A guarantee that a page is current",
    ],
    answer: 0,
    explanation:
      "A bookmark stores a shortcut to a URL. It does not authenticate you, copy private content, or guarantee that the page remains unchanged.",
  },
  {
    topic: "Search",
    difficulty: "Starter",
    question: "What is the purpose of a search engine?",
    options: [
      "To help find indexed information using queries",
      "To make every result authoritative",
      "To replace all browsers",
      "To bypass website permissions",
    ],
    answer: 0,
    explanation:
      "Search engines help discover indexed information. Users should evaluate sources, dates, authorship, and context rather than assume every result is authoritative.",
  },
  {
    topic: "Search",
    difficulty: "Applied",
    question: "What is a useful way to narrow a web search?",
    options: [
      "Add precise terms and use documented search operators",
      "Use only one vague word",
      "Open every result automatically",
      "Ignore the source and publication date",
    ],
    answer: 0,
    explanation:
      "Specific terms and documented operators can improve relevance. Always review the search engine's help for current syntax.",
  },
  {
    topic: "Downloads",
    difficulty: "Core",
    question: "What is a safer approach to downloading a file?",
    options: [
      "Use the official source, verify the file, and scan it before opening",
      "Disable security controls first",
      "Run it as administrator immediately",
      "Share it before checking it",
    ],
    answer: 0,
    explanation:
      "Trusted sources, verification, scanning, least privilege, and caution around unexpected files reduce risk. No single step is a guarantee.",
  },
  {
    topic: "Web safety",
    difficulty: "Applied",
    question: "What should you do with instructions found on an unknown webpage?",
    options: [
      "Treat them as untrusted content and verify independently",
      "Follow them because the page is online",
      "Paste secrets into the page",
      "Disable browser protections",
    ],
    answer: 0,
    explanation:
      "Web content can be misleading or malicious. Verify claims independently and never expose secrets or disable protections based only on page instructions.",
  },
];

const topics = ["All topics", ...Array.from(new Set(questionBank.map((item) => item.topic)))];
const difficulties = ["All levels", "Starter", "Core", "Applied"] as const;

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function InternetWebQuiz() {
  const [topic, setTopic] = useState("All topics");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All levels");
  const [count, setCount] = useState("5");
  const [quiz, setQuiz] = useState<Question[]>(() => shuffle(questionBank).slice(0, 5));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const available = useMemo(
    () =>
      questionBank.filter(
        (item) =>
          (topic === "All topics" || item.topic === topic) &&
          (difficulty === "All levels" || item.difficulty === difficulty),
      ),
    [topic, difficulty],
  );
  const current = quiz[index];
  const correct = selected === current?.answer;

  function generateQuiz() {
    const requested = Number(count);
    const size = Math.min(
      Math.max(Number.isFinite(requested) ? requested : 5, 3),
      Math.min(8, available.length),
    );
    setQuiz(shuffle(available).slice(0, size));
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
  }

  function submitAnswer() {
    if (selected === null || submitted) return;
    setSubmitted(true);
    if (correct) setScore((value) => value + 1);
  }

  function nextQuestion() {
    if (!submitted) return;
    if (index === quiz.length - 1) {
      setIndex(0);
      setSelected(null);
      setSubmitted(false);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setSubmitted(false);
  }

  if (!current)
    return (
      <section className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
        Choose a broader topic or level to generate a quiz.
      </section>
    );

  return (
    <section
      className="rounded-2xl border border-primary/30 bg-primary/5 p-5 shadow-panel lg:p-6"
      aria-labelledby="internet-quiz-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Globe2 className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Internet & World Wide Web
            </p>
            <h3 id="internet-quiz-heading" className="mt-1 text-xl font-semibold">
              Generate a fundamentals quiz.
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Choose a focus, generate a fresh question set, and learn from the explanation after
              each answer. Questions are drawn from the attached study brief.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" /> Safe-use learning
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <label className="text-xs font-medium">
          Topic
          <select
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            <option>All topics</option>
            {topics.slice(1).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium">
          Level
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as (typeof difficulties)[number])}
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            {difficulties.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium">
          Questions
          <select
            value={count}
            onChange={(event) => setCount(event.target.value)}
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          >
            {[3, 4, 5, 6, 7, 8].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {available.length} question{available.length === 1 ? "" : "s"} available for this filter.
        </p>
        <button
          type="button"
          onClick={generateQuiz}
          disabled={available.length < 3}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw className="size-4" /> Generate quiz
        </button>
      </div>
      <div className="mt-5 border-t border-border pt-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Question {index + 1} of {quiz.length}
          </span>
          <span>Current score: {score}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${((index + 1) / quiz.length) * 100}%` }}
          />
        </div>
        <p className="mt-5 text-base font-semibold">{current.question}</p>
        <div className="mt-4 grid gap-2">
          {current.options.map((option, optionIndex) => {
            const state =
              submitted && optionIndex === current.answer
                ? "border-emerald-500 bg-emerald-500/10"
                : submitted && optionIndex === selected
                  ? "border-destructive bg-destructive/10"
                  : selected === optionIndex
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background";
            return (
              <button
                key={option}
                type="button"
                onClick={() => !submitted && setSelected(optionIndex)}
                className={`rounded-xl border p-3 text-left text-sm transition-colors ${state}`}
                aria-pressed={selected === optionIndex}
              >
                {option}
              </button>
            );
          })}
        </div>
        {submitted && (
          <div
            className={`mt-4 rounded-xl border p-3 text-sm ${correct ? "border-emerald-500/50 bg-emerald-500/10" : "border-destructive/50 bg-destructive/10"}`}
            role="status"
          >
            <div className="flex items-center gap-2 font-semibold">
              {correct ? (
                <CheckCircle2 className="size-4 text-emerald-500" />
              ) : (
                <TriangleAlert className="size-4 text-destructive" />
              )}
              {correct ? "Correct" : "Review this one"}
            </div>
            <p className="mt-1 text-muted-foreground">{current.explanation}</p>
          </div>
        )}
        <button
          type="button"
          onClick={submitted ? nextQuestion : submitAnswer}
          disabled={selected === null}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitted
            ? index === quiz.length - 1
              ? "Restart quiz"
              : "Next question"
            : "Check answer"}
        </button>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Learning boundary: this module teaches lawful browsing, connectivity, search literacy, and
        defensive file handling. It does not teach unauthorized access, evasion, credential theft,
        malware, or bypassing website protections.
      </p>
    </section>
  );
}
