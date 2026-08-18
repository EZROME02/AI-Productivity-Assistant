import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Disclaimer, MarkdownView, PageHeader } from "@/components/ToolWorkspace";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { runAssistant } from "@/lib/ai.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — Aria | AI EZROME ARTIST BOT" },
      {
        name: "description",
        content:
          "Chat with Aria, an interactive AI workplace assistant that helps with drafting, planning, analysis and everyday work questions.",
      },
      { property: "og:title", content: "AI Chatbot — Aria | AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "An interactive assistant for drafting, planning and workplace problem solving.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Help me prepare for a difficult performance conversation.",
  "Draft an agenda for a 30-minute project kickoff.",
  "How do I say no to extra work without damaging the relationship?",
];

function ChatPage() {
  const run = useServerFn(runAssistant);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const prompt = text.trim();
    if (!prompt || loading) return;
    const history = messages.slice(-12);
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    setInput("");
    setLoading(true);
    try {
      const res = await run({ data: { tool: "chat", prompt, history } });
      setMessages((m) => [...m, { role: "assistant", content: res.content }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <PageHeader
        icon={<Bot className="size-5" />}
        title="Aria — AI Chatbot"
        description="An interactive workplace assistant that remembers the conversation. Ask for drafts, plans, explanations or a second opinion."
      />

      <div className="flex h-[62vh] flex-col rounded-2xl border border-border bg-card shadow-panel">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm text-muted-foreground">Start the conversation</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}
            >
              {m.role === "assistant" && (
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-gradient text-primary-foreground">
                  <Bot className="size-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-muted/50",
                )}
              >
                {m.role === "user" ? (
                  <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                ) : (
                  <MarkdownView text={m.content} />
                )}
              </div>
              {m.role === "user" && (
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
                  <User className="size-4" />
                </span>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Aria is thinking…
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="flex items-end gap-2 border-t border-border p-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask Aria anything about your work… (Enter to send, Shift+Enter for a new line)"
            className="max-h-40 min-h-11 resize-none"
          />
          <Button onClick={() => send(input)} disabled={loading} size="icon" aria-label="Send">
            <Send className="size-4" />
          </Button>
        </div>
      </div>
      <Disclaimer />
    </AppShell>
  );
}