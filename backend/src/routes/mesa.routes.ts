import { Router } from 'express';
import { MesaController } from '../controllers/mesa.controller';

const router = Router();
const mesaController = new MesaController();

router.post('/', mesaController.createMesa);
router.get('/', mesaController.getMesas);
router.get('/:id', mesaController.getMesa);
router.put('/:id', mesaController.updateMesa);
router.delete('/:id', mesaController.deleteMesa);

export default router;
