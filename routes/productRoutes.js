import express from "express"
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productFiltersController,
  productPhotoController,
  updateProductController,
} from '/..controllers/product-controller.js';
import { isAdmin, requiresSignIn } from '../middlewares/authMiddleware.js';
import formidable from "express-formidable"

const router = express.router();

router.post(
  requiresSignIn,
  isAdmin
  formidable(),
  createProductController,
);

router.put();



router.get('/product-filters', productsFilterController)

export defeault router
