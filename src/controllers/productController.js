import Product from "../models/productSchema.js";
import formidable from "formidable";
import fs from "fs";

//createProduct || method:post || /api/v1/product/create-product
export const createProduct = async (req, res) => {
  try {
    //get info from frontend. As we have installed formidable we will grab infro from `req.fields` instead of `req.body`
    const { name, description, price, collectionId, quantity } = req.fields;
    const { photo } = req.files;
    //validation
    if (!name || !description || !price || !collectionId || !quantity) {
      return res.satus(404).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //photo validation
    if (!photo && photo.size > 1000000) {
      return res.status(500).json({
        success: false,
        message: "Photo is required and should be less than 1mb",
      });
    }
    //check if the product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(200).json({
        success: true,
        message: "Product already exists",
      });
    }
    const products = new Product({
      ...req.fields,
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).json({
      success: true,
      message: "Product has been created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

//getAllProduct || method:get || /api/v1/product/get-allprodcuts
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("collectionId")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    res.status(200).json({
      success: true,
      count: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting all products",
      error,
    });
  }
};

//getSingleProduct || method:get || /api/v1/product/single-product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params._id })
      .select("-photo")
      .populate("collectionId");
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "No product found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetched single product successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: false,
      error,
    });
  }
};

//getProductImage|| method:get || /api/v1/product/product-image
export const getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//deleteProduct|| method:delete || /api/v1/product/delete-product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).select(
      "-photo"
    );
    res.status(200).json({
      success: true,
      message: "Product has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

//updateProduct|| method:put || /api/v1/product/update-product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
