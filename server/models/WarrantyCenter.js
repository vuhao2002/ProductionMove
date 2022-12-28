const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WarrantyCenterScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  idUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("WarrantyCenter", WarrantyCenterScheme);
