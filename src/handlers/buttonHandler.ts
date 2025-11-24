import { VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { ButtonSVG } from "../components/button";
import { ERROR_MESSAGE_500 } from "../config";

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const text: string = renderToString(ButtonSVG({}));

    res.setHeader("Content-Type", "image/svg+xml");

    return res.send(text);
  } catch (error) {
    console.log(error);
    return res.status(500).send(ERROR_MESSAGE_500);
  }
}
