// // import { Prisma } from "../../../generated/prisma/client.js";

// const createAdminIntoDB = async (req: Request) => {
//   const { email, name } = req.body;

//   if (email) {
//     const existingUser = await Prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       throw new Error("User with this email already exists");
//     }
//   }

//   const res = await prisma.user.create({ data: { email: email, name: name } });
//   return res;
// };

// export const UserService = {
//   createAdminIntoDB,
// };
