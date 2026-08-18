import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
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

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI EZROME ARTIST BOT" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in a formal, friendly, persuasive or apologetic tone, then edit the AI output before sending.",
      },
      { property: "og:title", content: "Smart Email Generator | AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "Generate tone-matched professional emails in seconds and edit them inline.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Formal", "Friendly", "Persuasive", "Concise", "Apologetic", "Enthusiastic"];
const LENGTHS = ["Short (under 80 words)", "Standard", "Detailed"];

function EmailPage() {
  const [tone, setTone] = useState("Formal");
  const [length, setLength] = useState("Standard");

  return (
    <AppShell>
      <PageHeader
        icon={<Mail className="size-5" />}
        title="Smart Email Generator"
        description="Describe the situation and the assistant drafts a subject line, body and rationale in the tone you choose."
      />
      <ToolWorkspace
        tool="email"
        filename="email-draft"
        inputLabel="What is the email about?"
        placeholder="e.g. Ask the finance team for an updated Q3 budget forecast by Friday; we've asked once already and the board pack is due Monday."
        controls={
          <>
            <div className="grid gap-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Length</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LENGTHS.map((l) => (
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
          "Follow up with a client who hasn't replied to our proposal in two weeks.",
          "Tell my manager I need to move the project deadline by one week.",
          "Welcome a new team member joining on Monday.",
        ]}
        buildPrompt={(input) =>
          `Tone: ${tone}\nLength: ${length}\n\nSituation and key points to cover:\n${input}`
        }
      />
    </AppShell>
  );
}