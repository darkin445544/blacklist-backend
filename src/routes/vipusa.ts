import { Router } from "express";
import VipusaController from "../controller/VipusaController";
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from "../middlewares/role";

const router = Router();

//New Vipusa
router.get('/', VipusaController.getAll);
router.post('/', VipusaController.newVipusa);

router.delete('/:id', [checkJwt], checkRole(['admin','sistemas']), VipusaController.deleteVipusa);


export default router;