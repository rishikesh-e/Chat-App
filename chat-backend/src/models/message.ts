import mongoose, { Document, Schema, Model } from "mongoose";

export interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
  readBy: mongoose.Types.ObjectId[];
  timestamp: Date;
}

const messageSchema: Schema<IMessage> = new mongoose.Schema<IMessage>({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  timestamp: { type: Date, default: Date.now },
});

export const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  messageSchema
);
