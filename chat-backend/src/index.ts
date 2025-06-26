import express from "express";
import connectDB from "./config/db";
import login from "./routes/auth/login";
import register from "./routes/auth/register";
import verify from "./routes/auth/verifyOtp";
import reset from "./routes/auth/resetPassword";
import forgot from "./routes/auth/forgot";
import home from "./routes/user/getAllUsersRoute";
import completeProfile from "./routes/user/completeProfile";
import chatRoute from "./routes/chat/chatRoute";
import messageRoutes from "./routes/chat/messageRoute";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./sockets/socket";
import userRoutes from "./routes/user/userRoute";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allowing React to fetch the Backend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;
const mail = process.env.EMAIL_USER || "r";

// Connecting MongoDB => chat-db
(async () => {
  try {
    await connectDB();

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    // Setup socket listeners
    setupSocket(io);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(mail);
    });

    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} already in use`);
        console.log("Trying alternate port...");
        app.listen(0);
      } else {
        console.error("Server error:", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Fatal startup error:", error);
    process.exit(1);
  }
})();

// Auth routes - Login, Register, Forgot Password, Verify OTP, Reset Password
app.use("/api/auth", login);
app.use("/api/auth", register);
app.use("/api/auth", forgot);
app.use("/api/auth", verify);
app.use("/api/auth", reset);

// Service pages - Home(get all users) and completeProfile
app.use("/api/users", home);
app.use("/api", completeProfile);
app.use("/api", userRoutes);

// Chat and Message routes
app.use("/api", chatRoute);
app.use("/api", messageRoutes);
