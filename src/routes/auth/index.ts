// src/routes/auth.ts
import express from "express";
import { generateToken } from "../../utils/auth";

const router = express.Router();

router.post("/login", (req, res) => {
  const { userId } = req.body;
  const token = generateToken(userId);
  res.json({ token });
});

export default router;