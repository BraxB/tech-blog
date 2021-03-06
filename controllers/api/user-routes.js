const router = require("express").Router();
const { User } = require("../../models");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// log into an account
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Try again." });
      return;
    }

    const validPw = user.checkPassword(req.body.password);

    req.session.save(() => {
      req.session.username = user.username;
      req.session.id = user.id;
      req.session.loggedIn = true;
      res.status(200).json({ user: userData, message: "You are logged in." });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// log out of a session by destroying it
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
