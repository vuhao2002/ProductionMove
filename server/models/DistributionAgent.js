const mongoose = require("mongoose");
const { Schema } = mongoose;
// lược đồ của đại lý phân phối
const DistributionAgentSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  idProduct: {
    type: [String],
  },
  idUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("DistributionAgent", DistributionAgentSchema);
