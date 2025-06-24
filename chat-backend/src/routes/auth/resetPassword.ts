import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../models/user";

const router = express.Router();

interface ResetPasswordHandler {
  email: string;
  newPassword: string;
}

router.post(
  "/reset-password",
  async (req: Request<{}, {}, ResetPasswordHandler>, res: Response) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and new password required",
      });
    }

    try {
      const user = await User.findOne({ email });
      if (!user || !user.otpVerified) {
        return res.status(400).json({ message: "OTP not verified" });
      }

      user.password = await bcrypt.hash(newPassword, 12);
      user.otp = undefined;
      user.otpGeneratedAt = undefined;
      user.otpVerified = false;

      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
