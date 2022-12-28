const Customer = require("../../models/Customer");
const DistributionAgent = require("../../models/DistributionAgent");
const Product = require("../../models/Product");
const ProductLine = require("../../models/ProductLine");
const createError = require("../../utils/error");

module.exports = {
  // POST
  //   tạo productline
  //   /manufacturing/productline
  createProductLine: async (req, res, next) => {
    const newProductLine = new ProductLine(req.body);
    try {
      const savedProductLine = await newProductLine.save();
      res.status(200).json(savedProductLine);
    } catch (err) {
      next(err);
    }
  },

  // tạo sản phẩm vào kho của đại lý
  // /manufacturing/createProduct/:agentId
  createProduct: async (req, res, next) => {
    const { code, ...dataProduct } = { ...req.body };
    const productLine = await ProductLine.findOne({ code });
    if (!productLine)
      return next(new createError(401, "ProductLine not found!"));
    const newProduct = new Product({
      productLine,
      ...dataProduct,
    });
    try {
      const savedProduct = await newProduct.save();
      try {
        await DistributionAgent.findByIdAndUpdate(req.params.agentId, {
          $push: { idProduct: savedProduct._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedProduct);
    } catch (err) {
      next(err);
    }
  },

  //   GET ALL AGENT
  //   /manufacturing"
  getAgents: async (req, res, next) => {
    try {
      const agents = await DistributionAgent.find();
      res.status(200).json(agents);
    } catch (err) {
      next(err);
    }
  },
};
