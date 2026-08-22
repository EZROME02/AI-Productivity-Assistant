/* Research route: pasted-text analysis plus optional live web search with cited sources. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ToolWorkspace, MarkdownView } from "@/components/ToolWorkspace";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { runWebResearch } from "@/lib/ai.functions";
import { useServerFn } from "@tanstack/react-start";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | AI EZROME ARTIST BOT" },
      {
        name: "description",
        content:
          "Search the web when configured or summarize supplied material into a cited, reviewable briefing.",
      },
      { property: "og:title", content: "AI Research Assistant | AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "Web-grounded briefings with sources and stated uncertainty.",
      },
    ],
  }),
  component: ResearchPage,
});

function LiveWebResearch() {
  const search = useServerFn(runWebResearch);
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState("Students and working professionals");
  const [output, setOutput] = useState("");
  const [sources, setSources] = useState<Array<{ title?: string; url?: string }>>([]);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!query.trim()) {
      toast.error("Add a web-search question first.");
      return;
    }
    setLoading(true);
    try {
      const result = await search({ data: { query, audience } });
      setOutput(result.content);
      setSources(result.sources ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Live search is unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5 shadow-panel">
      <div className="flex items-start gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Search className="size-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold">Live worldwide web search</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Searches run server-side through a configured provider, then the AI produces a cited
            briefing. Retrieved pages are treated as untrusted reference material, not instructions.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_14rem_auto] lg:items-end">
        <div>
          <Label htmlFor="web-query">Question</Label>
          <Textarea
            id="web-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. What are the current official recommendations for protecting personal information in South Africa?"
            className="mt-2 min-h-24"
          />
        </div>
        <div>
          <Label>Audience</Label>
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                "Students and working professionals",
                "Technical team",
                "Recruiter or manager",
                "General reader",
              ].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={submit} disabled={loading} className="lg:mb-0">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          {loading ? "Searching…" : "Search and brief"}
        </Button>
      </div>
      {output && (
        <div className="mt-6 rounded-xl border border-border bg-card p-4">
          <MarkdownView text={output} />
        </div>
      )}
      {sources.length > 0 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-primary underline-offset-2 hover:underline"
            >
              <ExternalLink className="size-3.5 shrink-0" />
              {source.title}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        If this panel reports that search is not configured, add a server-only{" "}
        <code className="rounded bg-muted px-1">TAVILY_API_KEY</code>. Never place that key in
        browser code.
      </p>
    </section>
  );
}

function ResearchPage() {
  const [audience, setAudience] = useState("Executive leadership");
  return (
    <AppShell>
      <PageHeader
        icon={<Search className="size-5" />}
        title="AI Research Assistant"
        description="Paste an article or name a topic. You get a TL;DR, key points, insights, recommendations and an honest note on what needs verifying."
      />
      <LiveWebResearch />
      <ToolWorkspace
        tool="research"
        filename="research-brief"
        inputLabel="Topic or article text"
        placeholder="e.g. 'How are mid-sized companies adopting AI agents for customer support?' — or paste a full article to summarise."
        controls={
          <div className="grid gap-2 sm:col-span-2">
            <Label>Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Executive leadership",
                  "Technical team",
                  "Sales & marketing",
                  "Students / general",
                ].map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
        examples={[
          "Benefits and risks of a four-day work week for a 200-person company.",
          "What is retrieval-augmented generation and when should a business use it?",
        ]}
        buildPrompt={(input) => `Target audience: ${audience}\n\nTopic or source text:\n${input}`}
      />
      <p className="mt-4 text-xs text-muted-foreground">
        Need an official source? Start with the regulator, standards body, vendor, or rights holder
        rather than relying on a single secondary result.{" "}
        <Link to="/systems" className="text-primary underline">
          Open Systems Learning
        </Link>
        .
      </p>
    </AppShell>
  );
}
