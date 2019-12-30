import { Router } from "express";
import AuthController from "./controller";

import checkToken from '../../middlewares/checkToken';

const router = Router();

// Profile
router.get("/", checkToken,  AuthController.auth);

// Login
router.post("/login",  AuthController.login);

// Registration
router.post("/register", AuthController.register);

// ResetPassword
router.post("/forgot-password", AuthController.forgotPassword);

// ResetPassword
router.post("/new-password", AuthController.resetPassword);

export default router;