import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// @desc Fetches all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetches a single product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product ID format");
  }

  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
