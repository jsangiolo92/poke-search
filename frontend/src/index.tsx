import React, { FC } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { PokemonContextProvider } from "./context/PokemonContext";
import { MovesContextProvider } from "./context/MovesContext";
import { SearchContextProvider } from "./context/SearchContext";
import { FiltersContextProvider } from "./context/FiltersContext";
import { ModalDetailsContextProvider } from "./context/ModalDetailsContext";
import Home from "./components/Home/Home";
import PokemonResults from "./components/PokemonResults/PokemonResults";

const App: FC = () => {
  return (
    <>
      <PokemonContextProvider>
        <MovesContextProvider>
          <SearchContextProvider>
            <FiltersContextProvider>
              <ModalDetailsContextProvider>
                <Router>
                  <Home path="/" />
                  <PokemonResults path="/results" />
                </Router>
              </ModalDetailsContextProvider>
            </FiltersContextProvider>
          </SearchContextProvider>
        </MovesContextProvider>
      </PokemonContextProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
