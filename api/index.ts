/*import { VercelRequest, VercelResponse } from "@vercel/node";

import clientPromise from "../src/lib/mongodb";

import Game from "../src/models/game";

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        res.send("done");

        const client = await clientPromise;
        const db = client.db("gitHubDB");
        const collection = db.collection("clicker");

        let date = new Date();
        var startOfYear = new Date(date.getFullYear(), 0, 1);
        let week = Math.ceil(
            ((date.getTime() - startOfYear.getTime()) / 86400000 +
                startOfYear.getDay() +
                1) /
                7
        );

        let nextWeek = new Date(date.getFullYear(), 0, week * 7 + 1);
        const timeUntilNextMS = nextWeek.getTime() - date.getTime();

        const minutes = Math.floor(timeUntilNextMS / 6000) % 60;
        const hours = Math.floor(timeUntilNextMS / 3600000) % 24;
        const days = Math.floor(timeUntilNextMS / 86400000);

        const untilNextWeek = `Game ends in ${days}d, ${hours}h ${minutes}m`;
        //res.send(untilNextWeek);

        let dateID = `Y${date.getFullYear()}-W${week}`;

        console.log(`week: ${dateID}`);

        const query = { dateID: dateID };
        const found = await collection.findOne(query);
        if (found) {
            console.log("game exists");
            found;
        } else {
            console.log("game doesnt exist, creating");

            const game = new Game(dateID);
            const result = await collection.insertOne(game);
        }
    } catch (e) {}
}
*/