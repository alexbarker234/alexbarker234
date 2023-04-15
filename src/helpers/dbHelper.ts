import clientPromise from "../lib/mongodb";
import "../extensions/date.extensions";
import Game from "../models/game";
import { Collection } from "mongodb";

export const loadGameCollection = async () => {
    try {
        const client = await clientPromise;
        return client.db("gitHubDB").collection<Game>("clicker");
    } catch (err) {
        return null;
    }
};

export const getCurrentGame = async () => {
    const collection = await loadGameCollection();
    const dateID = getDateID(new Date());

    const query = { dateID: dateID };
    const options = { upsert: true, returnNewDocument:true };
    const update =  { $setOnInsert: { dateID: dateID, clicks: 0 } }
    let result = await collection.findOneAndUpdate(query, update, options);

    // try find a way to just get the upserted object
    if (!result.lastErrorObject.updatedExisting)
        result = await collection.findOneAndUpdate(query, update, options);

    return result.value
};

export const addClick = async () => {
    const collection = await loadGameCollection();
    const dateID = getDateID(new Date());

    const query = { dateID: dateID };
    const options = { upsert: true };
    const update = {
        $inc: {
            clicks: 1,
        },
    };

    await collection.updateOne(query, update, options);
};

let getDateID = (date: Date): string =>
    `Y${date.getFullYear()}-W${date.getWeek()}`;

class TimeSpan {
    ms: number;

    constructor(startDate: Date, endDate: Date) {
        this.ms = endDate.getTime() - startDate.getTime();
    }

    getTotalMinutes = () => Math.floor(this.ms / 6000);
    getMinutes = () => this.getTotalMinutes() % 60;

    getTotalHours = () => Math.floor(this.ms / 3600000) % 24;
    getHours = () => this.getTotalHours() % 24;

    getDays = () => Math.floor(this.ms / 86400000);
}
