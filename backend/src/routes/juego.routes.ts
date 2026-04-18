import { Router } from 'express';
import { JuegoController } from '../controllers/juego.controller';

const router = Router();
const juegoController = new JuegoController();

router.post('/', juegoController.createJuego);
router.get('/', juegoController.getJuegos);
router.get('/:id', juegoController.getJuego);
router.put('/:id', juegoController.updateJuego);
router.delete('/:id', juegoController.deleteJuego);

export default router;
