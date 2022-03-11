const MealCollection = require("../model/mealSchema");

// ******** Handling Schema errors ************ //
// ******************************************** //

const handleErrors = (err) => {
  const errors = {
    mealName: "",
    mealType: "",
    mealImg: "",
    mealPrice: "",
    mealQuantity: "",
  };
  if (err.code === 11000) {
    errors.mealName = "meal already exists";
    return errors;
  }
  if (err.message.includes("meals validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// ******** add new meal to database ************ //
// ******************************************** //

module.exports.addmeal = async (req, res) => {
  try {
    // submitting new meal to the database
    const mealAdded = await MealCollection.create(req.body);

    // if above opertion is successful send a green signal
    if (mealAdded) {
      res.status(200).json("Meal added successfully");
    } else {
      res.status(400).json("Meal could not be added");
    }
    // if any errors, log them
  } catch (err) {
    const errors = handleErrors(err);
    console.error(errors);
    res.status(500).json(errors);
  }
};

// ******** add new stock for exisitng meal ********** //
// ******************************************** //

module.exports.stockup = async (req, res) => {
  try {
    // checking if meal exists in the database
    const mealExists = await MealCollection.findOne({
      mealName: req.body.mealName,
    });

    if (mealExists) {
      const image =
        req.body.mealImg !== "" ? req.body.mealImg : mealExists.mealImg;

      await MealCollection.updateOne(
        { mealName: req.body.mealName },
        {
          $set: {
            mealImg: image,
            mealPrice: req.body.mealPrice,
          },
          $inc: { mealQuantity: req.body.mealQuantity },
        }
      );
      res.status(200).json("Meal updated successfully");
      // else meal does not exist
    } else {
      res.status(404).json("Add a meal first");
    }
    // if any errors, log them
  } catch (err) {
    const errors = handleErrors(err);
    console.error(err.message);
    res.status(500).json(errors);
  }
};

// ***************** ALl meals ***************** //
// ******************************************** //

module.exports.allmeals = async (req, res) => {
  try {
    const meal = await MealCollection.find({
      mealType: req.params.mealType,
    });
    // if meal exists
    if (meal.length > 0) res.status(200).json(meal);
    // else meal does not exist
    else res.status(404).json("Meal not found");

    // if any errors, log them
  } catch (err) {
    const errors = handleErrors(err);
    console.error(errors);
    res.status(500).json(err.message);
  }
};
