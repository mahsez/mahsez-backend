import { Router } from "express";
import { UserPermissionController } from "./userPermission.controller.js";

const router = Router();

router.post(
  "/create-user-permission",
  UserPermissionController.createUserPermission,
);

export const UserPermissionRoute: Router = router;
