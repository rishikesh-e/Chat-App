import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

interface LoginRequestBody {
  email: string;
  password: string;
}

router.post(
  "/login",
  async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    try {
      const user = await User.findOne({ email }).lean();
      if (!user)
        return res.status(401).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid email or password" });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (e) {
      console.error("Login error:", e);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
