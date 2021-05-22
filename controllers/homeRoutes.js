const router = require("express").Router();
const { Comment, Post, User } = require("../models");

// GET all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts", {
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk({
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("single-post", {
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
