import { Router, type NextFunction, type Request, type Response } from 'express';
import { UserController } from './user.controller.js';
// import { FileUploadHelper } from '@/shared/fileUploadHelper.js';

const router = Router();

router.post(
  '/create-admin',
  // FileUploadHelper.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req?.body?.data);
  //   return UserController.createAdmin(req, res, next);
  // },
  UserController.createAdmin,
);
router.get(
  '/get-admin',
  // FileUploadHelper.upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req?.body?.data);
  //   return UserController.createAdmin(req, res, next);
  // },
  UserController.getAdmin,
);

export const UserRoute: Router = router;

// router.post(
//   "/create-admin",
//   auth(ENUM_USER_ROLE.ADMIN),
//   FileUploadHelper.upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data));
//     return UserControllers.createAdmin(req, res, next);
//   }
// );

// router.post(
//   '/create-admin',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   FileUploadHelper.upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req?.body?.data);
//     return UserController.createAdmin(req, res, next);
//   },
// );
