import { VercelRequest, VercelResponse } from "@vercel/node";
import { ERROR_MESSAGE_500 } from "../config";
import { addClick } from "../helpers/dbHelper";

/**
 * @param {VercelRequest} req Request for image.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
    try {
        await addClick();

        return res.redirect("https://github.com/alexbarker234");
    } catch (error) {
        console.log(error);
        return res.status(500).send(ERROR_MESSAGE_500);
    }
}
