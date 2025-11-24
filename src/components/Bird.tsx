import React from "react";
import { BIRD_CSS } from "./css";
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
      plumage = (
        <div className="plumage-container-feathers">
          <div
            className="plumage-feather"
            style={{ backgroundColor: props.color, width: "100%" }}
          />
          <div
            className="plumage-feather"
            style={{
              backgroundColor: props.color,
              rotate: `-${props.spread}deg`,
              width: "70%"
            }}
          />
          <div
            className="plumage-feather"
            style={{
              backgroundColor: props.color,
              rotate: `-${props.spread * 2}deg`,
              width: "40%"
            }}
          />
        </div>
      );
      break;
    }
    // tall head
    case 2: {
      const height = props.height + props.headHeight * 0.5;

      plumage = (
        <div
          className="plumage-tall"
          style={{
            bottom: `-${props.headHeight * 0.5}px`,
            height: `${height}px`,
            backgroundColor: props.color
          }}
        />
      );
      break;
    }
    default:
      plumage = <> </>;
  }

  return (
    <div
      className="plumage-container-wrapper"
      style={{ transform: props.flipped ? "scaleX(-1)" : "" }}
    >
      {plumage}
    </div>
  );
};

const Sweat: React.FC = () => {
  const animationDuration = 2;
  const numSweats = 5;

  return (
    <div className="sweat-container">
      {Array.from({ length: numSweats }, (_, index) => (
        <div
          key={index}
          className="sweat-rotator"
          style={{ rotate: `${(360 / numSweats) * index}deg` }}
        >
          <div
            className="sweat-item"
            style={{
              backgroundColor: "#87d1e6",
              animation: `sweat ${animationDuration}s infinite ease-in`,
              animationDelay: `-${(index / numSweats) * animationDuration}s`
            }}
          />
        </div>
      ))}
    </div>
  );
};

export const BirdSVG: React.FC<BirdProps> = (bird: BirdProps) => {
  const colorLegBack = "#fd7007";
  const colorLegFront = "#fd9802";

  const birdStyle: React.CSSProperties = {
    height: `${bird.torsoHeight + bird.headHeight + bird.legHeight}px`,
    ...(bird.isFree && { transform: "rotateY(180deg)" })
  };

  const birdTorsoStyle: React.CSSProperties = {
    backgroundColor: bird.bodyColor,
    width: `${bird.torsoWidth}px`,
    height: `${bird.torsoHeight}px`
  };

  const legStyle: React.CSSProperties = {
    width: `${bird.legWidth}px`,
    height: `${bird.legHeight + 6}px`,
    borderRadius: `${bird.legWidth}px`
  };

  const legStyle1: React.CSSProperties = {
    backgroundColor: colorLegFront,
    ...(bird.isFree ? {} : { animationName: "leg-wiggle-1" })
  };
  const legStyle2: React.CSSProperties = {
    backgroundColor: colorLegBack,
    ...(bird.isFree ? {} : { animationName: "leg-wiggle-2" })
  };

  const footStyle: React.CSSProperties = {
    width: `${bird.legWidth + 5}px`,
    height: `${bird.legWidth}px`,
    borderRadius: `${bird.legWidth}px`
  };

  const headStyle: React.CSSProperties = {
    backgroundColor: bird.bodyColor,
    width: `${bird.headWidth}px`,
    height: `${bird.headHeight}px`,
    borderRadius: `${bird.headWidth}px`,
    bottom: `${bird.torsoHeight - bird.headWidth * 0.75}px`,
    ...(bird.isFree ? {} : { animation: "head-rotate 0.7s infinite ease-in-out" })
  };

  const eyeStyle: React.CSSProperties = {
    borderRadius: bird.isFree ? "10px 10px 4px 4px" : "5px 10px 5px 5px"
  };

  const beakStyle: React.CSSProperties = {
    backgroundColor: colorLegFront
  };
  const wingStyle: React.CSSProperties = {
    backgroundColor: bird.wingColor,
    animation: bird.isFree
      ? "wing-roast 5s infinite ease-in-out"
      : "wing-wiggle 1s infinite ease-in-out"
  };

  const marshmallowStyle: React.CSSProperties = {
    backgroundColor: "#f0d6ec"
  };
  const stickStyle: React.CSSProperties = {
    backgroundColor: "#4c3828"
  };

  return (
    <div className="bird" style={birdStyle} id={bird.isFree ? "free-bird" : "locked-bird"}>
      <div className="torso" style={birdTorsoStyle}>
        <div className="head" style={headStyle}>
          {!bird.isFree && <Sweat />}
          <HeadPlumage {...bird.headPlumage} headHeight={bird.headHeight} />
          <div
            className="head-fill"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
              backgroundColor: "inherit"
            }}
          ></div>
          <div className="beak" style={beakStyle} />
          <div className="eye" style={eyeStyle} />
        </div>

        <div className="leg leg-1" style={{ ...legStyle, ...legStyle1 }}>
          <div className="foot" style={footStyle} />
        </div>
        <div className="leg leg-2" style={{ ...legStyle, ...legStyle2 }}>
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
      <style>{BIRD_CSS}</style>
    </div>
  );
};
