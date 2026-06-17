import { Router } from "express";
import { getProductsPage, getSingleProductPage } from "../controllers/default.controller.js";
import { requireLogin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireLogin, getProductsPage);
router.get("/:id", requireLogin, getSingleProductPage);

export default router;