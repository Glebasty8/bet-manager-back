import { Router } from "express";
import SubscriptionController from "./controller";
import checkToken from "../../middlewares/checkToken";

const router = Router();

// subscription
router.post("/payment",  SubscriptionController.payment);

router.get("/subscriptions", checkToken, SubscriptionController.subscriptions)


export default router;
