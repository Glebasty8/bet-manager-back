import { Router } from "express";
import user from "./modules/user/routes";
import auth from "./modules/auth/routes";
import bet from "./modules/bet/routes";
import sportType from "./modules/sportTypes/routes";

const routes = Router();

routes.use("/users", user);
routes.use("/auth", auth);
routes.use("/bets", bet);
routes.use("/sport-types", sportType);

export default routes;
