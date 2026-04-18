import { Request, Response } from 'express';
import { MozoService } from '../services/mozo.service';

const mozoService = new MozoService();

export class MozoController {
  public async createMozo(req: Request, res: Response): Promise<void> {
    try {
      const mozo = await mozoService.createMozo(req.body);
      res.status(201).json(mozo);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al crear el mozo', error: error.message });
    }
  }

  public async getMozos(req: Request, res: Response): Promise<void> {
    try {
      const mozos = await mozoService.getAllMozos();
      res.status(200).json(mozos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener los mozos', error: error.message });
    }
  }

  public async getMozo(req: Request, res: Response): Promise<void> {
    try {
      const mozo = await mozoService.getMozoById(req.params.id as string);
      if (!mozo) {
        res.status(404).json({ message: 'Mozo no encontrado' });
        return;
      }
      res.status(200).json(mozo);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener el mozo', error: error.message });
    }
  }

  public async updateMozo(req: Request, res: Response): Promise<void> {
    try {
      const mozo = await mozoService.updateMozo(req.params.id as string, req.body);
      if (!mozo) {
        res.status(404).json({ message: 'Mozo no encontrado' });
        return;
      }
      res.status(200).json(mozo);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al actualizar el mozo', error: error.message });
    }
  }

  public async deleteMozo(req: Request, res: Response): Promise<void> {
    try {
      const success = await mozoService.deleteMozo(req.params.id as string);
      if (!success) {
        res.status(404).json({ message: 'Mozo no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Mozo eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar el mozo', error: error.message });
    }
  }
}
