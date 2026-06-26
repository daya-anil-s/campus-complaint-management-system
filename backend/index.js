import dns from "node:dns";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

dotenv.config();

// Force Node to use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.send("CCMS Backend Running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});