import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChat extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const chatSchema: Schema<IChat> = new mongoose.Schema<IChat>({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  updatedAt: { type: Date, default: Date.now },
});

export const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);
