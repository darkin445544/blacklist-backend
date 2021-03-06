import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as cors from 'cors';
import * as helmet from "helmet";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {

  // create express app
  const app = express();

  //middlewares
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  //Rutas

  app.use('/', routes);

  // start express server

  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

}).catch(error => console.log(error));
