const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create a post
// @access   Private
router.post(
  "/",
  [
    auth.isLoggedIn,
    [
      check("title", "title is required").notEmpty(),
      check("content", "Content is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access   Private
router.get("/", auth.isLoggedIn, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["name", "role"])
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Private
router.get("/:post_id", auth.isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).populate("user", [
      "name",
      "role",
    ]);
    if (!post) return res.status(400).json({ msg: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Get post by id
// @access  Private
router.delete("/:post_id", auth.isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(400).json({ msg: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like post by id
// @access  Private
router.put("/like/:post_id", auth.isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(400).json({ msg: "Post not found" });
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Like post by id
// @access  Private
router.put("/unlike/:post_id", auth.isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(400).json({ msg: "Post not found" });
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.json({ msg: "Post has not yet been liked" });
    }

    // Get remove index

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
});
module.exports = router;
