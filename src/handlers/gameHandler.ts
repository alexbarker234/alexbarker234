import { VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { GameSVG } from "../components/game";
import { ERROR_MESSAGE_500 } from "../config";
import { getCurrentGame } from "../helpers/dbHelper";
import { getImageData } from "../helpers/image";

export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        const game = await getCurrentGame();
        const progress = (game.clicks / 20) * 100;

        //console.log(`${game.clicks} / 20 clciks`);

        // will be updated
        const image = await getImageData("https://cdn.discordapp.com/attachments/1068539620951855214/1096468448122515499/image.png")

        const text: string = renderToString(
            GameSVG({
                progress: progress,
                image: image
            })
        );

        res.setHeader("Content-Type", "image/svg+xml");

        return res.send(text);
    } catch (error) {
        console.log(error);
        return res.status(500).send(ERROR_MESSAGE_500);
    }
}
