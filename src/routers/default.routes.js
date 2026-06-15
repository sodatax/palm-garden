import { Router } from "express";
import { getHomePage, getLoginPage, getSignUpPage } from "../controllers/default.controller.js";

const router = Router();

router.get("/", getHomePage);
router.get("/login", getLoginPage);
router.get("/register", getSignUpPage);

export default router;