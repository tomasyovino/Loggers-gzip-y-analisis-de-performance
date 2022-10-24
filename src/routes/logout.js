import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get("/", (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/api");
    });
});

export default logoutRouter;