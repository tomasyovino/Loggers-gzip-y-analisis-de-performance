import { Router } from "express";
import User from "../models/User.js";
import { dataProd } from "../db/dataProd.js";
import { auth } from "../middlewares/auth.js";

const mainRouter = Router();

mainRouter.get("/", auth, async (req, res) => {
    const userData = await User.findById(req.user._id).lean();
    res.render("main", {
      data: userData,
      productData: dataProd,
    });
});

export default mainRouter;