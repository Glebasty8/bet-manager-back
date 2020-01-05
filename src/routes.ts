import { Router } from "express";
import user from "./modules/user/routes";
import auth from "./modules/auth/routes";
import bet from "./modules/bet/routes";
import sportType from "./modules/sportTypes/routes";
import subscription from "./modules/subscription/routes";

const routes = Router();

routes.use("/users", user);
routes.use("/auth", auth);
routes.use("/bets", bet);
routes.use("/sport-types", sportType);
routes.use("/subscription", subscription);

export default routes;
