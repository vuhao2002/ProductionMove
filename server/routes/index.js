const authRouter = require("./auth");
const usersRouter = require("./users");
const agentRouter = require("./agent");
const manufacturingRouter = require("./manufacturing");

// middlewares
const route = (app) => {
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/manufacturing", manufacturingRouter);
  app.use("/agent", agentRouter);
  app.use("/", (req, res) => {
    res.send("hello, this is auth endpoint");
  });
};

module.exports = route;
