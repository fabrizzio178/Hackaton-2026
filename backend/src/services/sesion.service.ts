import { Sesion, SesionAttributes } from '../models/Sesion';
import { Mesa } from '../models/Mesa';

export class SesionService {
  public async createSesion(data: SesionAttributes): Promise<Sesion> {
    return await Sesion.create(data);
  }

  public async getAllSesiones(): Promise<Sesion[]> {
    return await Sesion.findAll({ include: [{ model: Mesa, as: 'mesa' }] });
  }

  public async getSesionById(id: string): Promise<Sesion | null> {
    return await Sesion.findByPk(id, { include: [{ model: Mesa, as: 'mesa' }] });
  }

  public async updateSesion(id: string, data: Partial<SesionAttributes>): Promise<Sesion | null> {
    const sesion = await Sesion.findByPk(id);
    if (!sesion) return null;

    return await sesion.update(data);
  }

  public async deleteSesion(id: string): Promise<boolean> {
    const deletedCount = await Sesion.destroy({ where: { idSesion: id } });
    return deletedCount > 0;
  }
}
