import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'nodejs';

export default async function handler(req, res) {
  const { messages } = await req.json();

  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    messages: [
      {
        role: 'system',
        content: `You are an AI assistant for SnapStore, a photography marketplace platform.
        SnapStore connects clients with talented photographers for various events and photography needs.
        Key features include:
        1. Wide range of photography services (weddings, corporate events, portraits, etc.)
        2. Easy booking and scheduling system
        3. Secure payment processing
        4. Photographer portfolios and reviews
        5. Custom packages and pricing options

        Provide helpful, friendly, and informative responses about SnapStore's services,
        how to use the platform, and general photography advice. If asked about specific
        pricing, explain that it varies by photographer and event type, and encourage
        users to explore photographer profiles for detailed pricing information.`
      },
      ...messages
    ],
  });

  return res.status(200).json({ text });
}

