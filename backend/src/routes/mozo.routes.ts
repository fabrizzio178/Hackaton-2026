import { Router } from 'express';
import { MozoController } from '../controllers/mozo.controller';

const router = Router();
const mozoController = new MozoController();

router.post('/', mozoController.createMozo);
router.get('/', mozoController.getMozos);
router.get('/:id', mozoController.getMozo);
router.put('/:id', mozoController.updateMozo);
router.delete('/:id', mozoController.deleteMozo);

export default router;
