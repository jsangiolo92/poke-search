import React, { FC } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { PokemonContextProvider } from "./context/PokemonContext";
import { SelectedMovesContextProvider } from "./context/SelectedMovesContext";
import Home from "./components/Home/Home";
import PokemonResults from "./components/PokemonResults/PokemonResults";

const App: FC = () => {
  return (
    <>
      <PokemonContextProvider>
        <SelectedMovesContextProvider>
          <Router>
            <Home path="/" />
            <PokemonResults path="/results" />
          </Router>
        </SelectedMovesContextProvider>
      </PokemonContextProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
