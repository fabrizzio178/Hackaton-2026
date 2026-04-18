import { DetalleMesa, DetalleMesaAttributes } from '../models/DetalleMesa';
import { Sesion } from '../models/Sesion';
import { Producto } from '../models/Producto';

export class DetalleMesaService {
  public async createDetalleMesa(data: DetalleMesaAttributes): Promise<DetalleMesa> {
    return await DetalleMesa.create(data);
  }

  public async getAllDetallesMesa(): Promise<DetalleMesa[]> {
    return await DetalleMesa.findAll({ include: [{ model: Sesion, as: 'sesion' }, { model: Producto, as: 'producto' }] });
  }

  public async getDetalleMesaById(id: string): Promise<DetalleMesa | null> {
    return await DetalleMesa.findByPk(id, { include: [{ model: Sesion, as: 'sesion' }, { model: Producto, as: 'producto' }] });
  }

  public async updateDetalleMesa(id: string, data: Partial<DetalleMesaAttributes>): Promise<DetalleMesa | null> {
    const detalle = await DetalleMesa.findByPk(id);
    if (!detalle) return null;

    return await detalle.update(data);
  }

  public async deleteDetalleMesa(id: string): Promise<boolean> {
    const deletedCount = await DetalleMesa.destroy({ where: { idItem: id } });
    return deletedCount > 0;
  }
}
