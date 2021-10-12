import { Request, Response, NextFunction } from "express";
import { Usuario } from "../entity/Usuario";
import { getRepository } from "typeorm";

export const checkRole = (roles: Array<string>) => {

  return async (req: Request, res: Response, next: NextFunction) => {

    const { id } = res.locals.jwtPayload;
    const usuarioRepository = getRepository(Usuario);
    let usuario: Usuario;

    try {
      usuario = await usuarioRepository.findOneOrFail(id);
    } catch (e) {
      res.status(401).json({ message: 'No esta autorizado' });
    }

    //Check 

    const { role } = usuario;

    if (roles.includes(role)) {
      next();
    } else {
      res.status(401).json({ message: 'No esta autorizado' });
    }


  }


}