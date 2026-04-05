import { Router } from "express";
import { RolePermissionController } from "./rolePermission.controller.js";

const router = Router();

router.post(
  "/create-role-permission",
  RolePermissionController.createRolePermission,
);

export const RolePermissionRoute: Router = router;
