import React from "react";
import SVGWrapper from "./SVGWrapper";
import { BirdProps, BirdSVG } from "./bird";
import { GAME_CSS } from "./css";

interface GameProp {
  progress: number;
  birdProp: BirdProps;
  victory: boolean;
  isSVG?: boolean;
}

export const GameSVG: React.FC<GameProp> = ({ progress, birdProp, victory, isSVG }: GameProp) => {
  const chainStyle: React.CSSProperties = {
    backgroundColor: "rgb(118, 113, 113)",
    width: "5px",
    height: "150px",

    borderRadius: "5px",

    position: "absolute",
    top: "105%",
    left: "10%",

    animation: `${victory ? "swing-small" : "swing"} 5s infinite ease-in-out`,
    transformOrigin: "top"
  };

  const jsx = (
    <div className="game-div">
      <div className="container">
        <div className="fire">
          <div className="flames">
            <div
              className="white"
              style={{ left: "30%", width: "10%", height: "40%", zIndex: 5 }}
            />
            <div
              className="white"
              style={{ left: "60%", width: "20%", height: "60%", zIndex: 5 }}
            />
            <div
              className="yellow"
              style={{ left: "50%", width: "15%", height: "80%", zIndex: 3 }}
            />
            <div
              className="yellow"
              style={{ left: "40%", width: "10%", height: "60%", zIndex: 3 }}
            />
            <div
              className="orange"
              style={{ left: "30%", width: "20%", height: "70%", zIndex: 3 }}
            />
            <div
              className="orange"
              style={{ left: "60%", width: "20%", height: "60%", zIndex: 1 }}
            />
            <div className="red" style={{ left: "60%", width: "20%", height: "80%", zIndex: 1 }} />
            <div className="red" style={{ left: "20%", width: "15%", height: "50%", zIndex: 4 }} />
            <div className="red" style={{ left: "45%", width: "8%", height: "70%", zIndex: 4 }} />
          </div>

          <div className="glow-container">
            <div className="glow" id="glow-1"></div>
            <div className="glow" id="glow-2"></div>
            <div className="glow" id="glow-3"></div>
          </div>

          <div
            className="log"
            style={{
              left: "0%",
              width: "100%",
              height: "10%",
              zIndex: 10,
              transform: "rotate(-10deg)"
            }}
          ></div>
          <div
            className="log"
            style={{
              left: "0%",
              width: "100%",
              height: "10%",
              zIndex: 10,
              transform: "rotate(8deg)"
            }}
          ></div>
        </div>
        {victory ? <BirdSVG {...birdProp} /> : null}
        <div className="hanger">
          <div className="post" id="post-1">
            <div className="post" id="post-2">
              <div className="chain" style={chainStyle}>
                {victory ? null : <BirdSVG {...birdProp} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="box">
        <div
          id="bar-container"
          style={{
            height: `${progress}%`,
            top: `${100 - progress}%`,
            position: "relative"
          }}
        >
          <div id="bar">
            <div id="bar-shine"></div>
          </div>
        </div>
      </div>
      <style>{GAME_CSS}</style>
    </div>
  );

  return isSVG || isSVG == undefined ? (
    <SVGWrapper width="300" height="300">
      {jsx}
    </SVGWrapper>
  ) : (
    jsx
  );
};
