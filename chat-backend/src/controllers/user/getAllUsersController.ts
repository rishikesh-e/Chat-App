import { Request, Response } from "express";
import { User } from "../../models/user";

interface CustomRequest extends Request {
  userId?: string;
}

export const getAllUsers = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid user credentials",
      });
    }

    const users = await User.find(
      {},
      "-password -__v -otp -otpVerified -otpGeneratedAt -refreshToken"
    ).lean();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
