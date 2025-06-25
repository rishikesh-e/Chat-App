import { Request, Response } from "express";
import { Message } from "../models/message";
import { Chat } from "../models/chat";

interface IMessage {
  chatId: string;
  senderId: string;
  content: string;
}

const sendMessage = async (req: Request<{}, {}, IMessage>, res: Response) => {
  const { chatId, senderId, content } = req.body;
  try {
    const message = new Message({ chat: chatId, sender: senderId, content });
    await message.save();

    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

    res.status(200).json(message);
  } catch (error: any) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

export default sendMessage;
