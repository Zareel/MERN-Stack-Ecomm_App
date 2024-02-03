import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxLength: [120, "Product name should not exceed 120 chars"],
    },
    price: {
      type: Number,
      requred: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: [150, "Description should not exceed 150 chars"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Boolean,
    },
    collectionId: {
      type: mongoose.ObjectId,
      ref: "Collection",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
