// src/gemini/gemini.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import pRetry from 'p-retry';

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
  async generateText(prompt: string, opts?: { model?: string; maxOutputTokens?: number; temperature?: number; }) {
    const model = opts?.model || this.defaultModel;

    const doRequest = async () => {
      // Llamada principal al SDK: generateContent
      const response = await this.client.models.generateContent({
        model,
        contents: prompt,
        // parámetros opcionales (ajustá según docs)
        ...(opts?.maxOutputTokens ? { maxOutputTokens: opts.maxOutputTokens } : {}),
        ...(opts?.temperature ? { temperature: opts.temperature } : {}),
      });

      // El SDK devuelve distintas formas; response.text es lo usual (ver quickstart).
      // Manejar según la forma exacta del SDK/versión.
      return response?.text ?? (Array.isArray(response?.candidates) ? response.candidates.map(c => c.content).join('\n') : '');
    };

    // Reintentar 2 veces si falla por problemas transitorios
    return pRetry(() => doRequest(), { retries: 2 });
  }
}
