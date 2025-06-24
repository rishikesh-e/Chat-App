import express, { Request, Response } from "express";
import { User } from "../../models/user";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();

router.get("/", verifyToken, async (_req: Request, res: Response) => {
  try {
    const users = await User.find(
      {},
      "-password -__v -otp -otpVerified -otpGeneratedAt"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
