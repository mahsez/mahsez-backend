import { Router } from "express";
import { ProductController } from "./product.controller.js";

const router = Router();

router.post("/create-product", ProductController.createProduct);

export const ProductRoute: Router = router;
