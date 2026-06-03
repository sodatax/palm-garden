import { Router } from "express";
import { getProducts, getProductById } from "../controllers/default.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/products", getProducts);
router.get("/products/:id", getProductById);

export default router;