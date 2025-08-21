import Team from "../models/Team.js";

const gotTeamsOrNot = async (req, res) => {
    try {
        const teams = await Team.find().sort({ leagueRank: 1, clubName: 1 });
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json( { message: "Failed fetching teams sad.", error: err.message } );
    }
}

export default gotTeamsOrNot;