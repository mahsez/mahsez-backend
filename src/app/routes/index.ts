import { Router } from "express";
import { UserRoute } from "../module/user/user.route.js";
import { PermissionRoute } from "../module/permission/permission.route.js";
import { UserPermissionRoute } from "../module/userPermission/userPermission.route.js";
import { RolePermissionRoute } from "../module/rolePermission/rolePermission.route.js";
import { ProductRoute } from "../module/product/product.route.js";
import { AuthRoute } from "../module/auth/auth.route.js";

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
  {
    path: "/role-permission",
    route: RolePermissionRoute,
  },
  {
    path: "/user-permission",
    route: UserPermissionRoute,
  },
  {
    path: "/product",
    route: ProductRoute,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
