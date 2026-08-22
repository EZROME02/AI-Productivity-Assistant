/* Software Systems route: defensive learning, lawful software use, and binary/data foundations. */
import { createFileRoute } from "@tanstack/react-router";
import { Binary } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Disclaimer } from "@/components/ToolWorkspace";
import { InternetWebQuiz } from "@/components/InternetWebQuiz";
import { SystemsLearning } from "@/components/SystemsLearning";

export const Route = createFileRoute("/systems")({
  head: () => ({
    meta: [
      { title: "Software Systems Learning | AI EZROME ARTIST BOT" },
      {
        name: "description",
        content:
          "Defensive software systems, data representation, binary numbering, copyright, and data-protection learning.",
      },
    ],
  }),
  component: SystemsPage,
});

function SystemsPage() {
  return (
    <AppShell>
      <PageHeader
        icon={<Binary className="size-5" />}
        title="Software Systems Learning"
        description="Understand the foundations beneath digital tools and build with security, lawful software use, privacy, and operational discipline in mind."
      />
      <SystemsLearning />
      <InternetWebQuiz />
      <Disclaimer />
    </AppShell>
  );
}
