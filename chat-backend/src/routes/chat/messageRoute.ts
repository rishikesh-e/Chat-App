import express from "express";
import sendMessage from "../../controllers/chat/messageController";
import getMessagesByChatId from "../../controllers/chat/getMessageController";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();

router.post("/message", verifyToken, sendMessage);
router.get("/message/:chatId", verifyToken, getMessagesByChatId);

export default router;
