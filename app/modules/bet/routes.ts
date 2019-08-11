import { Router } from "express";
import BetController from "./controller";

const router = Router();

// Get all bets
router.get("/",  BetController.getAll);

// Create bet
router.post("/",  BetController.create);

// Get specific bet
router.get("/:betId", BetController.get);

// Update specific bet
router.put("/:betId", BetController.update);

// Remove specific bet
router.delete("/:betId", BetController.remove);

export default router;
