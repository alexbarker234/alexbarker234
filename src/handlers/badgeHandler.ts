import { VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { ButtonSVG } from "../components/button";
import { ERROR_MESSAGE_500 } from "../config";
import { getStats } from "../helpers/dbHelper";
import fetch from "node-fetch";

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    let badge;

    if (req.query.badge == "totalClicks") {
      badge = await totalClickBadge();
    } else {
      res.status(404);
      res.send("Badge type not found");
      return;
    }

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(badge);
  } catch (error) {
    console.log(error);
    return res.status(500).send(ERROR_MESSAGE_500);
  }
}

const totalClickBadge = async function () {
  const stats = await getStats();
  const response = await fetch(
    `https://img.shields.io/badge/Total%20Clicks-${stats.totalClicks}-blue.svg?style=for-the-badge&logo=cliqz`
  );
  return await response.text();
};
