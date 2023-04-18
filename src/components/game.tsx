import React from "react";
import ConvertSVG from "./ConvertSVG";
import { BirdSVG, BirdProp } from "./bird";


interface GameProp {
    progress: number;
    birdProp: BirdProp;
}

export const GameSVG: React.FC<GameProp> = ({ progress, birdProp }: GameProp) => {
    return (
        <ConvertSVG width="250" height="300">
            <div className="container">
                <div className="fire">
                    <div className="flames">
                        <div className="white" style={{ left: "30%", width: "10%", height:"40%", zIndex:5 }} />
                        <div className="white" style={{ left: "60%", width: "20%", height:"60%", zIndex:5 }} />
                        <div className="yellow" style={{ left: "50%", width: "15%", height:"80%", zIndex:3 }} />
                        <div className="yellow" style={{ left: "40%", width: "10%", height:"60%", zIndex:3 }} />
                        <div className="orange" style={{ left: "30%", width: "20%", height:"70%", zIndex:3 }} />
                        <div className="orange" style={{ left: "60%", width: "20%", height:"60%", zIndex:1 }} />
                        <div className="red" style={{ left: "60%", width: "20%", height:"80%", zIndex:1 }} />
                        <div className="red" style={{ left: "20%", width: "15%", height:"50%", zIndex:4 }} />
                        <div className="red" style={{ left: "45%", width: "8%", height:"70%", zIndex:4 }} />
                    </div>

                    <div className="glow-container">
                        <div className="glow" id="glow-1"></div>
                        <div className="glow" id="glow-2"></div>
                        <div className="glow" id="glow-3"></div>
                    </div>

                    <div className="log" style={{ left: "0%", width: "100%", height:"10%", zIndex:10, transform: "rotate(-10deg)" }}></div>
                    <div className="log" style={{ left: "0%", width: "100%", height:"10%", zIndex:10, transform: "rotate(8deg)" }}></div>

                </div>

                <div className="hanger">
                    <div className="post" id="post-1">
                        <div className="post"id="post-2">
                            <div className="chain">
                                <BirdSVG {...birdProp}/>
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
                        position: "relative",
                    }}
                >
                    <div id="bar">
                        <div id="bar-shine"></div>
                    </div>
                </div>
            </div>
            <style>{GAME_CSS}</style>
        </ConvertSVG>
    );
};

const GAME_CSS = 
`
:root {
    --fire-white: #ffffff;
    --fire-yellow: #ffef52;
    --fire-orange: #ffc502;
    --fire-red: #ff7644;
}

body {
    background-color: rgb(24, 24, 34);
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height:300px;
    overflow:hidden;
}

.white {
    background-color: var(--fire-white);
    border: var(--fire-yellow);
}

.yellow {
    background-color: var(--fire-yellow);
    border: var(--fire-orange);
}

.orange {
    background-color: var(--fire-orange);
    border: var(--fire-yellow);
}

.red {
    background-color: var(--fire-red);
    border: var(--fire-orange);
}

.fire {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    z-index: -1;
    overflow: hidden;

    bottom:0%;
    left:20%;
}

.fire * {
    position: absolute;
    border-radius: 32px;

    width: inherit;
    height: inherit;
}

.log {
    background-color: #411425;
    bottom: 10%;
}

.glow-container {
    opacity: 0.2;
    animation: glow 0.2s infinite;
}

.glow {
    z-index: -1;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

#glow-1 {
    background-color: red;
    width: 100%;
    height: 100%;
}

#glow-2 {
    background-color: rgb(255, 85, 12);
    width: 80%;
    height: 80%;
}

#glow-3 {
    background-color: rgb(255, 110, 43);
    width: 60%;
    height: 60%;
}

.flames * {
    animation: fire -1s 1.4s linear infinite;
    transform-origin: bottom;
    bottom: 10%;
}

.flames *:nth-child(1) {
    animation-duration: 1s;
    animation-delay: -1s;
}

.flames *:nth-child(2) {
    animation-duration: 1.2s;
    animation-delay: -0.1s;
}

.flames *:nth-child(3) {
    animation-duration: 1.1s;
    animation-delay: -0.2s;
}

.flames *:nth-child(4) {
    animation-duration: 1s;
    animation-delay: -0s;
}

.flames *:nth-child(5) {
    animation-duration: 1.4s;
    animation-delay: -1s;
}

.flames *:nth-child(6) {
    animation-duration: 1s;
    animation-delay: -0.3s;
}

.flames *:nth-child(7) {
    animation-duration: 1.4s;
    animation-delay: -0.15s;
}

.flames *:nth-child(8) {
    animation-duration: 0.8s;
    animation-delay: -0.36s;
}

.flames *:nth-child(9) {
    animation-duration: 1.3s;
    animation-delay: -0.77s;
}

/* hanger */
.post {
    background-color: #411425;
    position: absolute;

    box-shadow: -5px 5px#571e34;
}
#post-1 {
    width: 20px;
    height: 305px;

    right: 0%;
    bottom: 0%;
}
#post-2 {
    width: 100px;
    height: 25px;

    right:100%;   
}
.chain {
    background-color: rgb(118, 113, 113);
    width: 5px;
    height: 150px;

    border-radius:5px;

    position: absolute;
    top: 105%;
    left: 10%;

    animation: swing 5s infinite ease-in-out;
    transform-origin: top;
}

.bird {
    position: absolute;
    top:100%;
    transform: translate(-50%,-50%) scale(0.8);
}

/* animations */

@keyframes swing {
    0% {
        transform: rotate(10deg)
    }
    50% {
        transform: rotate(-10deg)
    }
    100% {
        transform: rotate(10deg)
    }
}

@keyframes fire {
    0% {
        transform: scaleY(1);
    }

    28% {
        transform: scaleY(0.7);
    }

    38% {
        transform: scaleY(0.9);
    }

    50% {
        transform: scaleY(0.8);
    }

    70% {
        transform: scaleY(0.95);
    }

    82% {
        transform: scaleY(0.78);
    }

    100% {
        transform: scaleY(1);
    }
}

@keyframes glow {
    0% {
        transform: scale(1)
    }

    50% {
        transform: scale(0.95)
    }

    100% {
        transform: scale(1)
    }
}

/* progress bar */
#box {
    --box-width: 20px;
    width: var(--box-width);
    height: 280px;

    position: absolute;
    top: 10px;
    left: calc(100% - var(--box-width));

    border: 3px #2f366f solid;
    background-color: #2f366f;
    position: relative;
    border-radius: 2rem;
}

#bar {
    animation: rise 1s;
    width: 100%;
    height: 100%;
    position: relative;

    overflow: hidden;
    background-color: #47eea4;

    border-radius: 2rem;
}

#bar-shine {
    width: 40%;
    height: 80%;
    border-radius: 2rem;

    position: absolute;
    top: 10%;
    left: 14%;

    background-color: #ffffff;
}

@keyframes rise {
    0% {
        height: 0;
        top: 100%;
    }

    100% {
        height: 100%;
        top: 0%;
    }
}

`