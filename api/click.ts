import { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../src/handlers/clickHandler";

/**
 * @param {VercelRequest} req Request for image.
 * @param {VercelResponse} res Response to request.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
  return handler(req, res);
}
