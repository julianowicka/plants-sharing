import { NextRequest } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { db } from '@/app/db';

// Initialize OpenAI (you'll need to set OPENAI_API_KEY in your environment)
const openaiClient = openai({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key-for-development',
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Get plant data from database to provide context
    const plants = await db.plant.findMany({
      select: {
        name: true,
        description: true,
        wateringInterval: true,
        lightExposure: true,
        soilType: true,
        difficulty: true,
      }
    });

    // Create context about available plants
    const plantContext = plants.map(plant => 
      `${plant.name}: ${plant.description}. Podlewanie co ${plant.wateringInterval} dni, ${plant.lightExposure}, ${plant.soilType}, trudność ${plant.difficulty}/5`
    ).join('\n');

    const systemPrompt = `Jesteś ekspertem w dziedzinie pielęgnacji roślin i asystentem AI dla aplikacji Plant Discovery. 
    
    Twoja wiedza obejmuje:
    - Identyfikację roślin i ich potrzeb
    - Diagnozowanie problemów zdrowotnych roślin
    - Porady dotyczące podlewania, nawożenia, przesadzania
    - Zapobieganie chorobom i szkodnikom
    - Optymalne warunki uprawy różnych gatunków

    Dostępne rośliny w katalogu:
    ${plantContext}

    Zasady:
    1. Odpowiadaj w języku polskim
    2. Bądź pomocny, ale zawsze zaznacz, że to tylko sugestie
    3. W przypadku poważnych problemów zalecaj konsultację z ekspertem
    4. Używaj praktycznych, konkretnych porad
    5. Jeśli nie znasz odpowiedzi, szczerze to przyznaj
    6. Zachowuj przyjazny, profesjonalny ton

    Odpowiadaj na pytania użytkowników dotyczące pielęgnacji roślin.`;

    const result = await streamText({
      model: openaiClient('gpt-3.5-turbo'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response if OpenAI is not available
    return new Response(
      JSON.stringify({
        error: 'Asystent AI jest tymczasowo niedostępny. Spróbuj ponownie później.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}



