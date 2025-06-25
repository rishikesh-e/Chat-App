import multer from "multer";
import express, { Request, Response } from "express";
import { verifyToken } from "../../middleware/auth";
import { User } from "../../models/user";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.patch(
  "/complete-profile",
  verifyToken,
  upload.single("avatar"),
  async (req: Request, res: Response) => {
    try {
      const { about } = req.body;
      const avatar = req.file?.path;

      const user = await User.findByIdAndUpdate(
        (req as any).userId,
        {
          avatar: avatar || "",
          about,
          profileComplete: true,
        },
        { new: true }
      ).select("-password");

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Profile update failed" });
    }
  }
);

export default router;
