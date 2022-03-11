const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./src/model/connection");
const router = require("./src/routes/api");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// const whitelist = [
//   "http://localhost:3000",
//   "https://proj-delivery.netlify.app",
// ];
// const corsOptions = {
//   credentials: true,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());

app.use(cookieParser());
app.use(router);

connectToDB()
  .then((port) => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
