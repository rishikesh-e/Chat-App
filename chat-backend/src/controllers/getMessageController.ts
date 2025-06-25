import { Request, Response } from "express";
import { Message } from "../models/message";
import mongoose from "mongoose";

const getMessagesByChatId = async (
  req: Request<{ chatId: string }>, // Explicitly type the params
  res: Response
) => {
  try {
    const { chatId } = req.params;

    // Validate the chatId format
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid chat ID format" });
    }

    const messages = await Message.find({
      chat: new mongoose.Types.ObjectId(chatId),
    })
      .populate("sender", "name email")
      .populate("chat")
      .sort({ timeStamp: 1 });

    res.status(200).json(messages);
  } catch (error: any) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
};

export default getMessagesByChatId;
