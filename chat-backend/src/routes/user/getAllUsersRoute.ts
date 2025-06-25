import express, { Request, Response } from "express";
import { User } from "../../models/user";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    if (!(req as any).userId) {
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
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
});

export default router;
