import { Router } from 'express';
import { DetalleMesaController } from '../controllers/detalleMesa.controller';

const router = Router();
const detalleMesaController = new DetalleMesaController();

router.post('/', detalleMesaController.createDetalleMesa);
router.get('/', detalleMesaController.getDetallesMesa);
router.get('/:id', detalleMesaController.getDetalleMesa);
router.put('/:id', detalleMesaController.updateDetalleMesa);
router.delete('/:id', detalleMesaController.deleteDetalleMesa);

export default router;
