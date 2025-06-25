import { Request, Response } from "express";
import { Chat } from "../../models/chat";

interface IUser {
  userId1: string;
  userId2: string;
}

const getOrCreateChat = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { userId1, userId2 } = req.body;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId1, userId2] },
    });
    if (!chat) {
      chat = new Chat({ participants: [userId1, userId2] });
      await chat.save();
    }
    res.status(200).json(chat);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating/fetching chat", error });
  }
};

export default getOrCreateChat;
