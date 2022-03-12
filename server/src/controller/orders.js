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
