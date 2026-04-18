import { Mozo, MozoAttributes } from '../models/Mozo';

export class MozoService {
  public async createMozo(data: MozoAttributes): Promise<Mozo> {
    return await Mozo.create(data);
  }

  public async getAllMozos(): Promise<Mozo[]> {
    return await Mozo.findAll();
  }

  public async getMozoById(id: string): Promise<Mozo | null> {
    return await Mozo.findByPk(id);
  }

  public async updateMozo(id: string, data: Partial<MozoAttributes>): Promise<Mozo | null> {
    const mozo = await Mozo.findByPk(id);
    if (!mozo) return null;

    return await mozo.update(data);
  }

  public async deleteMozo(id: string): Promise<boolean> {
    const deletedCount = await Mozo.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
