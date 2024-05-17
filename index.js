const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const parser = require("body-parser");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");
const app = express();
dotenv.config();
//
mongoose
  .connect(process.env.MONGO_CONNECT_DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });
//
app.use(parser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
//
app.use("/v1/product", productRoutes);
//
const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server is closing");
    process.exit(0);
  });
});
