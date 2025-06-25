import express from "express";
import getOrCreateChat from "../../controllers/chatController";

const router = express.Router();

router.post("/chat", getOrCreateChat);

export default router;
