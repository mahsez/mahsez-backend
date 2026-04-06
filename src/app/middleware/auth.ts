import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "@/config/index.js";
import ApiError from "../errors/ApiError.js";
import { prisma } from "@/lib/prisma.js";
import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "@/generated/prisma/client.js";
import { errorMessageTernary } from "@/utils/errorMessageTernary.js";

const auth =
  ({
    roles = [],
    permissions = [],
  }: {
    roles?: UserRole[];
    permissions?: string[];
  }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
      }

      const [scheme, token] = authHeader.split(" ");

      if (scheme !== "Bearer" || !token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Invalid authorization format",
        );
      }

      const decoded = jwt.verify(token, config.jwt.jwt_secret);

      if (typeof decoded === "string") {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
      }

      const { userId } = decoded;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      });

      // const user = await prisma.user.findUnique({
      //     where: { id: userId },
      //     include: {p}})

      if (!user) throw new ApiError(404, "User not found");

      if (
        user.isDeleted ||
        user.status === "BLOCKED" ||
        user.status === "DELETED"
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, "User blocked or deleted");
      }

      // ✅ ROLE CHECK
      if (roles.length && !roles.includes(user.role)) {
        //   if (roles.length && !roles.map((r) => r.toUpperCase()).includes(user.role.toUpperCase()) ) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          errorMessageTernary(
            "You do not have permission to access this resource",
            `Access denied: role '${user.role}' is not allowed`,
          ),
        );
      }

      // ✅ PERMISSION CHECK
      if (permissions.length) {
        const userPermissions = user.permissions.map((p) => p.permission.name);

        const rolePermissionsData = await prisma.rolePermission.findMany({
          where: { role: user.role },
          include: { permission: true },
        });

        const rolePermissions = rolePermissionsData.map(
          (rp) => rp.permission.name,
        );

        const allPermissions = new Set([
          ...userPermissions,
          ...rolePermissions,
        ]);

        // check required permissions
        const hasPermission = permissions.every((required) => {
          if (allPermissions.has(required)) return true; // exact match

          // wildcard match
          return Array.from(allPermissions).some((p) => {
            if (p.endsWith("*")) {
              const resource = p.split(":")[0];
              return required.startsWith(resource + ":");
            }
            return false;
          });
        });

        if (!hasPermission) {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            errorMessageTernary(
              "You do not have permission to access this resource",
              `Access denied: role '${user.role}' is not allowed`,
            ),
          );
        }
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
