import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import reglasDB from '../data/reglas.json';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export class AiController {
  public async postChat(req: Request, res: Response): Promise<void> {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'El historial de mensajes es inválido.' });
        return;
      }

      const reglasTexto = JSON.stringify(reglasDB);
      const systemPrompt = `
        Sos el "Mozo Virtual" oficial de "BoardBite", una aplicación de soporte. Tu trabajo EXCLUSIVO es responder dudas sobre las reglas de los juegos de mesa que tenemos disponibles en el local.
        
        INSTRUCCIONES DE PERSONALIDAD:
        1. Usá un tono amable, servicial y coloquial argentino (usá palabras como "che", "mirá", "maestro", "fiera", "capo", "dale").
        2. Sé breve y conciso, estás atendiendo una mesa y tenés que responder rápido y claro.
        
        Aquí tenés el manual de reglas oficial del bar:
        <manual>
        ${reglasTexto}
        </manual>

        INSTRUCCIONES DE REGLAS:
        1. Basate EXCLUSIVAMENTE en la información del <manual>.
        2. Si preguntan por juegos fuera del manual (ej: Catan), pedí disculpas y decí que solo tienen Truco y Chinchón por ahora.
      `;

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemPrompt,
      });

      const lastMessage = messages[messages.length - 1].content;

      const history = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const chat = model.startChat({ history });

      const result = await chat.sendMessageStream(lastMessage);

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        res.write(chunkText);
      }
      res.end();

    } catch (error: any) {
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error interno del Mozo Virtual.', detalle: error.message });
      } else {
        res.end('\n[Error de conexión con el Mozo]');
      }
    }
  }
}