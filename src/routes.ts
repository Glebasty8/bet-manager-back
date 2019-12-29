import { Router } from "express";
import user from "./modules/user/routes";
import auth from "./modules/auth/routes";
import bet from "./modules/bet/routes";

const routes = Router();

routes.use("/users", user);
routes.use("/auth", auth);
routes.use("/bets", bet);

export default routes;
