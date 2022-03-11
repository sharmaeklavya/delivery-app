const router = require("express").Router();
const { register, login, logout, addorder } = require("../controller/users");
const { addmeal, stockup, allmeals } = require("../controller/meals");
const { checkout } = require("../controller/orders");
const { userAuth, refreshToken } = require("../model/jwtToken");

// user collection
router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);
// router.post("/update_password", updatepassword);
// router.post("/reset_password", resetpassword);

router.post("/api/auth/refreshtoken", refreshToken);

// Meal collection
router.post("/api/meals/checkout", checkout);
router.post("/api/meals/addorder", userAuth, addorder);
router.post("/api/meals/addmeal", userAuth, addmeal);
router.post("/api/meals/stockup", stockup);
router.get("/api/meals/:mealType", allmeals);

module.exports = router;
