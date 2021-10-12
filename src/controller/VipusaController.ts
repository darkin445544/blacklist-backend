import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Vipusa } from "../entity/Vipusa";
import { validate } from "class-validator";

class VipusaController {


    static getAll = async (req: Request, res: Response) => {

        const vipusaRepository = getRepository(Vipusa);
    
        try {
    
          const vipusas = await vipusaRepository.find();
          res.send(vipusas);
    
        } catch (e) {
    
          res.status(404).json({
    
            message: 'No hay Resultados'
    
          });
    
        }
    }

    static newVipusa = async (req: Request, res: Response) => {

        const { nombreApellido, n_licencia, empresa, observacion, cargo } = req.body;
        const vipusa = new Vipusa();

        vipusa.nombreApellido = nombreApellido;
        vipusa.n_licencia = n_licencia;
        vipusa.empresa = empresa;
        vipusa.observacion = observacion;
        vipusa.cargo = cargo;

        const vipusaRepository = getRepository(Vipusa);

        try {

            //vipusa.hashPassword();
            await vipusaRepository.save(vipusa);
    
        } catch (e) {
    
            return res.status(400).json({
                message: 'El email ya existe!!'
            });
    
        }
    
        res.send('Registro creado..');

    }

    static deleteVipusa = async (req: Request, res: Response) => {

        const { id } = req.params;
        const vipusaRepository = getRepository(Vipusa);
        let vipusa: Vipusa;
        try {
    
            vipusa = await vipusaRepository.findOneOrFail(id);
    
        } catch (e) {
    
          res.status(404).json({
    
            message: 'Registro no encontrado'
    
          });
    
        }
    
        vipusaRepository.delete(id);
        res.status(201).json({
          message: 'El registro fue eliminado correctamente'
        });
    
      }

}

export default VipusaController;