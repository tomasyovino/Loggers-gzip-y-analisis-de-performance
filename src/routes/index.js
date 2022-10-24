import { Router } from "express";
import loginRouter from "./login.js";
import registerRouter from "./register.js";
import logoutRouter from "./logout.js";
import mainRouter from "./main.js";
import infoRouter from "./info.js";
import randomRouter from "./random.js";
import { dataProd } from "../db/dataProd.js";
import log4js  from "log4js";

const router = Router();
const logger = log4js.getLogger();
const warnLogger = log4js.getLogger("warn");
const errorLogger = log4js.getLogger("error");

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/logout", logoutRouter);
router.use("/main", mainRouter);
router.use("/info", infoRouter);
router.use("/randoms", randomRouter);

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerFile: { type: "file", filename: "warn.log" },
    miLoggerFile2: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "info" },
    warn: { appenders: ["miLoggerFile"], level: "warn" },
    error: { appenders: ["miLoggerFile2"], level: "error" },
  },
});


const invalidRoute = (req) => {
  const url = req.originalUrl;
  const method = req.method;
  return { error: -2, description: `Ruta ${url} inexistente. Método ${method} no implementado.` };
};

// SESSION
router.get("/", (req, res) => {
  const url = req.originalUrl;
  const method = req.method;
  
  if (req.session.nombre) {
    logger.info(`Petición en la ruta ${url}. Método ${method}.`);
    res.redirect("/api/index");
  } else {
    logger.info(`Petición en la ruta ${url}. Método ${method}.`);
    res.redirect("/api/login");
  }
});
  
router.get("/login-error", (req, res) => {
    res.render("login-error");
});

router.post("/", async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    const productData = { title: title, price: price, thumbnail: thumbnail };
    dataProd.push(productData);

    res.redirect("/api/main");
  } catch (error) {
    logger.error(error);
    errorLogger.error(error);
  }
});

router.get("*", (req, res) => {
  const url = req.originalUrl;
  const method = req.method;

  logger.warn(`Ruta ${url} inexistente. Método ${method} no implementado.`);
  warnLogger.warn(`Ruta ${url} inexistente. Método ${method} no implementado.`);
  res.send(invalidRoute(req));
});

export default router;