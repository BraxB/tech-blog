const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: CASCADE,
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: CASCADE,
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
