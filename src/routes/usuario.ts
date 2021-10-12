import { Router } from "express";
import UsuarioController from "../controller/UsuarioController";
import { checkJwt } from '../middlewares/jwt';
import { checkRole } from "../middlewares/role";

const router = Router();

// Get all usuarios

router.get('/', [checkJwt, checkRole(['admin' ,'editor'])], UsuarioController.getAll);

// Get one usuario

router.get('/:id', [checkJwt, checkRole(['admin' ,'editor'])], UsuarioController.getById);

//New Usuario

router.post('/', UsuarioController.newUsuario);

//New Vipusa

//router.post('/', UsuarioController.newVipusa);

//Edit usuario

router.put('/:id', [checkJwt, checkRole(['admin'])], UsuarioController.editUsuario);

// Delete usuario

router.delete('/:id', [checkJwt], checkRole(['admin']), UsuarioController.deleteUsuario);

// Cambio password

router.put('/cambio-password/:id', [checkJwt, checkRole(['admin'])], UsuarioController.cambioPassword);

export default router;