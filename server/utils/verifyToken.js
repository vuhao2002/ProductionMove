const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    // xac minh that bai
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

module.exports = {
  verifyUser: (req, res, next) => {
    verifyToken(req, res, () => {
      next();
    });
  },
  verifyWarrantyCenter: (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.role === "warranty-center" || req.user.role === "admin") {
        next();
      } else {
        if (err) return next(createError(403, "You are not authorized!"));
      }
    });
  },

  verifyManufacturing: (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.role === "manufacturing" || req.user.role === "admin") {
        next();
      } else {
        if (err) return next(createError(403, "You are not authorized!"));
      }
    });
  },
  verifyAdmin: (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.role === "admin") {
        next();
      } else {
        if (err) return next(createError(403, "You are not authorized!"));
      }
    });
  },
};
