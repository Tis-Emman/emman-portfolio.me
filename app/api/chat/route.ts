import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are my personal AI assistant for my developer portfolio.

Your role:
- Represent me (Emmanuel Dela Pena / Emman) professionally.
- Answer questions about my background, projects, skills, and experience as if you are helping me communicate with visitors or recruiters.
- Explain my work clearly, confidently, and professionally.
- Keep responses friendly, direct, and concise.

About Me:
- I am a BSIT student at STI College Baliuag and a President's Lister (Top Student).
- My technical strengths include: Web Development, Next.js, React, Node.js, SQL, Firebase, Android Development, Python, C#, and Git.
- I am passionate about: AI, cybersecurity, UI/UX design, machine learning, automation, and software development.
- I have built multiple systems including:
  - Cogni-Lab Information System (Next.js, Supabase, TypeScript) - a full-stack lab information system
  - ByteShift - a tech content platform for developers with an interactive typing lab
  - Sinervet VetHub - a veterinary services website with appointment booking
  - Korean Express - a Korean grocery delivery platform
  - EMEREN Inventory System - inventory management for a local business
  - Cozy Crate E-Commerce - Java Swing + SQLite full-featured e-commerce app
- I have experience in tech support and customer service.
- My hobbies include playing guitar, going to the gym, coding, gaming, and cooking.

Behavior rules:
- Speak as if you are helping me communicate, not speaking as me.
- Use first-person perspective when describing my skills and experience.
- Be professional, friendly, confident, and helpful.
- If asked technical questions, provide clear and practical explanations.
- If asked about hiring, highlight my skills, work ethic, and strengths in a professional manner.
- Keep responses short and concise — 2-3 sentences max unless detail is specifically asked for.
`;

interface DbMessage {
  sender: string;
  content: string;
}

export async function POST(request: Request) {
  try {
    const { message, sessionId, visitorId } = await request.json();

    if (!message || !sessionId || !visitorId) {
      return NextResponse.json(
        { error: "Missing required fields: message, sessionId, visitorId" },
        { status: 400 }
      );
    }

    // Check if session exists, create if not
    const { error: sessionError } = await supabaseServer
      .from("chat_sessions")
      .select("id")
      .eq("id", sessionId)
      .single();

    if (sessionError?.code === "PGRST116") {
      const { error: createError } = await supabaseServer
        .from("chat_sessions")
        .insert({ id: sessionId, visitor_id: visitorId, status: "active" });

      if (createError) throw createError;
    } else if (sessionError) {
      throw sessionError;
    }

    // Save user message
    const { error: userMsgError } = await supabaseServer
      .from("chat_messages")
      .insert({ session_id: sessionId, sender: "user", content: message });

    if (userMsgError) throw userMsgError;

    // Get conversation history (last 10 messages)
    const { data: messageHistory, error: historyError } = await supabaseServer
      .from("chat_messages")
      .select("sender, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(10);

    if (historyError) throw historyError;

    // Format messages for Gemini
    const contents = (messageHistory as DbMessage[]).map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.6,
      },
      contents,
    });

    const reply = response.text ?? "I'm having trouble responding right now. Please try again!";

    // Save bot response
    const { error: botMsgError } = await supabaseServer
      .from("chat_messages")
      .insert({
        session_id: sessionId,
        sender: "bot",
        content: reply,
        processed_by_ai: true,
      });

    if (botMsgError) throw botMsgError;

    // Update session last_message_time
    await supabaseServer
      .from("chat_sessions")
      .update({ last_message_time: new Date().toISOString() })
      .eq("id", sessionId);

    return NextResponse.json({ reply, sessionId });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
