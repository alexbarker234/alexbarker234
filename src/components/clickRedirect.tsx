// Packages
import React from "react";

import ConvertSVG from "./ConvertSVG";

import { GAME_CSS } from "./css";

interface RedirectProp {
    link: string;
}

/**
 * Displays three lists of tracks.
 *
 * @param {IConvertedTrackObject[][]} trackLists List of lists of tracks to display.
 * @returns {React.FC} Functional React component.
 */
export const clickRedirect: React.FC<RedirectProp> = ({
    link,
}: RedirectProp) => {
    return <meta httpEquiv="refresh" content={`0; url=${link}`} />;
};
