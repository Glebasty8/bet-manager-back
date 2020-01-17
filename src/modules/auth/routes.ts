import { Router } from "express";
import AuthController from "./controller";

import checkToken from '../../middlewares/checkToken';

const router = Router();

// Profile
router.get("/", checkToken,  AuthController.auth);

// ping token
router.get("/token/ping", checkToken, (req, res) => {
    // Middleware will already catch if token is invalid
    // so if he can get this far, that means token is valid
    res.json({ success: true, msg: "all good mate" })
})

// Login
router.post("/login",  AuthController.login);

// Registration
router.post("/register", AuthController.register);

// ResetPassword
router.post("/forgot-password", AuthController.forgotPassword);

// ResetPassword
router.post("/new-password", AuthController.resetPassword);

export default router;
