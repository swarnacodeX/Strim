import express from "express";
import db from "../mongodb.connect.js"; // Should be a pg.Pool or pg.Client
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Create Chat Room
router.post("/createChatRoom", async (req, res) => {
  const user1 = req.body.user1;
  const user2 = req.body.user2;
  if (user1 === user2) {
    res.status(400).send("Cannot create group with the same user.");
    return;
  }
  const groupid = uuidv4();
  const checkQuery =
    "SELECT * FROM chatgroup WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)";
  try {
    const checkResult = await db.query(checkQuery, [user1, user2]);
    if (checkResult.rows.length > 0) {
      res.status(200).send("Group already exists.");
    } else {
      const insertQuery =
        "INSERT INTO chatgroup (user1, user2, groupid) VALUES ($1, $2, $3)";
      await db.query(insertQuery, [user1, user2, groupid]);
      res.status(200).send("Group created successfully.");
    }
  } catch (err) {
    console.error("Error checking user in database:", err);
    res.status(500).send("Error checking user in database.");
  }
});

// Fetch Chats
router.post("/fetchChats", async (req, res) => {
  const roomId = req.body.roomId;
  const query = "SELECT sender, message FROM chats WHERE roomid = $1";
  try {
    const result = await db.query(query, [roomId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing PostgreSQL query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Store Chats
router.post("/storeChats", async (req, res) => {
  const { username, message, roomId } = req.body;
  const query = "INSERT INTO chats (sender, message, roomid) VALUES ($1, $2, $3) RETURNING *";
  try {
    const result = await db.query(query, [username, message, roomId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing PostgreSQL query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Chat List
router.post("/chatList", async (req, res) => {
  const username = req.body.username;
  const query = "SELECT * FROM chatgroup WHERE user1 = $1 OR user2 = $1";
  try {
    const result = await db.query(query, [username]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing PostgreSQL query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
