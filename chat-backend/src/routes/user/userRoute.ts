import express from "express";
import { verifyToken } from "../../middleware/auth";
import { User } from "../../models/user";
import { Request, Response } from "express";

const router = express.Router();

router.get(
  "/user/:userId",
  verifyToken,
  async (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId).select("-__v");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user by ID", error });
    }
  }
);
router.get(
  "/user/name/:name",
  verifyToken,
  async (req: Request<{ name: string }>, res: Response) => {
    const { name } = req.params;

    try {
      const user = await User.findOne({
        name: { $regex: `^${name}$`, $options: "i" },
      }).select("-__v");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user by name", error });
    }
  }
);

export default router;
