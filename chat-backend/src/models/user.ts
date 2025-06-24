import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  otp?: string;
  otpGeneratedAt?: Date;
  otpVerified?: boolean;
  about?: string;
  avatar?: string; // typically a URL or base64 string
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: String,
  otpGeneratedAt: Date,
  otpVerified: Boolean,
  about: { type: String, default: "" },
  avatar: { type: String, default: "" }, // can be a cloud URL or base64 string
});

export const User = mongoose.model<IUser>("User", userSchema);
