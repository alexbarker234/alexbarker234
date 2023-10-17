import { VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { GameSVG } from "../components/game";
import { ERROR_MESSAGE_500 } from "../config";
import { getCurrentGame } from "../helpers/dbHelper";
import { BirdProps } from "../components/bird";
import React from "react";
import { getDateID } from "../lib/utilities";

import seedrandom, {PRNG} from "seedrandom";

class Bird {
    bodyColor: string;
    wingColor: string;
    constructor(bodyColor: string, wingColor: string) {
        this.bodyColor = bodyColor;
        this.wingColor = wingColor;
    }
}

const birds: Bird[] = [
    new Bird("#009ee9", "#fd9802"), // blue and orange
    new Bird("#fea1aa", "#fd5e6e"), // pink and purple
    new Bird("#4eeeb3", "#249f87"), // green and dark green
    new Bird("#94e9fd", "#f92a7f"), // light blue and pink
    new Bird("#e35336", "#88173e"), // orange and maroon
    new Bird("#afd74f", "#62b897"), // lime and teal
    new Bird("#c72ad7", "#6e2dd6"), // pink and purple
    new Bird("#fcc531", "#7e50c3"), // yellow and purple
];
let rand: PRNG;

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const debug = req.query.debug;
        const game = debug ? { clicks: 2, dateID: Math.random() } : await getCurrentGame();

        const progress = Math.min((game.clicks / 20) * 100, 100);
        rand = seedrandom(game.dateID);

        //console.log(`${game.clicks} / 20 clciks`);
        let hasWon = false;
        if (progress >= 100) hasWon = true;

        const bird = birds[Math.floor(rand() * birds.length)];

        const birdData: BirdProps = {
            isFree: hasWon,

            bodyColor: bird.bodyColor,
            wingColor: bird.wingColor,

            headWidth: randBetween(20, 40),
            headHeight: randBetween(4, 40),

            legWidth: randBetween(5, 10),
            legHeight: randBetween(10, 40),

            headPlumage: {
                style: randBetween(1, 2),
                color: bird.bodyColor,
                spread: 20,
                flipped: randBool(),
                height: randBetween(5, 20)
            },
        };

        const text = renderToString(<GameSVG progress={progress} birdProp={birdData} victory={hasWon} isSVG={!debug} />);

        if (!debug) res.setHeader("Content-Type", "image/svg+xml");
        return res.send(text);
    } catch (error) {
        console.log(error);
        return res.status(500).send(ERROR_MESSAGE_500);
    }
}

const randBetween = (min: number, max: number) => Math.floor(rand() * (max - min + 1) + min);
const randBool = () => rand() > 0.5;
