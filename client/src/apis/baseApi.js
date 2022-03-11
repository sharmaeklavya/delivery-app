import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4500/",
});

// http://localhost:4500/
// https://node-delivery.herokuapp.com/
