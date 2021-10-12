import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Usuario } from "../entity/Usuario";
//import { Vipusa } from "../entity/Vipusa";
import { validate } from "class-validator";

class UsuarioController {

  static getAll = async (req: Request, res: Response) => {

    const usuarioRepository = getRepository(Usuario);

    try {

      const usuarios = await usuarioRepository.find();
      res.send(usuarios);

    } catch (e) {

      res.status(404).json({

        message: 'No hay Resultados'

      });

    }
  }

  static getById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const usuarioRepository = getRepository(Usuario);

    try {

      const usuario = await usuarioRepository.findOneOrFail(id);

      res.send(usuario);
    } catch (e) {

      res.status(404).json({

        message: 'No hay Resultados'

      });

    }
  }

  static newUsuario = async (req: Request, res: Response) => {

    const { nombre, email, password, role } = req.body;
    const usuario = new Usuario();

    usuario.nombre = nombre;
    usuario.email = email;
    usuario.password = password;
    usuario.role = role;
    const usuarioRepository = getRepository(Usuario);

    try {

      usuario.hashPassword();
      await usuarioRepository.save(usuario);

    } catch (e) {

      return res.status(400).json({
        message: 'El email ya existe!!'
      });

    }

    res.send('Usuario creado..');

  }

  static editUsuario = async (req: Request, res: Response) => {

    let usuario;
    const { id } = req.params;
    const { nombre, email, role } = req.body;
    const usuarioRepository = getRepository(Usuario);

    try {

      usuario = await usuarioRepository.findOneOrFail(id);


    } catch (e) {
      return res.status(404).json({

        message: 'Usuario no encontrado'

      });
    }

    usuario.nombre = nombre;
    usuario.email = email;   
    usuario.role = role;
    
    

    const errors = await validate(usuario, { validationError: { target: false, value: false } });

    if (errors.length > 0) {
      res.status(400).json(errors);
    }

    try {
      
      await usuarioRepository.save(usuario);

    } catch (e) {
      return res.status(409).json({
        message: 'El usuario ya esta en uso'
      });

    }

    res.status(201).json({ message: 'El usuario ya esta actualizado' });
  }

  static deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const usuarioRepository = getRepository(Usuario);
    let usuario: Usuario;
    try {

      usuario = await usuarioRepository.findOneOrFail(id);

    } catch (e) {

      res.status(404).json({

        message: 'Usuario no encontrado'

      });

    }

    usuarioRepository.delete(id);
    res.status(201).json({
      message: 'El usuario fue eliminado correctamente'
    });

  }

  static cambioPassword = async (req: Request, res: Response) => {

    const { id } = req.params;
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

  /*static newVipusa = async (req: Request, res: Response) => {

    const { nombreApellido, n_licencia, empresa, observacion, cargo } = req.body;
    const vipusas = new Vipusa();

    vipusas.nombreApellido = nombreApellido;
    vipusas.n_licencia = n_licencia;
    vipusas.empresa = empresa;
    vipusas.observacion = observacion;
    vipusas.cargo = cargo;

    const usuarioRepository = getRepository(Vipusa);

    res.send('Vipusa creado..');

  }*/



}

export default UsuarioController;