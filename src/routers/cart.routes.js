import { Router } from "express";
import { getCart, addItem, removeItem, clearCart } from "../controllers/cart.controller.js";
import { requireLogin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireLogin);

router.get("/", getCart);
router.post("/items", addItem);
router.delete("/items/:productId", removeItem);
router.post("/clear", clearCart);

export default router;