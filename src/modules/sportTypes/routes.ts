import { Router } from "express";
import SportTypesController from "./controller";

import checkToken from '../../middlewares/checkToken';

const router = Router();

router.get("/", checkToken, SportTypesController.getAll);


export default router;
