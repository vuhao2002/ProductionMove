const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const route = require("./routes");

const app = express();
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect to mongoDB.!!!");
  } catch (err) {
    console.log("connect error!!!");
  }
};

// ngắt kết nối với cơ sở dữ liệu
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

// kết nối trở lại
mongoose.connection.on("connected", () => {
  console.log("mongoDB disconnected");
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes init (khởi tạo đối tượng route)
route(app);

// middlewares
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server started on Port ${process.env.PORT}`);
});
