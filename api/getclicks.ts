import { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../src/handlers/clickHandler";

/**
 * Returns an image displaying my top five played tracks for three various time ranges.
 *
 * @param {VercelRequest} req Request for image.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
    return handler(req, res);
}
