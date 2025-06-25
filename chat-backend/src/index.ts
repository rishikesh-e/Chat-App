import express from "express";
import connectDB from "./config/db";
import login from "./routes/auth/login";
import register from "./routes/auth/register";
import verify from "./routes/auth/verifyOtp";
import reset from "./routes/auth/resetPassword";
import bodyParser from "body-parser";
import forgot from "./routes/auth/forgot";
import home from "./routes/services/home";
import info from "./routes/services/info";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
const mail = process.env.EMAIL_USER || "r";

(async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
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

app.use("/api/auth", login);
app.use("/api/auth", register);
app.use("/api/auth", forgot);
app.use("/api/auth", verify);
app.use("/api/auth", reset);
app.use("/api/home", home);
app.use("/api", info);
