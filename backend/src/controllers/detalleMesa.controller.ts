import { Request, Response } from 'express';
import { DetalleMesaService } from '../services/detalleMesa.service';

const detalleMesaService = new DetalleMesaService();

export class DetalleMesaController {
  public async createDetalleMesa(req: Request, res: Response): Promise<void> {
    try {
      const detalle = await detalleMesaService.createDetalleMesa(req.body);
      res.status(201).json(detalle);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al crear el detalle de mesa', error: error.message });
    }
  }

  public async getDetallesMesa(req: Request, res: Response): Promise<void> {
    try {
      const detalles = await detalleMesaService.getAllDetallesMesa();
      res.status(200).json(detalles);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener los detalles de mesa', error: error.message });
    }
  }

  public async getDetalleMesa(req: Request, res: Response): Promise<void> {
    try {
      const detalle = await detalleMesaService.getDetalleMesaById(req.params.id as string);
      if (!detalle) {
        res.status(404).json({ message: 'Detalle de mesa no encontrado' });
        return;
      }
      res.status(200).json(detalle);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener el detalle de mesa', error: error.message });
    }
  }

  public async updateDetalleMesa(req: Request, res: Response): Promise<void> {
    try {
      const detalle = await detalleMesaService.updateDetalleMesa(req.params.id as string, req.body);
      if (!detalle) {
        res.status(404).json({ message: 'Detalle de mesa no encontrado' });
        return;
      }
      res.status(200).json(detalle);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al actualizar el detalle de mesa', error: error.message });
    }
  }

  public async deleteDetalleMesa(req: Request, res: Response): Promise<void> {
    try {
      const success = await detalleMesaService.deleteDetalleMesa(req.params.id as string);
      if (!success) {
        res.status(404).json({ message: 'Detalle de mesa no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Detalle de mesa eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar el detalle de mesa', error: error.message });
    }
  }
}
