import React from "react";
import ConvertSVG from "./ConvertSVG";
import { GAME_CSS } from "./css";

interface BirdProp {
    color: string;
}

export const BirdSVG: React.FC<BirdProp> = ({ color }: BirdProp) => {

    const colorLegBack = "#fd7007"
    const colorLegFront = "#fd9802"

    const birdStyle: React.CSSProperties = {
        width: "200px",
        height: "200px",
        position: "absolute"
    };

    const torsoWidth = 60;
    const torsoHeight = 50;
    const birdTorsoStyle: React.CSSProperties = {
        backgroundColor: color,
        width: `${torsoWidth}px`,
        height: `${torsoHeight}px`,
        borderRadius: "50px",
        position: "absolute",
        top:`calc(50% - ${torsoWidth / 2}px)`,
        left:`calc(50% - ${torsoHeight / 2}px)`,
    }

    const legWidth = 5;
    const legStyle: React.CSSProperties = {
        width: `${legWidth}px`,
        height: "30px",
        borderRadius: `${legWidth}px`,
        transformOrigin: "top",

        position: "absolute",
        top: "90%",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDuration: "0.3s",
    }

    const legStyle1: React.CSSProperties = {
        backgroundColor: colorLegFront,
        left: "50%",
        animationName: "leg-wiggle-1",
    }
    const legStyle2: React.CSSProperties = {
        backgroundColor: colorLegBack,
        left: "40%",
        zIndex: -1,
        animationName: "leg-wiggle-2",
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

    const headWidth = 30;
    const headStyle: React.CSSProperties = {
        backgroundColor: color,
        width: `${headWidth}px`,
        height: "60px",
        borderRadius: `${headWidth}px`,

        position: "absolute",
        bottom: "100%",
        transform: "translate(0%, 36px)"
    }

    const eyeStyle: React.CSSProperties = {
        backgroundColor: "white",
        width: "10px",
        height: "10px",
        borderRadius: "5px 10px 5px 5px",

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
        backgroundColor: colorLegFront,
        width: "36px",
        height: "20px",
        borderRadius: "20px 30px 10px 20px",

        position: "absolute",
        left: "40%",
        top: "20%",

        transformOrigin: "20% 50%",
        animation: "wing-wiggle 1s infinite ease-in-out"
    }
    return (
        <div className="bird" style={birdStyle}>
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
                <div className="wing" style={wingStyle}/>
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
                    `
                }
            </style>
        </div>
    );
};

const BIRD_CSS = function (primaryColor: string) {
    return `:root {
        --bird-color: ${primaryColor};

        --bird-color-leg-1: #fd9802;
        --bird-color-leg-2: #fd7007;

    }

    body {
        background-color: rgb(24, 24, 34);
    }

    .bird {
        position: absolute;
        top: 50%;
        left: 50%;
    }

    .bird * {
        position: absolute;
    }

    .torso {
        background-color: var(--bird-color);
        width: 60px;
        height: 50px;
        border-radius: 50px;
    }

    .leg {
        --leg-width: 5px;
        width: var(--leg-width);
        height: 30px;
        border-radius: var(--leg-width);
        transform-origin: top;

        top: 90%;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-duration: 0.3s;
    }

    /* legs */
    #leg-1 {
        background-color: var(--bird-color-leg-1);
        left: 50%;

        animation-name: leg-wiggle-1;
    }

    #leg-2 {
        background-color: var(--bird-color-leg-2);
        left: 40%;

        z-index: -1;

        animation-name: leg-wiggle-2;
    }

    .foot {
        --foot-width: 5px;

        background-color: inherit;
        position: absolute;

        bottom: 0%;
        right: 0%;

        width: 10px;
        height: var(--foot-width);
        border-radius: var(--foot-width);
    }

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

    /* head */
    .head {
        --head-width: 30px;

        background-color: var(--bird-color-1);
        width: var(--head-width);
        height: 60px;
        border-radius: var(--head-width);

        position: absolute;
        bottom: 100%;
        transform: translate(0%, 36px)
    }

    .eye {
        background-color: white;
        width: 10px;
        height: 10px;
        border-radius: 5px 10px 5px 5px;

        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%)
    }

    .beak {
        background-color: var(--bird-color-leg-1);
        width: 20px;
        height: 10px;
        border-radius: 10px;

        position: absolute;
        left: 0%;
        top: 40%;
        transform: translate(-50%, -50%)
    }

    /* wings */
    #wing-1 {
        background-color: var(--bird-color-leg-1);
        width: 36px;
        height: 20px;
        border-radius: 20px 30px 10px 20px;

        position: absolute;
        left: 40%;
        top: 20%;

        transform-origin: 20% 50%;
        animation: wing-wiggle 1s infinite ease-in-out
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
    `
}