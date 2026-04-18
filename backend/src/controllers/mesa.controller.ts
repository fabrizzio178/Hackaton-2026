import { Request, Response } from 'express';
import { MesaService } from '../services/mesa.service';

const mesaService = new MesaService();

export class MesaController {
  public async createMesa(req: Request, res: Response): Promise<void> {
    try {
      const mesa = await mesaService.createMesa(req.body);
      res.status(201).json(mesa);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al crear la mesa', error: error.message });
    }
  }

  public async getMesas(req: Request, res: Response): Promise<void> {
    try {
      const mesas = await mesaService.getAllMesas();
      res.status(200).json(mesas);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener las mesas', error: error.message });
    }
  }

  public async getMesa(req: Request, res: Response): Promise<void> {
    try {
      const mesa = await mesaService.getMesaById(req.params.id as string);
      if (!mesa) {
        res.status(404).json({ message: 'Mesa no encontrada' });
        return;
      }
      res.status(200).json(mesa);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener la mesa', error: error.message });
    }
  }

  public async updateMesa(req: Request, res: Response): Promise<void> {
    try {
      const mesa = await mesaService.updateMesa(req.params.id as string, req.body);
      if (!mesa) {
        res.status(404).json({ message: 'Mesa no encontrada' });
        return;
      }
      res.status(200).json(mesa);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al actualizar la mesa', error: error.message });
    }
  }

  public async deleteMesa(req: Request, res: Response): Promise<void> {
    try {
      const success = await mesaService.deleteMesa(req.params.id as string);
      if (!success) {
        res.status(404).json({ message: 'Mesa no encontrada' });
        return;
      }
      res.status(200).json({ message: 'Mesa eliminada correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar la mesa', error: error.message });
    }
  }
}
