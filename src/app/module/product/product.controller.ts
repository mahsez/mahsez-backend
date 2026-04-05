import catchAsync from "@/utils/catchAsync.js";
import { ProductService } from "./product.service.js";
import type { RequestHandler } from "express";
import SendResponse from "@/utils/sendResponse.js";
import httpStatus from "http-status";

type TProductController = {
  createProduct: RequestHandler;
};

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const ProductController: TProductController = {
  createProduct,
};
