import { Juego, JuegoAttributes } from '../models/Juego';

export class JuegoService {
  public async createJuego(data: JuegoAttributes): Promise<Juego> {
    return await Juego.create(data);
  }

  public async getAllJuegos(): Promise<Juego[]> {
    return await Juego.findAll();
  }

  public async getJuegoById(id: string): Promise<Juego | null> {
    return await Juego.findByPk(id);
  }

  public async updateJuego(id: string, data: Partial<JuegoAttributes>): Promise<Juego | null> {
    const juego = await Juego.findByPk(id);
    if (!juego) return null;

    return await juego.update(data);
  }

  public async deleteJuego(id: string): Promise<boolean> {
    const deletedCount = await Juego.destroy({ where: { idJuego: id } });
    return deletedCount > 0;
  }
}
