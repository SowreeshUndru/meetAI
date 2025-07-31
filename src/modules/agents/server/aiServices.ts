// aiRouter.ts
import { createTRPCRouter } from '@/trpc/init';
import OpenAI from 'openai';
import { protectedProcedure } from '@/trpc/init';
import {z} from "zod"


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const aiRouter = createTRPCRouter({
  vocabSuggestions: protectedProcedure
    .input(z.object({ transcripts: z.array(z.string()) }))
    .query(async ({ input }) => {
      const prompt = `
        Analyze these conversation snippets and suggest vocabulary improvements:
        ${input.transcripts.join('\n')}
        
        For each suggestion, provide:
        1. Original word/phrase
        2. Improved alternative
        3. Brief explanation
        
        Format as JSON: { suggestions: { word: string, suggestion: string, explanation: string }[] }
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }]
      });

      return JSON.parse(response.choices[0].message.content || '{}').suggestions;
    })
});