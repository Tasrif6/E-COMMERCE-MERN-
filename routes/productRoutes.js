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
  createProductController
);

router.put(
  requiresSignIn,
  isAdmin
  formidable(),
  updateProductController
);


router.get('/get-product', getProductController);

router.get('/product-filters/:slug', getSingleProductController);

router.get('/product-photo/:pid', productPhotoController);

router.delete('/delete-product/:pid', deleteProductController);

router.post('/product-filters', productFiltersController);

export defeault router;
