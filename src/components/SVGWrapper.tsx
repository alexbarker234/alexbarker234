import React from "react";
import { CONVERT_SVG_CSS } from "../lib/cssLoader";

interface ISVGWrapperProps {
  children: React.ReactNode;
  height: string;
  width: string;
}

export default function SVGWrapper({ children, height, width }: ISVGWrapperProps) {
  return (
    <svg
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject width={width} height={height}>
        <div {...{ xmlns: "http://www.w3.org/1999/xhtml" }}>
          <style>{CONVERT_SVG_CSS}</style>
          {children}
        </div>
      </foreignObject>
    </svg>
  );
}
