import { Router } from "express";
import { UserController } from "./user.controller.js";
import auth from "@/app/middleware/auth.js";
import validateRequest from "@/app/middleware/validateRequest.js";
import { adminValidation } from "../admin/admin.validation.js";

const router = Router();

router.post(
  "/create-admin",
  validateRequest(adminValidation.createAdminValidation),
  // FileUploadHelper.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req?.body?.data);
  //   return UserController.createAdmin(req, res, next);
  // },
  UserController.createAdmin,
);

router.get(
  "/get-admin",
  auth({
    roles: ["ADMIN"],
    permissions: ["user:read"],
  }),
  UserController.getAdmin,
);

export const UserRoute: Router = router;
