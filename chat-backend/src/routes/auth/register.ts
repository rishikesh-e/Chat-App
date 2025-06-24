import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../models/user";

const router = express.Router();

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

router.post(
  "/register",
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        required: ["name", "email", "password"],
      });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already registeres" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
