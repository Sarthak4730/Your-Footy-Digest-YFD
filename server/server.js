import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamsRoutes.js";
import mongoose from "mongoose";
import cron from "node-cron";
import { fetchAndStoreTeams } from "./utils/fetchTeams.js";
import Team from "./models/Team.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Your Footy Digest (YFD) '/' GET-API");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log("MongoDB Atlas Connection Success, server running on port =", PORT));
    })
    .catch((err) => console.error("MongoDB Atlas Connection Failure: ", err));

cron.schedule("0 0 1 8 *", async () => {
    console.log("Running yearly new-season august node-cron job");
    await fetchAndStoreTeams();
});

(async () => {
    const count = await Team.countDocuments();
    if(count == 0) {
        console.log("Since teams-database is empty, fetching teams-data");
        await fetchAndStoreTeams();
    }
})();