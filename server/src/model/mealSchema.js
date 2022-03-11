const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  mealName: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "Meal already exists"],
    required: [true, "Please enter meal name"],
  },
  mealDesc: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Please enter meal description"],
  },
  mealType: {
    type: String,
    lowercase: true,
    enum: ["topping", "beverage", "pizza"],
    required: [true, "Please select meal type"],
  },
  mealImg: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Please enter img address"],
  },
  mealPrice: {
    type: Number,
    required: [true, "Please enter meal price"],
  },
  mealQuantity: {
    type: Number,
    required: [true, "Please enter meal quantity"],
  },
  randomString: {
    type: String,
    trim: true,
  },
});

const MealCollection = mongoose.model("meals", mealSchema);

module.exports = MealCollection;
