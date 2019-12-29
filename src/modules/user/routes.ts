import { Router } from "express";
import UserController from "./controller";

const router = Router();

// Get all users
router.get("/",  UserController.getAll);

// Create user
router.post("/",  UserController.create);

// Get specific user
router.get("/:userId", UserController.get);

// Update specific user
router.put("/:userId", UserController.update);

// Remove specific user
router.delete("/:userId", UserController.remove);

export default router;
