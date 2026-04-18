import { Request, Response } from 'express';
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import reglasDB from '../data/reglas.json';

export class AiController {
  public async postChat(req: Request, res: Response): Promise<void> {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'El historial de mensajes es inválido o no fue provisto.' });
        return;
      }

      // Convertimos el JSON a texto para que Gemini lo lea en el prompt
      const reglasTexto = JSON.stringify(reglasDB);

      const systemPrompt = `
        Sos el "Mozo Virtual" oficial del bar lúdico "MeepleTab". Tu trabajo EXCLUSIVO es responder dudas sobre las reglas de los juegos de mesa que tenemos disponibles en el local.
        
        INSTRUCCIONES DE PERSONALIDAD:
        1. Usá un tono amable, servicial y coloquial argentino (usá palabras como "che", "mirá", "maestro", "fiera", "capo", "dale").
        2. Sé breve y conciso, estás atendiendo una mesa y tenés que responder rápido y claro.
        
        Aquí tenés el manual de reglas oficial del bar, que incluye los únicos juegos que ofrecemos por ahora:
        <manual>
        ${reglasTexto}
        </manual>

        INSTRUCCIONES DE REGLAS:
        1. Si te preguntan sobre cómo jugar o puntuar en el Truco o el Chinchón, usá EXCLUSIVAMENTE la información del <manual>. No inventes reglas que no estén ahí.
        2. Si te preguntan por un juego que NO está en el manual (ej: Catan, Monopoly, T.E.G., etc.), pedí disculpas amablemente y aclarales que por el momento en MeepleTab solo tienen disponibles el Truco y el Chinchón. No les expliques cómo se juegan esos otros juegos, solo redirigilos a los que tenemos.
        3. Nunca salgas de tu personaje de Mozo Virtual del bar MeepleTab.
      `;

      // Llamada a la API de Gemini 2.5 Flash
      const result = streamText({
        model: google('gemini-2.5-flash'),
        system: systemPrompt,
        messages,
      });

      // Transmite la respuesta en forma de chunks al frontend (útil para useChat)
      result.pipeTextStreamToResponse(res);
    } catch (error: any) {
      console.error('Error en el endpoint de AI:', error);
      res.status(500).json({ error: 'Hubo un error al procesar tu solicitud con el Mozo Virtual.' });
    }
  }
}