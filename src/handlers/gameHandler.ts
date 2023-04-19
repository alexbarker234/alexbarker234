import { VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { GameSVG } from "../components/game";
import { ERROR_MESSAGE_500 } from "../config";
import { getCurrentGame } from "../helpers/dbHelper";
import { getImageData } from "../helpers/image";
import { BirdProp } from "../components/bird";

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const game = await getCurrentGame();
        const progress = Math.min((game.clicks / 20) * 100, 100);

        //console.log(`${game.clicks} / 20 clciks`);
        let hasWon = false;
        if (progress >= 100) hasWon = true;

        const birdData: BirdProp = {
            bodyColor: "#009ee9",
            wingColor: "#fd9802",
            isFree: hasWon
        }

        const text: string = renderToString(
            GameSVG({
                progress: progress,
                birdProp: birdData,
                victory: hasWon
            })
        );
        res.setHeader("Content-Type", "image/svg+xml");

        return res.send(text);
    } catch (error) {
        console.log(error);
        return res.status(500).send(ERROR_MESSAGE_500);
    }
}
