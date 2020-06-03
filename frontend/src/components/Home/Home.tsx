import React, { FC, useEffect, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import { PokemonContext } from "../../context/PokemonContext";
import MovesList from "../MovesList/MovesList";
import MoveSelectionDisplay from "../MoveSelectionDisplay/MoveSelectionDisplay";

const Home: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { dispatch } = useContext(PokemonContext);

  const fetchPokemon = () => {
    fetch(`${process.env.URL}/pokemon`)
      .then((response) => response.json())
      .then(({ pokemon }) => {
        const pokemonArray = Object.keys(pokemon).map((p) => pokemon[p]);
        dispatch({
          type: "UPDATE_POKEMON",
          pokemon: pokemonArray,
        });
      });
  };

  useEffect(fetchPokemon, []);

  return (
    <>
      <MoveSelectionDisplay />
      <MovesList />;
    </>
  );
};

export default Home;
