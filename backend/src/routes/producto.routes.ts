import { Router } from 'express';
import { ProductoController } from '../controllers/producto.controller';

const router = Router();
const productoController = new ProductoController();

router.post('/', productoController.createProducto);
router.get('/', productoController.getProductos);
router.get('/:id', productoController.getProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

export default router;
