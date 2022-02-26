import React from "react";
import { render } from "react-dom";

import { heroArchetype } from "../content/archetypes/HeroArchetype";
import { forgottenSwamp } from "../content/waves/FotgottenSwamp";
import { instantiateHero, instantiateWave, start } from "../core/World";
import { generateStylesheet } from "../ui/core/Palette";
import { Root } from "../ui/Root";

import "../ui/core/index.css";

console.log("---STARTING---");

instantiateHero(heroArchetype);
instantiateWave(forgottenSwamp);

const stylesheet = generateStylesheet();
const style = document.createElement("style");

style.innerHTML = stylesheet;
document.head.appendChild(style);

render(<Root />, document.getElementById("root"));

start();
