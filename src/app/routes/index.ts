import { Router } from "express";
import { UserRoute } from "../module/user/user.route.js";

const router: Router = Router();

const moduleRoute = [
  {
    path: "/user",
    route: UserRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
