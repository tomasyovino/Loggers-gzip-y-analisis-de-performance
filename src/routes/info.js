import { Router } from "express";

const infoRouter = Router();

const args = () => {
    let args = process.argv.slice(2);

    if(args.length == 0) {
        return "No se encontraron argumentos.";
    } else {
        return args;
    };
};

const info = {
    args: `Argumentos de entrada: ${args()}`,
    os: `Sistema Operativo: ${process.platform}`,
    ver: `Versión de Node: ${process.version}`,
    memoryUsage: `Uso de la memoria: ${JSON.stringify(process.memoryUsage())}`,
    path: `Ruta absoluta ${process.execPath}`,
    pid: `ID del proceso: ${process.pid}`,
    cwd: `Directorio: ${process.cwd()}`,
  }
  
  infoRouter.get("/", (req, res) => {
    res.send(info);
  });

export default infoRouter;