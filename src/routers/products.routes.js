import { Router } from "express";
import { getProductsWithFilters, getProductById } from "../controllers/default.controller.js";
import { requireLogin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireLogin, getProductsWithFilters);
router.get("/:id", requireLogin, getProductById);

export default router;