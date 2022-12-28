const mongoose = require("mongoose");
const { Schema } = mongoose;
// lược đồ của nhà máy sản xuất
const ManufactureFactorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  idUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("ManufactureFactory", ManufactureFactorySchema);
