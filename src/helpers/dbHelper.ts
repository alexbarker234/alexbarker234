import clientPromise from "../lib/mongodb";
import "../extensions/date.extensions";
import Game from "../models/game";
import Stats from "../models/stats";
import { Collection, Filter, Document } from "mongodb";

export const loadGameCollection = async () => {
    try {
        const client = await clientPromise;
        return client.db("githubGame").collection<Game>("games");
    } catch (err) {
        return null;
    }
};

export const loadStatsCollection = async () => {
    try {
        const client = await clientPromise;
        return client.db("githubGame").collection<Stats>("stats");
    } catch (err) {
        return null;
    }
};

export const getCurrentGame = async () => {
    const collection = await loadGameCollection();
    const collectionExt = new CollectionExtended(collection);
    const dateID = getDateID(new Date());

    return await collectionExt.findOneOrUpsert(
        { dateID: dateID },
        { dateID: dateID, clicks: 0 }
    );
};

export const getStats = async () => {
    const collection = await loadStatsCollection();
    const collectionExt = new CollectionExtended(collection);

    return await collectionExt.findOneOrUpsert({}, { totalClicks: 0 });
};

export const addClick = async () => {
    const games = await loadGameCollection();
    const stats = await loadStatsCollection();
    const dateID = getDateID(new Date());

    await games.updateOne(
        { dateID: dateID },
        {
            $inc: { clicks: 1 },
        },
        { upsert: true }
    );

    await stats.updateOne(
        { },
        {
            $inc: { totalClicks: 1 },
        },
        { upsert: true }
    );
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

class CollectionExtended<Document> {
    collection: Collection<Document>;

    constructor(collection: Collection<Document>) {
        this.collection = collection;
    }
    findOneOrUpsert = async function (
        filter: Filter<Document>,
        setOnUpsert: object
    ) {
        const options = { upsert: true, returnNewDocument: true };
        const update = { $setOnInsert: setOnUpsert };
        let result = await this.collection.findOneAndUpdate(
            filter,
            update,
            options
        );

        // try find a way to just get the upserted object
        if (!result.lastErrorObject.updatedExisting)
            result = await this.collection.findOneAndUpdate(
                filter,
                update,
                options
            );

        return result.value;
    };
}

// gotta learn how to cast better
/*class CollectionExtended<Document> extends Collection<Document> {
    findOneOrUpsert = async function (
        filter: Filter<Document>,
        setOnUpsert: object
    ) {
        const options = { upsert: true, returnNewDocument: true };
        const update = { $setOnInsert: setOnUpsert };
        let result = await this.findOneAndUpdate(filter, update, options);

        // try find a way to just get the upserted object
        if (!result.lastErrorObject.updatedExisting)
            result = await this.findOneAndUpdate(filter, update, options);

        return result.value;
    };
}*/
