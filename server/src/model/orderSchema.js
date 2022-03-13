const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    required: true,
  },
  orderId: {
    type: String,
    trim: true,
    unique: [true, "Order id already exists"],
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  meals: [
    {
      mealId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      mealName: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
      },
      mealImg: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
      },
      mealPrice: {
        type: Number,
        required: true,
      },
      mealQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryStatus: {
    type: String,
    trim: true,
    enum: ["delivered", "not delivered", "on the way"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "not paid"],
    required: true,
  },
});

const OrderCollection = mongoose.model("orders", orderSchema);

module.exports = OrderCollection;
