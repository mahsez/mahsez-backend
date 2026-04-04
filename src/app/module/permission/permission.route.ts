import { Router } from "express";
import { PermissionController } from "./permission.controller.js";

const router = Router();

router.post("/create-permission", PermissionController.createPermission);

export const PermissionRoute: Router = router;
