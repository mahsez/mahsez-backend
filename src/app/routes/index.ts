import { Router } from "express";
import { UserRoute } from "../module/user/user.route.js";
import { PermissionRoute } from "../module/permission/permission.route.js";

const router: Router = Router();

const moduleRoute = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/permission",
    route: PermissionRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
