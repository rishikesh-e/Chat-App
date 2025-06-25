import express from "express";
import sendMessage from "../../controllers/messageController";
import getMessagesByChatId from "../../controllers/getMessageController";

const router = express.Router();

router.post("/message", sendMessage);
router.get("/message/:chatId", getMessagesByChatId);

export default router;
