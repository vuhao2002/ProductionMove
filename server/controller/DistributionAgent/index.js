const Customer = require("../../models/Customer");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const DistributionAgent = require("../../models/DistributionAgent.js");
const createError = require("../../utils/error");

module.exports = {
  // POST
  //   create order
  //   /agent/createTransaction/:productId"
  createTransaction: async (req, res, next) => {
    const productId = req.params.productId;
    if (!productId) return next(new createError(401, "Product not found!"));
    try {
      await Product.findByIdAndUpdate(
        productId,
        { $set: { status: "đã bán" } },
        { new: true }
      );
      const dataCustomer = {
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        customerAddress: req.body.customerAddress,
        productId: req.params.productId,
      };
      const newCustomer = new Customer(dataCustomer);
      try {
        const customerId = newCustomer._id;
        const newOrder = new Order({ customerId, productId });
        try {
          await newOrder.save();
        } catch (err) {
          next(err);
        }
        await newCustomer.save();

        res.status(200).json("Tạo order thành công");
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  },

  //   GET ALL PRODUCT
  //   /agent/:agentId"
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.find({
        agentName: req.params.agentId,
        status: "đại lý",
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  },
};
