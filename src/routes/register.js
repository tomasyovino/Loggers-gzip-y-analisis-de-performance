import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const registerRouter = Router();

registerRouter.get("/", (req, res) => {
    res.render("register");
});
  
registerRouter.post("/", (req, res) => {
    const { username, password, direction } = req.body;
    User.findOne({ username }, async (err, user) => {
      if (err) console.log(err);
      if (user) res.render("register-error");
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({
          username,
          password: hashedPassword,
          direction,
        });
        await newUser.save();
        res.redirect("/api/login");
      }
    });
});

export default registerRouter;