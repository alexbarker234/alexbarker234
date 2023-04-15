import React from "react";
import ConvertSVG from "./ConvertSVG";
import { BUTTON_CSS } from "./css";

export const ButtonSVG: React.FC = () => {
    return (
        <ConvertSVG width="160" height="48">
            <div id="content">
                <div id="button-container">
                    <div id="button-text">Save the slime!</div>
                </div>
            </div>

            <style>{BUTTON_CSS}</style>
        </ConvertSVG>
    );
};
