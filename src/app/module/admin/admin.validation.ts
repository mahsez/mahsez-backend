import z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(50)
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[@$!%*?&#]/, "Must contain at least one special character");

const phoneSchema = z
  .string()
  .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
  .optional();

const adminAccessLevelEnum = z.enum([
  "SUPER",
  "MANAGER",
  "SUPPORT",
  "FINANCE",
  "HR",
]);

const departmentEnum = z.enum([
  "MANAGEMENT",
  "FINANCE",
  "OPERATIONS",
  "LOGISTICS",
  "TECH",
  "SUPPORT",
  "MARKETING",
  "SELLER_MANAGEMENT",
]);

const adminProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100),
  phone: phoneSchema,
  accessLevel: adminAccessLevelEnum,
  department: departmentEnum,
});

const createAdminValidation = z.object({
  body: z.object({
    email: z.email("Invalid email address").toLowerCase().trim(),
    password: passwordSchema,
    // optional extra fields
    userId: z
      .string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z0-9_-]+$/, "Invalid userId format")
      .optional(),
    // 👇 nested profile
    adminProfile: adminProfileSchema,
  }),
});

export const adminValidation = {
  createAdminValidation,
};
