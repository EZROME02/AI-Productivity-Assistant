import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SYSTEM_PROMPTS, type ToolId } from "./ai-prompts";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const InputSchema = z.object({
  tool: z.enum(["email", "notes", "planner", "research", "chat", "football", "coach", "player"]),
  prompt: z.string().min(1).max(20000),
  history: z.array(MessageSchema).max(30).optional(),
});

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this app.");

    const messages = [
      { role: "system", content: SYSTEM_PROMPTS[data.tool as ToolId] },
      ...(data.history ?? []),
      { role: "user", content: data.prompt },
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({ model: "google/gemini-3.7-flash", messages }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429)
        throw new Error("Too many requests right now — please wait a moment and try again.");
      if (res.status === 402)
        throw new Error("AI credits are exhausted for this workspace. Please add credits to continue.");
      throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error("The assistant returned an empty response. Try rephrasing.");
    return { content };
  });