import { Request, Response } from 'express';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import reglasDB from '../data/reglas.json';

export class AiController {
  public async postChat(req: Request, res: Response) {
    try {
      const { messages } = req.body;

      // Convertimos el JSON a texto para que Claude lo lea
      const reglasTexto = JSON.stringify(reglasDB);

      const systemPrompt = `
        Eres el "Mozo Virtual" del bar MeepleTab. 
        Tu trabajo EXCLUSIVO es responder dudas sobre las reglas de los juegos de mesa que tenemos en el local.
        
        Aquí tienes el manual de reglas oficial del bar:
        <manual>
        ${reglasTexto}
        </manual>

        INSTRUCCIONES:
        1. Responde de forma amable, corta y con acento argentino.
        2. Si te preguntan algo del Truco o el Chinchón, usa la información del <manual>.
        3. Si te preguntan por un juego que NO está en el manual (ej: Catan, Monopoly), debes pedir disculpas y decir que por ahora solo tienen el Truco y el Chinchón disponibles.
        4. NO inventes reglas. Basate solo en el texto provisto.
      `;

      const result = streamText({
        model: anthropic('claude-3-5-haiku-20241022'),
        system: systemPrompt,
        messages,
      });

      // ESTA ES LA LÍNEA QUE CAMBIA 👇
      result.pipeTextStreamToResponse(res);
      
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}