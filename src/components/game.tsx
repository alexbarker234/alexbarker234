import React from "react";
import ConvertSVG from "./ConvertSVG";
import { GAME_CSS } from "./css";

interface GameProp {
    progress: number;
    image: string;
}

export const GameSVG: React.FC<GameProp> = ({ progress, image }: GameProp) => {
    return (
        <ConvertSVG width="200" height="300">
            <div id="content">
                <img
                    src={image}
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
            </div>

            <style>{GAME_CSS}</style>
        </ConvertSVG>
    );
};
