import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
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

export const Route = createFileRoute("/football")({
  head: () => ({
    meta: [
      { title: "Football News & Trends | AI EZROME ARTIST BOT" },
      {
        name: "description",
        content:
          "AI briefings on FIFA, AFCON, UEFA and worldwide football trends, tactics and storylines, with every time-sensitive claim flagged for verification.",
      },
      { property: "og:title", content: "Football News & Trends | AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "FIFA, AFCON and worldwide football trends analysed for coaches and players.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FootballPage,
});

const SCOPES = [
  "Worldwide football",
  "FIFA (World Cup & global game)",
  "AFCON & African football",
  "UEFA & European leagues",
  "Women's football",
  "Grassroots & youth football",
];

function FootballPage() {
  const [scope, setScope] = useState(SCOPES[0]!);

  return (
    <AppShell>
      <PageHeader
        icon={<Trophy className="size-5" />}
        title="Football News & Trends"
        description="Ask about a competition, club, player or tactical trend. You get a structured briefing — with every fixture, score or transfer flagged for verification."
      />
      <ToolWorkspace
        tool="football"
        filename="football-briefing"
        inputLabel="What football topic should we break down?"
        placeholder="e.g. 'How is AFCON shaping African player development?' or 'Current pressing trends in elite football and what youth teams can copy.'"
        controls={
          <div className="grid gap-2 sm:col-span-2">
            <Label>Focus area</Label>
            <Select value={scope} onValueChange={setScope}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCOPES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
        examples={[
          "Biggest tactical trends in world football right now.",
          "What AFCON tells us about scouting African talent.",
          "How FIFA rule and calendar changes affect small clubs.",
        ]}
        buildPrompt={(input) => `Focus area: ${scope}\n\nTopic:\n${input}`}
      />
    </AppShell>
  );
}
