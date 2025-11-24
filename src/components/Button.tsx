import React from "react";
import { BUTTON_CSS } from "../lib/cssLoader";
import SVGWrapper from "./SVGWrapper";

export const ButtonSVG: React.FC = () => {
  return (
    <SVGWrapper width="160" height="48">
      <div id="content">
        <div id="button-container">
          <div id="button-text">Save the bird!</div>
        </div>
      </div>

      <style>{BUTTON_CSS}</style>
    </SVGWrapper>
  );
};
