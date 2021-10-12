import { Router } from "express";
import auth from "./auth";
import usuario from "./usuario";
import vipusa from "./vipusa";
const routes = Router();


// localhost:3000/auth/login
routes.use('/auth', auth);


// localhost:3000/usuario
routes.use('/usuarios', usuario);

// localhost:3000/vipusa
routes.use('/vipusas', vipusa);







export default routes;