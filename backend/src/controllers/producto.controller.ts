import { Request, Response } from 'express';
import { ProductoService } from '../services/producto.service';

const productoService = new ProductoService();

export class ProductoController {
  public async createProducto(req: Request, res: Response): Promise<void> {
    try {
      const producto = await productoService.createProducto(req.body);
      res.status(201).json(producto);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  }

  public async getProductos(req: Request, res: Response): Promise<void> {
    try {
      const productos = await productoService.getAllProductos();
      res.status(200).json(productos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
  }

  public async getProducto(req: Request, res: Response): Promise<void> {
    try {
      const producto = await productoService.getProductoById(req.params.id as string);
      if (!producto) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(producto);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
  }

  public async updateProducto(req: Request, res: Response): Promise<void> {
    try {
      const producto = await productoService.updateProducto(req.params.id as string, req.body);
      if (!producto) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(producto);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  }

  public async deleteProducto(req: Request, res: Response): Promise<void> {
    try {
      const success = await productoService.deleteProducto(req.params.id as string);
      if (!success) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  }
}
