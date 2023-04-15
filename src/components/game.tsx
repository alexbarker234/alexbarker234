// Packages
import React from "react";

import ConvertSVG from "./ConvertSVG";

import { GAME_CSS } from "./css";

interface TestProp {
    progress: number;
}

/**
 * Displays three lists of tracks.
 *
 * @param {IConvertedTrackObject[][]} trackLists List of lists of tracks to display.
 * @returns {React.FC} Functional React component.
 */
export const GameSVG: React.FC<TestProp> = ({ progress }: TestProp) => {
    return (
        <ConvertSVG width="200" height="400">
            <div id="content">
                <img
                    src="https://cdn.discordapp.com/attachments/1068539620951855214/1096468448122515499/image.png"
                    height="80px"
                    width="80px"
                />
                <div id="box">
                    <div
                        id="bar-container"
                        style={{
                            height: `${progress}%`,
                            top: `${100 - progress}%`,
                            position: "relative",
                        }}
                    >
                        <div id="bar">
                            <div id="bar-stripes"></div>
                        </div>
                    </div>
                </div>
                <div id="button-container">
                    <div id="button-text">Save the slime!</div>
                    <a href="/click" />
                </div>
            </div>

            <style>{GAME_CSS()}</style>
        </ConvertSVG>
    );
};
