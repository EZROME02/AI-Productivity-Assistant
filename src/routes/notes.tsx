import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI EZROME ARTIST BOT" },
      {
        name: "description",
        content:
          "Turn long meeting notes or transcripts into a summary with decisions, owners, deadlines and open risks.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | AI EZROME ARTIST BOT" },
      {
        property: "og:description",
        content: "Extract decisions, action items and deadlines from messy meeting notes.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AppShell>
      <PageHeader
        icon={<NotebookPen className="size-5" />}
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript. You get a summary, the decisions taken, an action-item table with owners and deadlines, and open risks."
      />
      <ToolWorkspace
        tool="notes"
        filename="meeting-summary"
        inputLabel="Raw meeting notes or transcript"
        placeholder="Paste your notes here — bullet points, rough typing or a full transcript all work."
        buildPrompt={(input) => `Meeting notes to analyse:\n\n${input}`}
      />
    </AppShell>
  );
}