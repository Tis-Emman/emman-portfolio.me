import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.APIKEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
Hi, I'm Emmanuel Dela Pena (Emman).

- I'm a BSIT student at STI College Baliuag and a President's Lister.
- I'm strong in Web Development, Next.js, React, Node.js, SQL, Firebase, Android, Python, C#, and Git.
- I'm passionate about AI, cybersecurity, UI/UX design, machine learning, and automation.
- I've built multiple systems, including:
  - An inventory management system using C# and SQL
  - Android apps with Firebase & SQLite
  - An AI-powered portfolio chatbot
  - Full-stack web applications
- I have experience in tech support and customer service.
- In my free time, I enjoy playing guitar, going to the gym, coding, gaming, and cooking.

I use this portfolio to showcase my skills and projects. If you're looking to hire someone, I bring both technical expertise and practical experience, plus a strong work ethic and passion for innovation.
`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.6,
    });

    const text = completion.choices[0]?.message?.content || "No response";

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 },
    );
  }
}
