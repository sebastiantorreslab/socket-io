import express from "express";
import authRouter from "./auth";

let router: express.Router;

router = express.Router();

router.use("/auth", authRouter);

export default router;
