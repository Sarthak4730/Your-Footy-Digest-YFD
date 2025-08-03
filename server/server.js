import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Your Footy Digest YFD-GET-API");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log("MongoDB Atlas Connection Success, server running on port =", PORT));
    })
    .catch((err) => console.error("MongoDB Atlas Connection Failure: ", err));