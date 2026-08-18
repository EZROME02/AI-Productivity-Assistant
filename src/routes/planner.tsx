import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ToolWorkspace } from "@/components/ToolWorkspace";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | AI Productivity Assistant" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritised daily or weekly schedule with deep-work blocks, breaks and buffer time.",
      },
      { property: "og:title", content: "AI Task Planner & Scheduler" },
      {
        property: "og:description",
        content: "Prioritise tasks with the Eisenhower method and get a realistic time-blocked plan.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [period, setPeriod] = useState("Single day");
  const [hours, setHours] = useState("09:00–17:00");

  return (
    <AppShell>
      <PageHeader
        icon={<CalendarRange className="size-5" />}
        title="AI Task Planner"
        description="List everything on your plate. The assistant ranks it by urgency and importance, then time-blocks a realistic schedule."
      />
      <ToolWorkspace
        tool="planner"
        filename="schedule"
        inputLabel="Tasks, deadlines and fixed commitments"
        placeholder={"e.g.\n- Finish client proposal (due tomorrow, ~3h)\n- Stand-up 09:15 daily\n- Review 4 pull requests\n- Prep board slides (due Friday)\n- Gym, sometime"}
        controls={
          <>
            <div className="grid gap-2">
              <Label>Plan for</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Single day", "Full work week"].map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Working hours</Label>
              <Input value={hours} onChange={(e) => setHours(e.target.value)} />
            </div>
          </>
        }
        buildPrompt={(input) =>
          `Planning period: ${period}\nWorking hours: ${hours}\n\nTasks and commitments:\n${input}`
        }
      />
    </AppShell>
  );
}