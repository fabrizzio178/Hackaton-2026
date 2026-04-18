import { Request, Response } from 'express';
import { SesionService } from '../services/sesion.service';

const sesionService = new SesionService();

export class SesionController {
  public async createSesion(req: Request, res: Response): Promise<void> {
    try {
      const sesion = await sesionService.createSesion(req.body);
      res.status(201).json(sesion);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al crear la sesión', error: error.message });
    }
  }

  public async getSesiones(req: Request, res: Response): Promise<void> {
    try {
      const sesiones = await sesionService.getAllSesiones();
      res.status(200).json(sesiones);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener las sesiones', error: error.message });
    }
  }

  public async getSesion(req: Request, res: Response): Promise<void> {
    try {
      const sesion = await sesionService.getSesionById(req.params.id as string);
      if (!sesion) {
        res.status(404).json({ message: 'Sesión no encontrada' });
        return;
      }
      res.status(200).json(sesion);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener la sesión', error: error.message });
    }
  }

  public async updateSesion(req: Request, res: Response): Promise<void> {
    try {
      const sesion = await sesionService.updateSesion(req.params.id as string, req.body);
      if (!sesion) {
        res.status(404).json({ message: 'Sesión no encontrada' });
        return;
      }
      res.status(200).json(sesion);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al actualizar la sesión', error: error.message });
    }
  }

  public async deleteSesion(req: Request, res: Response): Promise<void> {
    try {
      const success = await sesionService.deleteSesion(req.params.id as string);
      if (!success) {
        res.status(404).json({ message: 'Sesión no encontrada' });
        return;
      }
      res.status(200).json({ message: 'Sesión eliminada correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar la sesión', error: error.message });
    }
  }
}
