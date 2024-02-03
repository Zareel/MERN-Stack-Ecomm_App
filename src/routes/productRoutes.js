import express from "express";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductImage,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//createProduct || method:post || /api/v1/product/create-product
router.post(
  "/create-product",
  isLoggedIn,
  isAdmin,
  formidable(),
  createProduct
);

//getAllProduct || method:get || /ap1/v1/product/get-allproduct
router.get("/get-allproduct", getAllProduct);

//getSingleProduct || method:get || /api/v1/product/single-product
router.get("/single-product/:id", getSingleProduct);

//getProductImage || method:get || /api/v1/product/product-image
router.get("/product-image/:id", getProductImage);

//deleteProduct || method:delete || /api/v1/product/delete-product
router.delete("/delete-product/:id", isLoggedIn, isAdmin, deleteProduct);

//updateProduct || method:put || /api/v1/product/update-product
router.put("/update-product/:id", isLoggedIn, isAdmin, updateProduct);

export default router;
