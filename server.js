const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB jjjjjj
mongoose.connect("mongodb://localhost:27017/social-media", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Comment Schema
const commentSchema = new mongoose.Schema({
  name: String,
  text: String,
});

const Comment = mongoose.model("Comment", commentSchema);

app.use(bodyParser.json());
app.use(express.static("public"));

// Endpoint to get comments
app.get("/api/comments", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

// Endpoint to post a comment
app.post("/api/comments", async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  res.status(201).send("Comment added");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
