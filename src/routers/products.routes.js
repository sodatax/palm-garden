import { Router } from "express";
import { getProductsWithFilters, getProductById } from "../controllers/default.controller.js";
import { getAll } from "../services/default.service.js";

const router = Router();

router.get("/", getProductsWithFilters);
router.get("/:id", getProductById);

export default router;