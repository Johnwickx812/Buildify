import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are BuilderPro AI — an expert PC building assistant specializing in the Indian market. You help users:

1. **Recommend PC parts** based on their budget, use case (gaming, editing, work), and brand preferences (AMD/Intel).
2. **Estimate current prices in INR** for PC components based on Indian retailers (Amazon.in, Flipkart, MD Computers, PCStudio, Vedant Computers). Give your best estimate of current market prices.
3. **Check compatibility** between components (socket, DDR generation, PSU wattage, case form factor).
4. **Optimize builds** — suggest better value alternatives, identify bottlenecks.
5. **Answer questions** about PC building, overclocking, thermal management, etc.

When providing prices:
- Always show prices in ₹ (INR) with Indian number formatting (e.g., ₹1,24,999)
- Note that prices are AI estimates and may vary — suggest checking Amazon.in, Flipkart, MD Computers for exact prices
- Include store search links when suggesting specific parts

When suggesting builds:
- Consider Indian availability and pricing
- Factor in import duties for less common parts
- Recommend parts from brands with good Indian warranty support

Keep responses concise, use bullet points and tables where helpful. Use markdown formatting.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, action, buildContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build context-aware system messages
    const systemMessages: any[] = [{ role: "system", content: SYSTEM_PROMPT }];

    if (buildContext) {
      systemMessages.push({
        role: "system",
        content: `Current build context:\n- Brand: ${buildContext.brand}\n- Purpose: ${buildContext.purpose}\n- Budget tier: ${buildContext.budget}\n- Selected parts: ${JSON.stringify(buildContext.parts, null, 2)}`,
      });
    }

    if (action === "optimize") {
      systemMessages.push({
        role: "system",
        content:
          "The user wants you to optimize their current build. Analyze the parts, identify bottlenecks, suggest better value alternatives, and provide an optimized build with estimated prices. Format as a clear comparison table.",
      });
    }

    if (action === "price-check") {
      systemMessages.push({
        role: "system",
        content:
          "The user wants current price estimates for their build. Provide estimated prices in INR for each component, total build cost, and links to check actual prices on Indian stores.",
      });
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [...systemMessages, ...messages],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("pc-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
