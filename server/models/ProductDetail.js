const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductDetailSchema = new Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  // chiều rộng cơ sở
  baseWidth: {
    type: String,
    required: true,
  },
  // chiều dài cơ sở
  baseHeight: {
    type: String,
    required: true,
  },
  // Bán kính quay vòng tối thiểu
  minimumTurningRadius: {
    type: String,
    required: true,
  },
  // Khoảng sáng gầm xe
  GroundClearance: {
    type: String,
    required: true,
  },
  // Dung tích xi lanh
  cylinderCapacity: {
    type: String,
    required: true,
  },
  // công suất động cơ
  enginePower: {
    type: String,
    required: true,
  },
  // Hộp số
  gear: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ProductDetail", ProductDetailSchema);
