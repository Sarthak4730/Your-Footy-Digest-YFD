import axios from "axios";
import getCurrentSeasonYear from "./getSeasonYear.js";
import Team from "../models/Team.js";

const leagues = [
    {leagueRank: 1, id: 39, name: "Premier League"},
    {leagueRank: 2, id: 140, name: "La Liga"},
    {leagueRank: 3, id: 78, name: "Bundesliga"},
    {leagueRank: 4, id: 135, name: "Serie A"},
    {leagueRank: 5, id: 61, name: "Ligue 1"},
];
const seasonYear = getCurrentSeasonYear();

export async function fetchAndStoreTeams() {
    try {
        console.log("Fetching teams-data for the season-year =", seasonYear);
        for (const league of leagues) {
            const res = await axios.get(
                `https://api-football-v1.p.rapidapi.com/v3/teams?league=${league.id}&season=${seasonYear}`,
                {
                    headers: {
                        "x-rapidapi-key": process.env.RAPID_API_KEY,
                        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
                    }
                }
            );
            console.log("RapidAPI Key: ", process.env.RAPID_API_KEY);

            const teamsData = res.data.response.map((t) => {
                return {
                    clubId: t.team.id,
                    logo: t.team.logo,
                    clubName: t.team.name,
                    league: league.name,
                    leagueRank: league.leagueRank,
                }
            });

            for(const team of teamsData) {
                await Team.updateOne(
                    { clubId: team.clubId },
                    { $set: team },
                    { upsert: true }
                );
            }
        }
        console.log("Success in fetching and storing Teams");
    } catch (err) {
        console.error("Failure in fetching and storing Teams", err.message);
    }
}