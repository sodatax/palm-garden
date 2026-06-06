import { Router } from "express";
import { getProductsPage } from "../controllers/default.controller.js";

const router = Router();

router.get("/", getProductsPage);

export default router;