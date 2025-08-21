import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    clubId: {
        type: Number,
        required: true,
        unique: true
    },
    logo: String,
    clubName: String,
    league: String,
    leagueRank: Number,
});

export default mongoose.model("Team", teamSchema);