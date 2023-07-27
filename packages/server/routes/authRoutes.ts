import { Router } from "express";

import { signupController, loginController, logoutController } from "../controllers/authController";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);

export default router;
