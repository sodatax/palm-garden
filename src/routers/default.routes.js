import { Router } from "express";
import authCtl from "../controllers/auth.controller.js";
import { getHomePage } from "../controllers/default.controller.js";

const router = Router();

router.get("/", getHomePage);

router.get("/login", authCtl.loginPage);
router.post("/login", authCtl.login);

router.get("/register", authCtl.registerPage);
router.post("/register", authCtl.register);

router.get("/home", authCtl.isLoggedIn, getHomePage);

router.get("/logout", authCtl.logout);

export default router;