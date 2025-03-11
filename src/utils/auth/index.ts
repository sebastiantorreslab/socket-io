// src/utils/auth.ts
import jwt from "jsonwebtoken";

const SECRET_KEY = "my-secret-key";

export const generateToken = (user: string): string => {
  return jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET_KEY);
};