import express, { Request, Response } from "express";
import { User } from "../../models/user";

const router = express.Router();

interface OtpHandlerBody {
  email: string;
  otp: string;
}

router.post(
  "/verify-otp",
  async (req: Request<{}, {}, OtpHandlerBody>, res: Response) => {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    try {
      const user = await User.findOne({ email });
      if (!user || user.otp !== otp) {
        return res.status(400).json({
          message: "Invalid OTP",
        });
      }

      const now = new Date().getTime();
      const generated = new Date(user.otpGeneratedAt!).getTime();

      if (now - generated > 10 * 60 * 1000) {
        return res.status(400).json({
          message: "OTP expired",
        });
      }

      user.otpVerified = true;
      await user.save();

      res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
      console.error("OTP verification error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
