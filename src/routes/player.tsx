import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
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

export const Route = createFileRoute("/player")({
  head: () => ({
    meta: [
      { title: "Player Lab | AI EZROME ARTIST BOT" },
      {
        name: "description",
        content:
          "Football performance analysis for players: strengths and weaknesses, a measurable development plan, match intelligence and career, trial and sponsorship pathways.",
      },
      { property: "og:title", content: "Player Lab | AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "Performance analysis, development plans and career pathways for footballers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlayerPage,
});

const POSITIONS = [
  "Goalkeeper",
  "Full-back",
  "Centre-back",
  "Defensive midfielder",
  "Attacking midfielder",
  "Winger",
  "Striker",
];
const LEVELS = ["Grassroots", "School / college", "Academy", "Semi-pro", "Professional"];

function PlayerPage() {
  const [position, setPosition] = useState(POSITIONS[6]!);
  const [level, setLevel] = useState(LEVELS[0]!);

  return (
    <AppShell>
      <PageHeader
        icon={<Star className="size-5" />}
        title="Player Lab"
        description="Paste your match stats, coach feedback or a self-assessment. You get an honest performance analysis, a measurable development plan and career guidance."
      />
      <ToolWorkspace
        tool="player"
        filename="player-plan"
        inputLabel="Your game, stats and goals"
        placeholder={
          "e.g.\n- 17, right-footed striker, 9 goals in 14 games\n- Strong in the air, weak with my left foot\n- Coach says I drift out of games\n- Goal: get a trial at an academy next season"
        }
        controls={
          <>
            <div className="grid gap-2">
              <Label>Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        }
        examples={[
          "How do I get scouted from grassroots football?",
          "Build me a 6-week plan to improve my weak foot and decision making.",
        ]}
        buildPrompt={(input) => `Position: ${position}\nLevel: ${level}\n\nPlayer details:\n${input}`}
      />
    </AppShell>
  );
}
