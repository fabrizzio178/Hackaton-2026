import { Router } from 'express';
import { SesionController } from '../controllers/sesion.controller';

const router = Router();
const sesionController = new SesionController();

router.post('/', sesionController.createSesion);
router.get('/', sesionController.getSesiones);
router.get('/:id', sesionController.getSesion);
router.put('/:id', sesionController.updateSesion);
router.delete('/:id', sesionController.deleteSesion);

export default router;
