import { Router } from "express";
import { getProductsPage, getSingleProductPage } from "../controllers/default.controller.js";

const router = Router();

router.get("/", getProductsPage);
router.get("/:id", getSingleProductPage);

export default router;