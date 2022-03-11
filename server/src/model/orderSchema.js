const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
  deliveryStatus: {
    type: String,
    trim: true,
    enum: ["delivered", "not delivered", "on the way"],
    required: true,
  },
  orderPaid: {
    type: Number,
    enum: ["yes", "no"],
    required: true,
  },
});

const OrderCollection = mongoose.model("orders", orderSchema);

module.exports = OrderCollection;
