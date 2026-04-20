import { Producto, ProductoAttributes } from '../models/Producto';
import { Juego } from '../models/Juego';
import { Categoria } from '../models/Categoria';

export class ProductoService {
  public async createProducto(data: ProductoAttributes): Promise<Producto> {
    return await Producto.create(data);
  }

  public async getAllProductos(): Promise<Producto[]> {
    return await Producto.findAll({ include: [{ model: Juego, as: 'juego' }, { model: Categoria, as: 'categoria' }] });
  }

  public async getProductoById(id: string): Promise<Producto | null> {
    return await Producto.findByPk(id, { include: [{ model: Juego, as: 'juego' }, { model: Categoria, as: 'categoria' }] });
  }

  public async updateProducto(id: string, data: Partial<ProductoAttributes>): Promise<Producto | null> {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;

    return await producto.update(data);
  }

  public async deleteProducto(id: string): Promise<boolean> {
    const deletedCount = await Producto.destroy({ where: { idProducto: id } });
    return deletedCount > 0;
  }
}
