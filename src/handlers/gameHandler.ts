import { VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { GameSVG } from "../components/game";
import { ERROR_MESSAGE_500 } from "../config";
import {  getCurrentGame  } from "../helpers/dbHelper"

/**
 * Returns an image displaying my current playback state, with nice music bars.
 *
 * @param {VercelRequest} req Request for image.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const game = await getCurrentGame();
        const progress = (game.clicks / 20) * 100

        console.log(`${game.clicks} / 20 clciks`)

        const text: string = renderToString(
            GameSVG({
                progress: progress,
            })
        );

        return res.send(text);
    } catch (error) {
        console.log(error);
        return res.status(500).send(ERROR_MESSAGE_500);
    }
}
