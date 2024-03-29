import React from "react";
export interface BirdProps {
    isFree: boolean;

    bodyColor: string;
    wingColor: string;

    headWidth: number;
    headHeight: number;

    legWidth: number;
    legHeight: number;

    torsoWidth: number;
    torsoHeight: number;

    headPlumage: HeadPlumageProps;
}

/** Some of these properties are only applicable to certain plumages EG
 * height: 2
 * spread: 1
 * 
*/ 
interface HeadPlumageProps {
    style: number;
    color: string;
    spread: number;
    height: number;
    flipped: boolean;
    headHeight?: number; // probably move this elsewhere
}

const HeadPlumage: React.FC<HeadPlumageProps> = (props) => {
    let plumage;

    switch (props.style) {
        // feathers
        case 1: {
            const containerStyle: React.CSSProperties = {
                zIndex: -1,
                position: "absolute",
                bottom: "-4px",
                left: "20%",
                width: "120%",
                transformOrigin: "center left",
                rotate: "-20deg",
            };

            const plumageStyle: React.CSSProperties = {
                top: "50%",
                position: "absolute",
                height: "8px",
                backgroundColor: props.color,
                borderRadius: "70% 100% 100% 100%",
                transformOrigin: "center left",
            };

            plumage = (
                <div style={containerStyle}>
                    <div style={Object.assign({}, plumageStyle, { width: "100%" })} />
                    <div style={Object.assign({}, plumageStyle, { rotate: `-${props.spread}deg`, width: "70%" })} />
                    <div style={Object.assign({}, plumageStyle, { rotate: `-${props.spread * 2}deg`, width: "40%" })} />
                </div>
            );
            break;
        }
        // tall head
        case 2: {
            const height = props.height + props.headHeight * 0.5

            const plumageStyle: React.CSSProperties = {
                zIndex: -1,
                position: "absolute",
                bottom: `-${props.headHeight * 0.5}px`,
                width: "100%",
                height: `${height}px`,
                backgroundColor: props.color,
                borderRadius: "100% 600% 0% 0%",
            };

            plumage = <div style={plumageStyle}></div>;
            break;
        }
        default:
            plumage = <> </>;
    }

    return <div style={{ transform: props.flipped ? "scaleX(-1)" : "", position: "relative" }}>{plumage}</div>;
};

const Sweat: React.FC = () => {
    const animationDuration = 2;

    const sweatStyle: React.CSSProperties = {
        backgroundColor: "#87d1e6",
        position: "absolute",
        margin: "0 auto",
        width: "10px",
        height: "10px",
        borderRadius: "0% 100% 100% 100%",
        rotate: "45deg",
        animation: `sweat ${animationDuration}s infinite ease-in`
    };
    const numSweats = 5;

    return (
        <div className="sweat" style={{position: "absolute", left: '50%', top: "50%", zIndex: -2}}>
            {Array.from({ length: numSweats }, (_, index) => (
                <div key={index} style={{position:"absolute", rotate: `${(360 / numSweats) * index}deg`}}> 
                    <div style={{...sweatStyle, animationDelay: `-${(index /numSweats) * animationDuration}s`}} />
                </div>
            ))}
        </div>
    );
}

export const BirdSVG: React.FC<BirdProps> = (bird: BirdProps) => {
    const colorLegBack = "#fd7007";
    const colorLegFront = "#fd9802";

    const birdStyle: React.CSSProperties = {
        width: "100px",
        height: `${bird.torsoHeight + bird.headHeight + bird.legHeight}px`,
        position: "absolute",
        transformStyle: "preserve-3d",
    };
    if (bird.isFree) birdStyle.transform = "rotateY(180deg)"; // stops overriding the css with this inline css

    const birdTorsoStyle: React.CSSProperties = {
        backgroundColor: bird.bodyColor,
        width: `${bird.torsoWidth}px`,
        height: `${bird.torsoHeight}px`,
        borderRadius: "50px",
        position: "absolute",
        top: `50%`,
        left: `50%`,
        transform: "translate(-50%,-75%)"
    };

    const legStyle: React.CSSProperties = {
        width: `${bird.legWidth}px`,
        height: `${bird.legHeight + 6}px`,
        borderRadius: `${bird.legWidth}px`,
        transformOrigin: "top",

        position: "absolute",
        top: "calc(100% - 6px)",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDuration: "0.3s",
    };

    const legStyle1: React.CSSProperties = {
        backgroundColor: colorLegFront,
        left: "50%",
        animationName: bird.isFree ? "none" : "leg-wiggle-1",
    };
    const legStyle2: React.CSSProperties = {
        backgroundColor: colorLegBack,
        left: "40%",
        zIndex: -1,
        animationName: bird.isFree ? "none" : "leg-wiggle-2",
    };

    const footStyle: React.CSSProperties = {
        backgroundColor: "inherit",
        position: "absolute",

        bottom: "0%",
        right: "0%",

        width: `${bird.legWidth + 5}px`,
        height: `${bird.legWidth}px`,
        borderRadius: `${bird.legWidth}px`,
    };

    const headStyle: React.CSSProperties = {
        backgroundColor: bird.bodyColor,
        width: `${bird.headWidth}px`,
        height: `${bird.headHeight}px`,
        borderRadius: `${bird.headWidth}px`,

        position: "absolute",
        bottom: `${bird.torsoHeight - bird.headWidth * 0.75}px`,
        transformOrigin: "bottom center",
        animation: bird.isFree ? "" : "head-rotate 0.7s infinite ease-in-out"
    };

    const eyeStyle: React.CSSProperties = {
        backgroundColor: "white",
        width: "10px",
        height: "10px",
        borderRadius: bird.isFree ? "10px 10px 4px 4px" : "5px 10px 5px 5px",

        position: "absolute",
        left: "50%",
        top: "30%",
        transform: "translate(-50%, -50%)",
    };

    const beakStyle: React.CSSProperties = {
        backgroundColor: colorLegFront,
        width: "20px",
        height: "10px",
        borderRadius: "10px",

        position: "absolute",
        left: "0%",
        top: "40%",
        transform: "translate(-50%, -50%)",
    };
    const wingStyle: React.CSSProperties = {
        backgroundColor: bird.wingColor,
        width: "36px",
        height: "20px",
        borderRadius: "20px 30px 10px 20px",

        position: "absolute",
        left: "40%",
        top: "20%",

        transformOrigin: "20% 50%",
        animation: bird.isFree ? "wing-roast 5s infinite ease-in-out" : "wing-wiggle 1s infinite ease-in-out",
    };

    const marshmallowStyle: React.CSSProperties = {
        backgroundColor: "#f0d6ec",
        width: "10px",
        height: "12px",
        borderRadius: "4px",

        position: "absolute",
        left: "100%",
        top: "50%",
        transform: "translate(-50%,-50%)",
    };
    const stickStyle: React.CSSProperties = {
        backgroundColor: "#4c3828",
        width: "60px",
        height: "5px",
        borderRadius: "5px",

        position: "absolute",
        left: "90%",
        top: "50%",
    };

    return (
        <div className="bird" style={birdStyle} id={bird.isFree ? "free-bird" : "locked-bird"}>
            <div className="torso" style={birdTorsoStyle}>
                <div className="head" style={headStyle}>
                    {!bird.isFree && <Sweat/>}
                    <HeadPlumage {...bird.headPlumage} headHeight={bird.headHeight} />
                    <div className="head-fill" style={{ width: "100%", height: "100%", borderRadius: "inherit", backgroundColor: "inherit" }}></div>
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
                    {bird.isFree ? (
                        <div className="marshmallow-stick" style={stickStyle}>
                            <div className="marshmallow" style={marshmallowStyle} />
                        </div>
                    ) : null}
                </div>
            </div>
            <style>
                {`
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
                    @keyframes head-rotate {
                        0% {
                            transform: rotate(10deg);
                        }
                
                        50% {
                            transform: rotate(-10deg);
                        }
                
                        100% {
                            transform: rotate(10deg);
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

                    @keyframes sweat {
                        /*cycle 1*/
                        0% {
                            translate: 0px 0px;
                            scale: 1;
                            rotate: 0deg;
                        }
                        25% {
                            translate: 100px 100px;
                            scale: 0;
                            rotate: 0deg;
                        }
                        /*cycle 2*/
                        26% {
                            translate: 0px 0px;
                            scale: 1;
                            rotate: 270deg;
                        }
                        50% {
                            translate: 100px -100px;
                            scale: 0;
                            rotate: 270deg;
                        }
                        /*cycle 3*/
                        51% {
                            translate: 0px 0px;
                            scale: 1;
                            rotate: 90deg;
                        }
                        75% {
                            translate: -100px 100px;
                            scale: 0;
                            rotate: 90deg;
                        }
                        /*cycle 4*/
                        76% {
                            translate: 0px 0px;
                            scale: 1;
                            rotate: 135deg;
                        }
                        100% {
                            translate: -100px 0px;
                            scale: 0;
                            rotate: 135deg;
                        }
                    }
                    `}
            </style>
        </div>
    );
};
