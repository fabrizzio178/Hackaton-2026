import { Mesa, MesaAttributes } from '../models/Mesa';

export class MesaService {
  public async createMesa(data: MesaAttributes): Promise<Mesa> {
    return await Mesa.create(data);
  }

  public async getAllMesas(): Promise<Mesa[]> {
    return await Mesa.findAll();
  }

  public async getMesaById(id: string): Promise<Mesa | null> {
    return await Mesa.findByPk(id);
  }

  public async updateMesa(id: string, data: Partial<MesaAttributes>): Promise<Mesa | null> {
    const mesa = await Mesa.findByPk(id);
    if (!mesa) return null;

    return await mesa.update(data);
  }

  public async deleteMesa(id: string): Promise<boolean> {
    const deletedCount = await Mesa.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
