import React from "react";
import ConvertSVG from "./ConvertSVG";
import { GAME_CSS } from "./css";

export interface BirdProp {
    bodyColor: string;
    wingColor: string;
    isFree: boolean;
}

export const BirdSVG: React.FC<BirdProp> = ({ bodyColor, wingColor, isFree }: BirdProp) => {

    const colorLegBack = "#fd7007"
    const colorLegFront = "#fd9802"

    const torsoWidth = 60;
    const torsoHeight = 50;

    const headWidth = 30;
    const headHeight = 24;

    const legWidth = 5;
    const legHeight = 30;

    const birdStyle: React.CSSProperties = {
        width: "100px",
        height: `${torsoHeight + headHeight + legHeight}px`,
        position: "absolute",
        transformStyle: "preserve-3d",
    };
    if (isFree) birdStyle.transform = "rotateY(180deg)"; // stops overriding the css with this inline css

    const birdTorsoStyle: React.CSSProperties = {
        backgroundColor: bodyColor,
        width: `${torsoWidth}px`,
        height: `${torsoHeight}px`,
        borderRadius: "50px",
        position: "absolute",
        top: `calc(50% - ${torsoWidth / 2}px)`,
        left: `calc(50% - ${torsoHeight / 2}px)`,
    }

    const legStyle: React.CSSProperties = {
        width: `${legWidth}px`,
        height: `${legHeight + 6}px`,
        borderRadius: `${legWidth}px`,
        transformOrigin: "top",

        position: "absolute",
        top: "calc(100% - 6px)",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDuration: "0.3s",
    }

    const legStyle1: React.CSSProperties = {
        backgroundColor: colorLegFront,
        left: "50%",
        animationName: isFree ? "none" : "leg-wiggle-1",
    }
    const legStyle2: React.CSSProperties = {
        backgroundColor: colorLegBack,
        left: "40%",
        zIndex: -1,
        animationName: isFree ? "none" : "leg-wiggle-2",
    }

    const footWidth = 5;
    const footStyle: React.CSSProperties = {
        backgroundColor: "inherit",
        position: "absolute",

        bottom: "0%",
        right: "0%",

        width: "10px",
        height: `${footWidth}px`,
        borderRadius: `${footWidth}px`,
    }


    const headStyle: React.CSSProperties = {
        backgroundColor: "inherit",
        width: `${headWidth}px`,
        height: `${headHeight + 36}px`,
        borderRadius: `${headWidth}px`,

        position: "absolute",
        bottom: "100%",
        transform: "translate(0%, 36px)"
    }

    const eyeStyle: React.CSSProperties = {
        backgroundColor: "white",
        width: "10px",
        height: "10px",
        borderRadius: isFree ? "10px 10px 4px 4px" : "5px 10px 5px 5px",

        position: "absolute",
        left: "50%",
        top: "30%",
        transform: "translate(-50%, -50%)"
    }

    const beakStyle: React.CSSProperties = {
        backgroundColor: colorLegFront,
        width: "20px",
        height: "10px",
        borderRadius: "10px",

        position: "absolute",
        left: "0%",
        top: "40%",
        transform: "translate(-50%, -50%)"
    }
    const wingStyle: React.CSSProperties = {
        backgroundColor: wingColor,
        width: "36px",
        height: "20px",
        borderRadius: "20px 30px 10px 20px",

        position: "absolute",
        left: "40%",
        top: "20%",

        transformOrigin: "20% 50%",
        animation: isFree ? "wing-roast 5s infinite ease-in-out" : "wing-wiggle 1s infinite ease-in-out"
    }

    const marshmallowStyle: React.CSSProperties = {
        backgroundColor: "#f0d6ec",
        width: "10px",
        height: "12px",
        borderRadius: "4px",

        position: "absolute",
        left: "100%",
        top: "50%",
        transform: "translate(-50%,-50%)",
    }
    const stickStyle: React.CSSProperties = {
        backgroundColor: "#4c3828",
        width: "60px",
        height: "5px",
        borderRadius: "5px",

        position: "absolute",
        left: "90%",
        top: "50%",
    }

    return (
        <div className="bird" style={birdStyle} id={isFree ? "free-bird" : "locked-bird"}>
            <div className="torso" style={birdTorsoStyle}>
                <div className="head" style={headStyle}>
                    <div className="beak" style={beakStyle} />
                    <div className="eye" style={eyeStyle} />
                </div>
                <div className="leg" style={Object.assign({}, legStyle, legStyle1)}>
                    <div className="foot" style={footStyle} />
                </div>
                <div className="leg" style={Object.assign({}, legStyle, legStyle2)}>
                    <div className="foot" style={footStyle} />
                </div>
                <div className="wing" style={wingStyle}>
                    {
                        isFree ?
                            (
                                <div className="marshmallow-stick" style={stickStyle}>
                                    <div className="marshmallow" style={marshmallowStyle} />
                                </div>
                            ) : null
                    }
                </div>
            </div>
            <style>
                {
                    `
                    @keyframes leg-wiggle-1 {
                        0% {
                            transform: rotate(-20deg);
                        }
                
                        50% {
                            transform: rotate(20deg);
                        }
                
                        100% {
                            transform: rotate(-20deg);
                        }
                    }
                
                    @keyframes leg-wiggle-2 {
                        0% {
                            transform: rotate(20deg);
                        }
                
                        50% {
                            transform: rotate(-20deg);
                        }
                
                        100% {
                            transform: rotate(20deg);
                        }
                    }
                    
                    @keyframes wing-wiggle {
                        0% {
                            transform: rotate(20deg);
                        }
                
                        50% {
                            transform: rotate(-20deg);
                        }
                
                        100% {
                            transform: rotate(20deg);
                        }
                    }

                    @keyframes wing-roast {
                        0% {
                            transform: rotate(190deg);
                        }
                
                        50% {
                            transform: rotate(170deg);
                        }
                
                        100% {
                            transform: rotate(190deg);
                        }
                    }
                    `
                }
            </style>
        </div>
    );
};