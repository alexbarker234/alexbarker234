import { VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { GameSVG } from "../components/game";
import { ERROR_MESSAGE_500 } from "../config";
import { getCurrentGame } from "../helpers/dbHelper";
import { BirdProps } from "../components/bird";
import { SeededRandom } from "../lib/random";
import React from "react";

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
  new Bird("#fcc531", "#7e50c3") // yellow and purple
];

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const debug =
      typeof req.query.debug == "string" ? req.query.debug.toLowerCase() === "true" : false;
    const win =
      debug && (typeof req.query.win == "string" ? req.query.win.toLowerCase() === "true" : false);

    console.log({ debug, win });

    const game = debug ? { clicks: 2, dateID: Math.random() } : await getCurrentGame();

    const progress = Math.min((game.clicks / 20) * 100, 100);
    const rand = new SeededRandom(game.dateID);

    //console.log(`${game.clicks} / 20 clciks`);
    let hasWon = win;
    if (progress >= 100) hasWon = true;

    const bird = birds[Math.floor(rand.rand() * birds.length)];

    const birdData: BirdProps = {
      isFree: hasWon,

      bodyColor: bird.bodyColor,
      wingColor: bird.wingColor,

      headWidth: rand.randBetween(20, 40),
      headHeight: rand.randBetween(25, 60),

      legWidth: rand.randBetween(5, 10),
      legHeight: rand.randBetween(10, 40),

      torsoWidth: rand.randBetween(40, 80),
      torsoHeight: rand.randBetween(30, 50),

      headPlumage: {
        style: rand.randBetween(1, 2),
        color: bird.bodyColor,
        spread: 20,
        flipped: rand.randBool(),
        height: rand.randBetween(5, 20)
      }
    };

    // 1 in 10 chance for Tall Bird
    if (rand.rand() < 0.1) {
      birdData.torsoWidth = rand.randBetween(40, 60);
      birdData.torsoHeight = rand.randBetween(60, 120);
    }

    const text = renderToString(
      <GameSVG progress={progress} birdProp={birdData} victory={hasWon} isSVG={!debug} />
    );

    if (!debug) res.setHeader("Content-Type", "image/svg+xml");
    return res.send(text);
  } catch (error) {
    console.log(error);
    return res.status(500).send(ERROR_MESSAGE_500);
  }
}
