import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
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

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "Coach Academy | AI EZROME ARTIST BOT" },
      {
        name: "description",
        content:
          "Coach education for young teams: training plans, team improvement priorities, safeguarding and a step-by-step sponsorship and funding playbook.",
      },
      { property: "og:title", content: "Coach Academy | AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "Training plans, team development and sponsorship strategy for grassroots clubs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoachPage,
});

const AGES = ["U10", "U13", "U15", "U17", "U20", "Senior amateur", "Semi-pro"];
const GOALS = [
  "Overall team improvement",
  "Attacking & finishing",
  "Defensive organisation",
  "Fitness & conditioning",
  "Finding sponsors & funding",
  "Building a club brand",
];

function CoachPage() {
  const [age, setAge] = useState(AGES[2]!);
  const [goal, setGoal] = useState(GOALS[0]!);

  return (
    <AppShell>
      <PageHeader
        icon={<GraduationCap className="size-5" />}
        title="Coach Academy"
        description="Describe your team and situation. You get a diagnosis, a week of sessions, ranked improvement priorities and a practical sponsorship playbook."
      />
      <ToolWorkspace
        tool="coach"
        filename="coach-plan"
        inputLabel="Tell us about your team"
        placeholder={
          "e.g.\n- U15 township team, 18 players, 2 training sessions a week\n- Strong runners, poor build-up from the back\n- No sponsor, we pay for our own kit\n- Goal: win the district league and attract local business support"
        }
        controls={
          <>
            <div className="grid gap-2">
              <Label>Age group</Label>
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AGES.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Main goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GOALS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        }
        examples={[
          "How do we approach local businesses for our first sponsorship deal?",
          "Our U13s concede from every counter-attack — fix our shape.",
        ]}
        buildPrompt={(input) => `Age group: ${age}\nMain goal: ${goal}\n\nTeam situation:\n${input}`}
      />
    </AppShell>
  );
}
