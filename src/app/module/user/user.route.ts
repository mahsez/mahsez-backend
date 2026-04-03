import { Router } from "express";
import { UserController } from "./user.controller.js";

const router = Router();

router.post(
  "/create-admin",
  // FileUploadHelper.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req?.body?.data);
  //   return UserController.createAdmin(req, res, next);
  // },
  UserController.createAdmin,
);

export const UserRoute: Router = router;
