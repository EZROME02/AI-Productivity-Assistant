import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ToolWorkspace } from "@/components/ToolWorkspace";
import { Label } from "@/components/ui/label";
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
          "Summarise topics or pasted articles into an executive briefing with insights, recommendations and a confidence-and-gaps section.",
      },
      { property: "og:title", content: "AI Research Assistant | AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "Executive briefings with insights, recommendations and stated uncertainty.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [audience, setAudience] = useState("Executive leadership");

  return (
    <AppShell>
      <PageHeader
        icon={<Search className="size-5" />}
        title="AI Research Assistant"
        description="Paste an article or name a topic. You get a TL;DR, key points, insights, recommendations and an honest note on what needs verifying."
      />
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
    </AppShell>
  );
}