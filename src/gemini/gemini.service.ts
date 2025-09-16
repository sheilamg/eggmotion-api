import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_OUTPUT_STRUCTURE, GEMINI_SYSTEM_INSTRUCTION } from './utils/gemini-config';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private client: GoogleGenAI;
  private defaultModel: string;

  constructor() {
    // El SDK recoge GEMINI_API_KEY desde env automáticamente,
    // pero lo pasamos explícitamente para evitar sorpresas.
    this.client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    this.defaultModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  }

  /**
   * Genera texto desde Gemini (con reintentos suaves)
   */
  async generateText(prompt: string) {
    const model = this.defaultModel;

    const doRequest = async () => {
      const response = await this.client.models.generateContent({
        model,
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
          },
          systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
          responseSchema: GEMINI_OUTPUT_STRUCTURE
        },
      });

      // El SDK devuelve distintas formas; response.text es lo usual (ver quickstart).
      // Manejar según la forma exacta del SDK/versión.
      return response?.text ?? (Array.isArray(response?.candidates) ? response.candidates.map(c => c.content).join('\n') : '');
    };

    // Ejecutar una sola vez sin reintentos
    return doRequest();
  }
}
