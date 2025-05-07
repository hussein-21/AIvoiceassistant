import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { transcript } = await req.json();

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: 'You are a helpful voice assistant.' },
        { role: 'user', content: transcript },
      ],
    }),
  });

  const data = await groqRes.json();
  const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not understand.';

  const cartesiaRes = await fetch('https://api.cartesia.ai/speak', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CARTESIA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'cartesia-002',
      voice: 'nova',
      input: reply,
    }),
  });

  const audioArrayBuffer = await cartesiaRes.arrayBuffer();

  return new NextResponse(audioArrayBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'X-Reply': encodeURIComponent(reply),
    },
  });
}
