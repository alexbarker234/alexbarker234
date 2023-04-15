import { VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { clickRedirect } from "../components/clickRedirect";
import { ERROR_MESSAGE_500 } from "../config";
import {  addClick  } from "../helpers/dbHelper"
/**
 * Returns an image displaying my current playback state, with nice music bars.
 *
 * @param {VercelRequest} req Request for image.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        // Generating the component and rendering it
        const text: string = renderToString(
            clickRedirect({
                link: "https://github.com/alexbarker234",
            })
        );

        await addClick()

        return res.send(text); // must send response last unfortunately - execution stops after

    } catch (error) {
        console.log(error);
        return res.status(500).send(ERROR_MESSAGE_500);
    }
}
