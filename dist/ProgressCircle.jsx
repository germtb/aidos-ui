import React from "react";
import { createClassNames, createJSStyles } from "./Palette";
const jsStyles = createJSStyles({
    root: {
        backgroundColor: "var(--secondary-background)",
        transform: "rotate(-90deg)",
        borderRadius: "50%",
    },
});
export function ProgressCircle({ progress, stroke = 4, outerRadius, }) {
    const circumference = outerRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;
    return (<svg className={createClassNames(jsStyles.root)} width={(outerRadius + stroke) * 2} height={(outerRadius + stroke) * 2}>
      <circle stroke="var(--highlight)" fill="transparent" strokeWidth={stroke} strokeDasharray={`${circumference} ${circumference}`} style={{ strokeDashoffset }} r={outerRadius} cx={outerRadius + stroke} cy={outerRadius + stroke}/>
    </svg>);
}
//# sourceMappingURL=ProgressCircle.jsx.map