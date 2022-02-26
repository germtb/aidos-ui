import React, { useEffect, useState } from "react";
import { Character } from "../core/entities/Character";
import { DarkModeProvider } from "./core/DarkModeStore";
import GraphQLClient from "./core/GraphQLClient";
import NavBar from "./core/NavBar";
import Router from "./core/Router";
import RouterState from "./core/RouterState";

export const Root = () => {
  return (
    <React.StrictMode>
      <GraphQLClient>
        <DarkModeProvider>
          <RouterState.Provider>
            <NavBar />
            <Router />
          </RouterState.Provider>
        </DarkModeProvider>
      </GraphQLClient>
    </React.StrictMode>
  );
};
