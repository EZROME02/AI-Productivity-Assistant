import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Loader2, RotateCcw, Sparkles, Download, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { runAssistant } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ToolId } from "@/lib/ai-prompts";

export function PageHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-primary-foreground">
        {icon}
      </span>
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function Disclaimer() {
  return (
    <p className="mt-8 rounded-xl border border-border bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">
      <strong className="text-foreground">Responsible AI notice.</strong> Responses are AI-generated
      and may be inaccurate, outdated or incomplete. Verify facts, figures and names before use, keep
      a human in the loop for any decision, and avoid entering confidential or personal data.
    </p>
  );
}

export function MarkdownView({ text }: { text: string }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_ol_li]:list-decimal [&_strong]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-2 [&_th]:text-left">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}

type Props = {
  tool: ToolId;
  inputLabel: string;
  placeholder: string;
  buildPrompt: (input: string) => string;
  controls?: ReactNode;
  examples?: string[];
  filename?: string;
};

export function ToolWorkspace({
  tool,
  inputLabel,
  placeholder,
  buildPrompt,
  controls,
  examples = [],
  filename = "ai-output",
}: Props) {
  const run = useServerFn(runAssistant);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!input.trim()) {
      toast.error("Add some details first so the assistant has context.");
      return;
    }
    setLoading(true);
    try {
      const res = await run({ data: { tool, prompt: buildPrompt(input) } });
      setOutput(res.content);
      setEditing(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-panel">
          <h2 className="text-sm font-semibold">{inputLabel}</h2>
          {controls && <div className="mt-4 grid gap-4 sm:grid-cols-2">{controls}</div>}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="mt-4 min-h-56 resize-y"
          />
          {examples.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setInput(ex)}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:bg-accent"
                >
                  {ex.length > 46 ? `${ex.slice(0, 46)}…` : ex}
                </button>
              ))}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Button onClick={generate} disabled={loading}>
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {loading ? "Generating…" : "Generate"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
            >
              <RotateCcw className="size-4" />
              Clear
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-panel">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold">AI output</h2>
            {output && (
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => setEditing((v) => !v)}>
                  <Pencil className="size-3.5" />
                  {editing ? "Preview" : "Edit"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy className="size-3.5" />
                  Copy
                </Button>
                <Button variant="ghost" size="sm" onClick={download}>
                  <Download className="size-3.5" />
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4">
            {loading && !output ? (
              <div className="space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-4 animate-pulse rounded bg-muted" />
                ))}
              </div>
            ) : output ? (
              editing ? (
                <Textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  className="min-h-96 resize-y font-mono text-xs"
                />
              ) : (
                <MarkdownView text={output} />
              )
            ) : (
              <p className="py-16 text-center text-sm text-muted-foreground">
                Your AI draft will appear here — fully editable before you use it.
              </p>
            )}
          </div>
        </section>
      </div>
      <Disclaimer />
    </>
  );
}