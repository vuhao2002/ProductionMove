const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  // admin ,trung tam bao hanh, co so san xuat, dai ly
  {
    role: {
      type: String,
      enum: ["admin", "warranty-center", "manufacturing", "agent"],
      default: "agent",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUri: {
      type: String,
      default:
        "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
    },
    status: {
      type: String,
      enum: ["first", "active", "inactive"],
      default: "first",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
