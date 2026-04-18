import { Request, Response } from 'express';
import { JuegoService } from '../services/juego.service';

const juegoService = new JuegoService();

export class JuegoController {
  public async createJuego(req: Request, res: Response): Promise<void> {
    try {
      const juego = await juegoService.createJuego(req.body);
      res.status(201).json(juego);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al crear el juego', error: error.message });
    }
  }

  public async getJuegos(req: Request, res: Response): Promise<void> {
    try {
      const juegos = await juegoService.getAllJuegos();
      res.status(200).json(juegos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener los juegos', error: error.message });
    }
  }

  public async getJuego(req: Request, res: Response): Promise<void> {
    try {
      const juego = await juegoService.getJuegoById(req.params.id as string);
      if (!juego) {
        res.status(404).json({ message: 'Juego no encontrado' });
        return;
      }
      res.status(200).json(juego);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener el juego', error: error.message });
    }
  }

  public async updateJuego(req: Request, res: Response): Promise<void> {
    try {
      const juego = await juegoService.updateJuego(req.params.id as string, req.body);
      if (!juego) {
        res.status(404).json({ message: 'Juego no encontrado' });
        return;
      }
      res.status(200).json(juego);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al actualizar el juego', error: error.message });
    }
  }

  public async deleteJuego(req: Request, res: Response): Promise<void> {
    try {
      const success = await juegoService.deleteJuego(req.params.id as string);
      if (!success) {
        res.status(404).json({ message: 'Juego no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Juego eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar el juego', error: error.message });
    }
  }
}
