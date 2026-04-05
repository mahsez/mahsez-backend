import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";

const createProductIntoDB = async (req: Request) => {
  const { name, description, price } = req.body;
  const result = await prisma.product.create({
    data: {
      name,
      description,
      price,
    },
  });
  return result;
};

export const ProductService = {
  createProductIntoDB,
};
