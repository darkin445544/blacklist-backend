import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Usuario } from "../entity/Usuario";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { validate } from "class-validator";

class AuthController {

  static login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email && password) {

      return res.status(400).json({
        message: 'Email o Password son requeridos..'
      });

    }

    const usuarioRepository = getRepository(Usuario);
    let usuario: Usuario;
    try {

      usuario = await usuarioRepository.findOneOrFail({ where: { email } });

    } catch (e) {

      return res.status(400).json({
        message: 'El email o password son incorrectos'
      });

    }

    if (!usuario.checkPassword(password)) {

      return res.status(400).json({
        message: 'El email o password son incorrectos'
      });

    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, config.jwtSecret, { expiresIn: '2h' });
    res.json({
      message: 'ok',
      token,
      usuario
    });
  }

  static changePassword = async (req: Request, res: Response) => {

    const { id } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {

      res.status(400).json({
        message: 'No coinciden las contraseñas'
      });

    }

    const usuarioRepository = getRepository(Usuario);
    let usuario: Usuario;

    try {

      usuario = await usuarioRepository.findOneOrFail(id);

    } catch (e) {

      res.status(400).json({

        message: 'Porfavor hable con el administrador'

      });

    }

    if (!usuario.checkPassword(oldPassword)) {
      return res.status(401).json({
        message: 'revisar el antiguo password'
      });
    }

    usuario.password = newPassword;

    const errors = await validate(usuario, { validationError: { target: false, value: false } });

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    usuario.hashPassword();
    usuarioRepository.save(usuario);

    res.json({
      message: 'Se actualizo el password'
    });

  }


}

export default AuthController;