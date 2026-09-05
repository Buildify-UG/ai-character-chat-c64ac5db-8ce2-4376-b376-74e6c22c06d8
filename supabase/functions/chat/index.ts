import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
};

interface ChatRequest {
  messages: Array<{ role: string; content: string }>;
  character: {
    name: string;
    systemPrompt: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages, character }: ChatRequest = await req.json();

    // Use OpenRouter free tier or Hugging Face Inference API
    // For demo, we'll use a simulated response
    const systemMessage = character.systemPrompt;
    const userMessages = messages.map((m) => `${m.role}: ${m.content}`).join("\n");

    // Simulated response - replace with actual API call
    const response = `*${character.name} thoughtfully considers your words* That's a fascinating perspective. I find myself drawn to explore this further with you. What else would you like to know?`;

    return new Response(
      JSON.stringify({
        content: response,
        role: "assistant",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
