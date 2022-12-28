const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductLineSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("ProductLine", ProductLineSchema);
