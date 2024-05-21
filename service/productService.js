const { Product } = require("../models/productSchema");

const addProduct = {
  addProduct: async (req, res) => {
    try {
      const existingProduct = await Product.findOne({ name: req.body.name });
      if (existingProduct) {
        return res.status(400).json({
          status: "400",
          error: true,
          message: "Added failed because this product already existed !",
        });
      }
      const newProduct = new Product(req.body);
      const productDB = await newProduct.save();
      res.status(200).json(productDB);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 7;
      const skip = (page - 1) * limit;

      const getProducts = await Product.find().skip(skip).limit(limit);
      const totalProduct = await Product.countDocuments();

      if (getProducts.length === 0) {
        return res.status(200).json({
          message: "The products list is empty, please add one",
        });
      }
      res.status(200).json({
        result: getProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProduct / limit),
        totalProduct,
        status: "200",
        message: "Display success",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const targetProduct = await Product.findByIdAndDelete(
        req.params.productId
      );
      if (!targetProduct) {
        return res.status(404).json({
          message: "Delele failed because the product not found in database",
          status: "404",
          error: true,
        });
      }
      res.status(200).json({
        message: "Product deleted successfully",
        status: "Success",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedData = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { updated: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({
          message: "Updated failed because the product not found in database",
          status: "404",
          error: true,
        });
      }
      res.status(200).json({
        message: "Product updated successfully",
        status: "Success",
        updatedProduct,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = addProduct;
