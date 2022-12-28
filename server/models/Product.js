const mongoose = require("mongoose");
const { Schema } = mongoose;
// lược đồ của sản phẩm
const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },

    productLine: {
      type: mongoose.Types.ObjectId,
      ref: "ProductLine",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "mới sản xuất",
        "đại lý",
        "đã bán",
        "lỗi, cần bảo hành",
        "đang sửa chữa bảo hành",
        "đã bảo hành xong",
        "đã trả lại bảo hành cho khách hàng",
        "lỗi, cần trả về nhà máy",
        "lỗi, cần đưa về cơ sở sản xuất",
        "lỗi, cần triệu hồi",
        "hết thời gian bảo hành",
        "trả lại cơ sở sản xuất",
      ],
      default: "mới sản xuất",
    },
    agentName: {
      type: String,
    },
    imageUrl: {
      type: [String],
    },
    warrantyTimes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
