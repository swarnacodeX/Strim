import express from "express";
import db from "../db.js"; // Should be a pg.Pool or pg.Client
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// New Post
router.post("/newpost", async (req, res) => {
  const { probs, username, email } = req.body;
  const randomId = uuidv4();
  const query =
    "INSERT INTO posts (idprobs, probstxt, probsusername, probsemail) VALUES ($1, $2, $3, $4)";
  try {
    await db.query(query, [randomId, probs, username, email]);
    res.status(201).send("posted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error posting.");
  }
});

// Fetch All Posts
router.get("/fetchposts", async (req, res) => {
  const query = "SELECT probstxt, probsusername FROM posts";
  try {
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Post
router.post("/updatepost", async (req, res) => {
  const id = req.body.id;
  const post = req.body.probs;
  const query = "UPDATE posts SET probstxt=$1 WHERE idprobs=$2";
  try {
    const result = await db.query(query, [post, id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing PostgreSQL query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Posts
router.post("/userPosts", async (req, res) => {
  const username = req.body.probsusername;
  const query = "SELECT idprobs, probstxt FROM posts WHERE probsusername=$1";
  try {
    const result = await db.query(query, [username]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing PostgreSQL query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Post
router.post("/deletepost", async (req, res) => {
  const id = req.body.id;
  const sql = "DELETE FROM posts WHERE idprobs = $1";
  try {
    await db.query(sql, [id]);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error executing PostgreSQL query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
