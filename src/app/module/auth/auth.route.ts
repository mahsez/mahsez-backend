import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthValidation } from "./auth.validation.js";
import validateRequest from "@/app/middleware/validateRequest.js";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.userLogin,
);

router.post("/refresh-token", AuthController.createRefreshToken);

export const AuthRoute: Router = router;
