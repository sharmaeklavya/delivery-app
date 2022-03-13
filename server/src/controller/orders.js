const { ObjectId } = require("mongodb");
const UserCollection = require("../model/userSchema");
const OrderCollection = require("../model/orderSchema");
const { nanoid } = require("nanoid");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const { APP_URL } = require("../model/enviornment");

module.exports.checkout = async (req, res) => {
  const { line_items } = req.body;
  if (!line_items) return res.status(400).json("Missing required parameters");

  let session;

  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${APP_URL}/success/session_id=CHECKOUT_SESSION_ID`,
      cancel_url: `${APP_URL}/cancelled`,
      shipping_address_collection: {
        allowed_countries: [
          "CA",
          "DK",
          "FJ",
          "FR",
          "DE",
          "GR",
          "HK",
          "IS",
          "IN",
          "ID",
          "IE",
          "IL",
          "IT",
          "JP",
          "KR",
          "LU",
          "MG",
          "MV",
          "MU",
          "MM",
          "NP",
          "NZ",
          "NO",
          "PY",
          "PL",
          "SG",
          "ZA",
          "LK",
          "SR",
          "CH",
          "TW",
          "TH",
          "UA",
          "GB",
          "US",
          "ZW",
        ],
      },
    });
    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    res.status(400).json("Internal server error");
  }
};

// ******** add new order ***************** //
// ******************************************** //

module.exports.addorder = async (req, res) => {
  try {
    const user = req.user;
    const orderId = nanoid(10);

    // destructing order form fields
    const {
      meals: [{ mealId, mealName, mealImg, mealPrice, mealQuantity }],
      deliveryStatus,
      paymentStatus,
      totalPrice,
    } = req.body;

    if (!user) return res.sendStatus(401);

    const mealOrder = {
      userId: ObjectId(user._id),
      orderId,
      orderDate: Date.now(),
      meals: [
        {
          mealId: ObjectId(mealId),
          mealName,
          mealImg,
          mealPrice,
          mealQuantity,
        },
      ],
      deliveryStatus,
      paymentStatus,
      totalPrice,
    };

    const orderUpdated = await OrderCollection.create(mealOrder);

    if (!orderUpdated) return res.sendStatus(400);

    const userOrderUpdated = await UserCollection.updateOne(
      { _id: ObjectId(user._id) },
      {
        $push: {
          pastOrders: {
            $each: [{ orderId }],
            $position: 0,
          },
        },
      }
    );

    if (!userOrderUpdated) res.sendStatus(400);
    else res.status(200).json(`Order ${orderId} processed successfully.`);

    // if any errors, log them
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

// ******** user orders ***************** //
// ******************************************** //

module.exports.userorder = async (req, res) => {
  try {
    const user = req.user;

    if (!user) return res.sendStatus(401);

    const userExists = await UserCollection.findOne({
      _id: ObjectId(user._id),
    });

    if (!userExists) return res.sendStatus(400);

    const allOrders = await OrderCollection.find({
      $and: [
        {
          orderId: { $in: userExists.pastOrders.map((order) => order.orderId) },
        },
      ],
    });

    if (!allOrders) res.sendStatus(400);
    else res.status(200).json(allOrders);

    // if any errors, log them
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
