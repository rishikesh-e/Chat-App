import { Server } from "socket.io";
import { Message } from "../models/message";
import { Chat } from "../models/chat";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on(
      "send-message",
      async ({ chatId, senderId, receiverId, content }) => {
        const message = new Message({
          chat: chatId,
          sender: senderId,
          content,
        });
        await message.save();

        await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

        io.to(receiverId).emit("receive-message", message);
      }
    );
  });
};
