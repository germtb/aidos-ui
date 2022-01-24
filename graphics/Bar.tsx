import React from "react";

export const Bar = ({ ratio, color = "black" }) => {
  return (
    <div
      style={{
        // border: `1px solid ${color}`,
        borderRadius: 2,
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background: color,
          borderRadius: 2,
          bottom: 0,
          height: "100%",
          left: 0,
          position: "absolute",
          width: `calc(100% * ${ratio})`,
        }}
      />
    </div>
  );
};
