export default function getCurrentSeasonYear() {
    const now = new Date();
    return now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear()-1;
}