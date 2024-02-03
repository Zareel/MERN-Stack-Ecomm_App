import mongoose from "mongoose";
import OrderStatus from "../utils/OrderStatus.js";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: [
        {
          productId: {
            tupe: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          count: Number,
          price: Number,
        },
      ],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    coupon: String,
    transactionId: String,
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.ORDERED,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
