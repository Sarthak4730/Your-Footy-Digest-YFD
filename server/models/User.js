import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    favs: [ {
        clubId: {
            type: Number,
            required: true,
            unique: true
        },
        logo: String,
        clubName: String,
        league: String,
        leagueRank: Number,
    } ],
}, { timestamps: true });

export default mongoose.model("User", userSchema);