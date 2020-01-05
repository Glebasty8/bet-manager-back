import { Router } from "express";
import SubscriptionController from "./controller";


const router = Router();

// subscription
router.post("/payment",  SubscriptionController.payment);

router.get("/subscriptions", SubscriptionController.subscriptions)


export default router;
