const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DistributionAgent = require("../models/DistributionAgent");
const ManufactureFactory = require("../models/ManufactureFactory");
const User = require("../models/User");
const WarrantyCenter = require("../models/WarrantyCenter");
const createError = require("../utils/error");

module.exports = {
  register: async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const {
        role,
        username,
        password,
        imgUri = "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
        ...infoUser
      } = { ...req.body };
      const newUser = new User({
        role,
        username,
        password: hash,
        imgUri,
      });
      const savedUser = await newUser.save();
      switch (savedUser.role) {
        case "agent":
          if (savedUser._id) {
            const { name, address } = { ...infoUser };
            const idUser = savedUser._id;
            const newAgent = new DistributionAgent({
              name,
              address,
              idUser,
            });
            try {
              const savedAgent = await newAgent.save();
              res.status(200).send(savedAgent);
            } catch (err) {
              next(err);
            }
          }
          break;
        case "manufacturing":
          if (savedUser._id) {
            const { name, address } = { ...infoUser };
            const idUser = savedUser._id;
            const newManufactureFactory = new ManufactureFactory({
              name,
              address,
              idUser,
            });
            try {
              const savedManufactureFactory =
                await newManufactureFactory.save();
              res.status(200).send(savedManufactureFactory);
            } catch (err) {
              next(err);
            }
          }
          break;
        case "warranty-center":
          if (savedUser._id) {
            const { name, address } = { ...infoUser };

            const idUser = savedUser._id;
            const newWarrantyCenter = new WarrantyCenter({
              name,
              address,
              idUser,
            });
            try {
              const savedWarrantyCenter = await newWarrantyCenter.save();
              res.status(200).send(savedWarrantyCenter);
            } catch (err) {
              next(err);
            }
          }
          break;
      }
      res.status(200).send(savedUser);
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));
      const { password, ...otherDetails } = user._doc;
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(otherDetails);
    } catch (err) {
      next(err);
    }
  },
};
