import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GenerateTextDto } from './dto/generate-text.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate')
  async generate(@Body() body: GenerateTextDto) {
    const { prompt } = body;
    if (!prompt) {
      throw new HttpException('prompt is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const text = await this.geminiService.generateText(prompt);
      return { text };
    } catch (err) {
      // logger y error friendly
      console.error('Gemini generate error', err);
      throw new HttpException('Error generating text', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Ejemplo: endpoint específico para analizar una entrada emocional
  @Post('analyze-emotion')
  async analyzeEmotion(@Body() body: { text: string }) {
    const { text } = body;
    if (!text) throw new HttpException('text is required', HttpStatus.BAD_REQUEST);

    const prompt = `Analiza este texto y devuelve: 1) emoción principal (una palabra), 2) intensidad en escala 1-5, 3) una sugerencia breve para mejorar el estado emocional. Responde en JSON con las claves: emotion, intensity, suggestion. Texto: "${text}"`;

    try {
      const raw = await this.geminiService.generateText(prompt);
      // Intentamos parsear JSON si Gemini devuelve JSON (prompt lo solicita)
      try {
        const parsed = JSON.parse(raw);
        return { modelResponse: parsed };
      } catch (parseErr) {
        // si no es JSON, devolver texto bruto
        return { modelResponse: raw, warning: 'No JSON parseable response' };
      }
    } catch (err) {
      console.error(err);
      throw new HttpException('Error analyzing emotion', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
