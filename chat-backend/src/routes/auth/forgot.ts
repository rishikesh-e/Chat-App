import express, { Request, Response } from "express";
import { User } from "../../models/user";
import nodemailer from "nodemailer";

const router = express.Router();

interface PasswordRecoveryBody {
  email: string;
}

router.post(
  "/forgot-password",
  async (req: Request<{}, {}, PasswordRecoveryBody>, res: Response) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "User with this mail not found",
        });
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpGeneratedAt = new Date();
      user.otpVerified = false;

      await user.save();
      await sendOtpMail(email, otp);

      res.status(200).json({
        message: "OTP sent to email",
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

const sendOtpMail = async (email: string, otp: string) => {
  try {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Email credentials not configured");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp}`,
      html: `<b>Your OTP is: ${otp}</b>`, // HTML version
    });
  } catch (error) {
    console.error("Email sending error:", error);
    throw error; // Rethrow to handle in the route
  }
};

export default router;
