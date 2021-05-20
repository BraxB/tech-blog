const router = require("express").Router();

// const homeRoutes = require("./home-routes.js");

// router.use("/", homeRoutes);

router.get("/", () => {
  res.sendFile("../public/index.html");
});

module.exports = router;
