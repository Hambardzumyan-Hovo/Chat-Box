import express from "express";
import { startChat } from "../controllers/chatsController.js";

const router = express.Router();

router.post("/startChat", startChat);

export default router;
